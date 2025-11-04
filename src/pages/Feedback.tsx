import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Feedback = () => {
  const navigate = useNavigate();
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!subject.trim() || !message.trim()) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }

    setIsSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("Vui lòng đăng nhập để gửi góp ý");
        navigate("/auth");
        return;
      }

      const { error } = await supabase.from("feedback").insert({
        user_id: user.id,
        subject: subject.trim(),
        message: message.trim(),
      });

      if (error) throw error;

      toast.success("Cảm ơn bạn đã gửi góp ý!");
      setSubject("");
      setMessage("");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4 text-foreground">
              Góp Ý Về Hệ Thống
            </h1>
            <p className="text-xl text-muted-foreground">
              Ý kiến của bạn giúp chúng tôi cải thiện MentorX mỗi ngày
            </p>
          </div>

          {/* Feedback Form */}
          <Card>
            <CardHeader>
              <CardTitle>Gửi Góp Ý</CardTitle>
              <CardDescription>
                Hãy cho chúng tôi biết suy nghĩ của bạn về nền tảng
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Tiêu đề
                  </label>
                  <Input
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Nhập tiêu đề góp ý của bạn"
                    maxLength={200}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Nội dung
                  </label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Chi tiết góp ý của bạn..."
                    rows={8}
                    maxLength={2000}
                    required
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    {message.length}/2000 ký tự
                  </p>
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  <Send className="w-4 h-4 mr-2" />
                  {isSubmitting ? "Đang gửi..." : "Gửi Góp Ý"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Info Section */}
          <Card className="mt-8 bg-muted/30">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Chúng tôi lắng nghe bạn</h3>
              <p className="text-sm text-muted-foreground">
                Mọi góp ý của bạn đều được ghi nhận và xem xét cẩn thận. 
                Chúng tôi cam kết không ngừng cải thiện để mang đến trải nghiệm tốt nhất 
                cho cộng đồng MentorX.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
