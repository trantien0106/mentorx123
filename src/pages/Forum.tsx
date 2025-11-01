import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageCircle, ThumbsUp, Send } from "lucide-react";
import { toast } from "sonner";
import type { Tables } from "@/integrations/supabase/types";

type ForumPost = Tables<"forum_posts">;
type Comment = Tables<"comments">;
type Reaction = Tables<"reactions">;

const Forum = () => {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [comments, setComments] = useState<Record<string, Comment[]>>({});
  const [reactions, setReactions] = useState<Record<string, Reaction[]>>({});
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostCategory, setNewPostCategory] = useState("general");
  const [commentText, setCommentText] = useState<Record<string, string>>({});
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
    fetchPosts();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setUser(session?.user);
    setLoading(false);
  };

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("forum_posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Không thể tải bài viết");
      return;
    }

    setPosts(data || []);
    
    // Fetch comments and reactions for each post
    data?.forEach(post => {
      fetchComments(post.id);
      fetchReactions(post.id);
    });
  };

  const fetchComments = async (postId: string) => {
    const { data } = await supabase
      .from("comments")
      .select("*")
      .eq("post_id", postId)
      .order("created_at", { ascending: true });

    setComments(prev => ({ ...prev, [postId]: data || [] }));
  };

  const fetchReactions = async (postId: string) => {
    const { data } = await supabase
      .from("reactions")
      .select("*")
      .eq("post_id", postId);

    setReactions(prev => ({ ...prev, [postId]: data || [] }));
  };

  const createPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Vui lòng đăng nhập để tạo bài viết");
      return;
    }

    const { error } = await supabase.from("forum_posts").insert({
      title: newPostTitle,
      content: newPostContent,
      category: newPostCategory,
      user_id: user.id,
    });

    if (error) {
      toast.error("Không thể tạo bài viết");
      return;
    }

    toast.success("Đã tạo bài viết!");
    setNewPostTitle("");
    setNewPostContent("");
    fetchPosts();
  };

  const addComment = async (postId: string) => {
    if (!user) {
      toast.error("Vui lòng đăng nhập");
      return;
    }

    const text = commentText[postId];
    if (!text?.trim()) return;

    const { error } = await supabase.from("comments").insert({
      post_id: postId,
      user_id: user.id,
      content: text,
    });

    if (error) {
      toast.error("Không thể thêm bình luận");
      return;
    }

    setCommentText(prev => ({ ...prev, [postId]: "" }));
    fetchComments(postId);
  };

  const addReaction = async (postId: string, emoji: string) => {
    if (!user) {
      toast.error("Vui lòng đăng nhập");
      return;
    }

    // Check if user already reacted with this emoji
    const existingReaction = reactions[postId]?.find(
      r => r.user_id === user.id && r.emoji === emoji
    );

    if (existingReaction) {
      // Remove reaction
      await supabase.from("reactions").delete().eq("id", existingReaction.id);
    } else {
      // Add reaction
      await supabase.from("reactions").insert({
        post_id: postId,
        user_id: user.id,
        emoji,
      });
    }

    fetchReactions(postId);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Diễn đàn</h1>

          {user && (
            <Card className="p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Tạo bài viết mới</h2>
              <form onSubmit={createPost} className="space-y-4">
                <Input
                  placeholder="Tiêu đề bài viết"
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                  required
                />
                <Textarea
                  placeholder="Nội dung..."
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  required
                  rows={4}
                />
                <div className="flex gap-4">
                  <select
                    value={newPostCategory}
                    onChange={(e) => setNewPostCategory(e.target.value)}
                    className="px-4 py-2 border rounded-lg"
                  >
                    <option value="general">Chung</option>
                    <option value="review">Đánh giá khóa học</option>
                    <option value="question">Câu hỏi</option>
                    <option value="discussion">Thảo luận</option>
                  </select>
                  <Button type="submit">Đăng bài</Button>
                </div>
              </form>
            </Card>
          )}

          <div className="space-y-6">
            {posts.map((post) => (
              <Card key={post.id} className="p-6">
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">{post.category}</Badge>
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">{post.title}</h3>
                  <p className="text-muted-foreground whitespace-pre-wrap">{post.content}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {new Date(post.created_at || "").toLocaleDateString("vi-VN")}
                  </p>
                </div>

                <div className="flex items-center gap-4 mb-4 pt-4 border-t">
                  {["👍", "❤️", "🎉", "🔥"].map((emoji) => {
                    const count = reactions[post.id]?.filter(r => r.emoji === emoji).length || 0;
                    const isActive = reactions[post.id]?.some(
                      r => r.user_id === user?.id && r.emoji === emoji
                    );
                    return (
                      <Button
                        key={emoji}
                        variant={isActive ? "default" : "outline"}
                        size="sm"
                        onClick={() => addReaction(post.id, emoji)}
                      >
                        {emoji} {count > 0 && count}
                      </Button>
                    );
                  })}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm">{comments[post.id]?.length || 0} bình luận</span>
                  </div>

                  {comments[post.id]?.map((comment) => (
                    <div key={comment.id} className="flex gap-3 bg-muted/50 p-4 rounded-lg">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm">{comment.content}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(comment.created_at || "").toLocaleDateString("vi-VN")}
                        </p>
                      </div>
                    </div>
                  ))}

                  {user && (
                    <div className="flex gap-2">
                      <Input
                        placeholder="Viết bình luận..."
                        value={commentText[post.id] || ""}
                        onChange={(e) =>
                          setCommentText(prev => ({ ...prev, [post.id]: e.target.value }))
                        }
                      />
                      <Button
                        size="icon"
                        onClick={() => addComment(post.id)}
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Forum;
