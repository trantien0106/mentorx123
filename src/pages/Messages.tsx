import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, User } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  read: boolean;
  created_at: string;
  sender_email?: string;
  receiver_email?: string;
}

interface Profile {
  id: string;
  email: string;
  full_name: string | null;
}

const Messages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<Profile[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    if (currentUser) {
      fetchUsers();
      fetchMessages();
      subscribeToMessages();
    }
  }, [currentUser]);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      window.location.href = "/auth";
      return;
    }
    setCurrentUser(user);
    setLoading(false);
  };

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .neq("id", currentUser?.id);

    if (error) {
      console.error("Error fetching users:", error);
      return;
    }

    setUsers(data || []);
  };

  const fetchMessages = async () => {
    if (!currentUser) return;

    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .or(`sender_id.eq.${currentUser.id},receiver_id.eq.${currentUser.id}`)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching messages:", error);
      return;
    }

    // Fetch sender and receiver emails
    const messagesWithEmails = await Promise.all(
      (data || []).map(async (msg) => {
        const { data: senderProfile } = await supabase
          .from("profiles")
          .select("email")
          .eq("id", msg.sender_id)
          .single();
        
        const { data: receiverProfile } = await supabase
          .from("profiles")
          .select("email")
          .eq("id", msg.receiver_id)
          .single();

        return {
          ...msg,
          sender_email: senderProfile?.email,
          receiver_email: receiverProfile?.email,
        };
      })
    );

    setMessages(messagesWithEmails);
  };

  const subscribeToMessages = () => {
    const channel = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "messages",
        },
        () => {
          fetchMessages();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedUser || !currentUser) return;

    const { error } = await supabase.from("messages").insert({
      sender_id: currentUser.id,
      receiver_id: selectedUser,
      content: newMessage,
    });

    if (error) {
      toast({
        title: "Lỗi",
        description: "Không thể gửi tin nhắn",
        variant: "destructive",
      });
      return;
    }

    setNewMessage("");
    toast({
      title: "Thành công",
      description: "Đã gửi tin nhắn",
    });
  };

  const getConversationMessages = () => {
    if (!selectedUser || !currentUser) return [];

    return messages.filter(
      (msg) =>
        (msg.sender_id === currentUser.id && msg.receiver_id === selectedUser) ||
        (msg.sender_id === selectedUser && msg.receiver_id === currentUser.id)
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Đang tải...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-24">
        <h1 className="text-4xl font-bold mb-8">Tin Nhắn</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Users List */}
          <Card className="p-4">
            <h2 className="text-xl font-semibold mb-4">Người dùng</h2>
            <ScrollArea className="h-[600px]">
              {users.map((user) => (
                <div
                  key={user.id}
                  onClick={() => setSelectedUser(user.id)}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-accent transition-colors ${
                    selectedUser === user.id ? "bg-accent" : ""
                  }`}
                >
                  <Avatar>
                    <AvatarFallback>
                      <User className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">
                      {user.full_name || user.email}
                    </p>
                    <p className="text-sm text-muted-foreground truncate">
                      {user.email}
                    </p>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </Card>

          {/* Messages */}
          <Card className="md:col-span-2 p-4 flex flex-col">
            {selectedUser ? (
              <>
                <div className="border-b pb-4 mb-4">
                  <h2 className="text-xl font-semibold">
                    {users.find((u) => u.id === selectedUser)?.full_name ||
                      users.find((u) => u.id === selectedUser)?.email}
                  </h2>
                </div>

                <ScrollArea className="flex-1 h-[450px] mb-4">
                  <div className="space-y-4 pr-4">
                    {getConversationMessages().map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${
                          msg.sender_id === currentUser?.id
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg p-3 ${
                            msg.sender_id === currentUser?.id
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}
                        >
                          <p className="break-words">{msg.content}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {formatDistanceToNow(new Date(msg.created_at), {
                              addSuffix: true,
                              locale: vi,
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <div className="flex gap-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Nhập tin nhắn..."
                    className="flex-1"
                  />
                  <Button onClick={sendMessage}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                Chọn một người dùng để bắt đầu trò chuyện
              </div>
            )}
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Messages;