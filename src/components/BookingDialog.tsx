import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { CheckCircle, Loader2 } from "lucide-react";

interface BookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mentorId: string;
  mentorName: string;
  basePrice: number;
}

const quizQuestions = [
  {
    id: "goals",
    question: "Mục tiêu của bạn khi book mentor?",
    placeholder: "Ví dụ: Học React, phát triển sự nghiệp...",
  },
  {
    id: "experience",
    question: "Kinh nghiệm hiện tại của bạn?",
    placeholder: "Ví dụ: Beginner, Intermediate, Advanced...",
  },
  {
    id: "expectations",
    question: "Bạn mong đợi gì từ mentor?",
    placeholder: "Ví dụ: Code review, career advice, technical guidance...",
  },
];

export const BookingDialog = ({
  open,
  onOpenChange,
  mentorId,
  mentorName,
  basePrice,
}: BookingDialogProps) => {
  const [step, setStep] = useState(1);
  const [packageType, setPackageType] = useState<"1_session" | "3_sessions" | "5_sessions">("1_session");
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const packages = {
    "1_session": { sessions: 1, discount: 0, price: basePrice },
    "3_sessions": { sessions: 3, discount: 5, price: basePrice * 3 * 0.95 },
    "5_sessions": { sessions: 5, discount: 10, price: basePrice * 5 * 0.90 },
  };

  const selectedPackage = packages[packageType];

  const handleQuizAnswer = (questionId: string, answer: string) => {
    setQuizAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleBooking = async () => {
    setLoading(true);

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        toast.error("Vui lòng đăng nhập để đặt lịch");
        return;
      }

      const { error } = await supabase.from("bookings").insert({
        user_id: session.user.id,
        mentor_id: mentorId,
        package_type: packageType,
        total_price: selectedPackage.price,
        quiz_responses: quizAnswers,
      });

      if (error) throw error;

      toast.success("Đặt lịch thành công! Mentor sẽ liên hệ bạn sớm.");
      onOpenChange(false);
      setStep(1);
      setQuizAnswers({});
    } catch (error: any) {
      toast.error(error.message || "Đặt lịch thất bại");
    } finally {
      setLoading(false);
    }
  };

  const canProceed = () => {
    if (step === 2) {
      return quizQuestions.every((q) => quizAnswers[q.id]?.trim());
    }
    return true;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Đặt lịch với {mentorName}</DialogTitle>
          <DialogDescription>
            {step === 1 ? "Chọn gói học phù hợp" : "Trả lời câu hỏi để mentor hiểu rõ hơn về bạn"}
          </DialogDescription>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-6">
            <RadioGroup value={packageType} onValueChange={(value: any) => setPackageType(value)}>
              {Object.entries(packages).map(([key, pkg]) => (
                <div
                  key={key}
                  className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-accent/50 cursor-pointer transition"
                  onClick={() => setPackageType(key as any)}
                >
                  <RadioGroupItem value={key} id={key} />
                  <div className="flex-1">
                    <Label htmlFor={key} className="text-base font-semibold cursor-pointer">
                      {pkg.sessions} buổi
                    </Label>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-2xl font-bold text-primary">
                        ${pkg.price.toFixed(0)}
                      </span>
                      {pkg.discount > 0 && (
                        <Badge className="bg-accent text-accent-foreground">
                          Giảm {pkg.discount}%
                        </Badge>
                      )}
                    </div>
                    {pkg.discount > 0 && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Tiết kiệm ${(basePrice * pkg.sessions - pkg.price).toFixed(0)}
                      </p>
                    )}
                  </div>
                  <CheckCircle
                    className={`w-5 h-5 ${packageType === key ? "text-primary" : "text-muted"}`}
                  />
                </div>
              ))}
            </RadioGroup>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
                Hủy
              </Button>
              <Button onClick={() => setStep(2)} className="flex-1">
                Tiếp tục
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            {quizQuestions.map((q) => (
              <div key={q.id} className="space-y-2">
                <Label className="text-base">{q.question}</Label>
                <Textarea
                  placeholder={q.placeholder}
                  value={quizAnswers[q.id] || ""}
                  onChange={(e) => handleQuizAnswer(q.id, e.target.value)}
                  rows={3}
                />
              </div>
            ))}

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                Quay lại
              </Button>
              <Button
                onClick={handleBooking}
                disabled={!canProceed() || loading}
                className="flex-1"
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Xác nhận đặt lịch
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
      {children}
    </span>
  );
}
