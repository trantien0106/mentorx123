import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2, ChevronRight, ChevronLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Progress } from "@/components/ui/progress";

const MenteeQuiz = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 10;

  const [responses, setResponses] = useState({
    current_status: "",
    education_level: "",
    field_of_interest: [] as string[],
    learning_goals: [] as string[],
    preferred_learning_style: "",
    availability: "",
    experience_level: "",
    preferred_session_format: "",
    budget_range: "",
    specific_topics: "",
    additional_info: "",
  });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      toast.error("Vui lòng đăng nhập để tiếp tục");
      navigate("/auth");
      return;
    }
    setUser(session.user);
    
    // Check if user already completed quiz
    const { data } = await supabase
      .from("mentee_quiz_responses")
      .select("*")
      .eq("user_id", session.user.id)
      .maybeSingle();

    if (data) {
      toast.info("Bạn đã hoàn thành bài quiz");
      navigate("/");
    }
  };

  const handleFieldChange = (field: string, value: string | string[]) => {
    setResponses({ ...responses, [field]: value });
  };

  const handleCheckboxChange = (field: "field_of_interest" | "learning_goals", value: string) => {
    const current = responses[field];
    const updated = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value];
    setResponses({ ...responses, [field]: updated });
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return responses.current_status !== "";
      case 2: return responses.education_level !== "";
      case 3: return responses.field_of_interest.length > 0;
      case 4: return responses.learning_goals.length > 0;
      case 5: return responses.preferred_learning_style !== "";
      case 6: return responses.availability !== "";
      case 7: return responses.experience_level !== "";
      case 8: return responses.preferred_session_format !== "";
      case 9: return responses.budget_range !== "";
      case 10: return true; // Optional fields
      default: return false;
    }
  };

  const handleSubmit = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from("mentee_quiz_responses")
        .insert({
          user_id: user.id,
          ...responses,
        });

      if (error) throw error;

      toast.success("Cảm ơn bạn đã hoàn thành bài quiz! Chúng tôi sẽ gợi ý mentor phù hợp cho bạn.");
      navigate("/mentors");
    } catch (error: any) {
      console.error("Error submitting quiz:", error);
      toast.error(error.message || "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <Label className="text-lg font-semibold">1. Bạn hiện đang là?</Label>
            <RadioGroup value={responses.current_status} onValueChange={(v) => handleFieldChange("current_status", v)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="student" id="student" />
                <Label htmlFor="student" className="cursor-pointer">Sinh viên</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="professional" id="professional" />
                <Label htmlFor="professional" className="cursor-pointer">Người đi làm</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="job_seeker" id="job_seeker" />
                <Label htmlFor="job_seeker" className="cursor-pointer">Đang tìm việc</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="entrepreneur" id="entrepreneur" />
                <Label htmlFor="entrepreneur" className="cursor-pointer">Doanh nhân / Tự kinh doanh</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other_status" />
                <Label htmlFor="other_status" className="cursor-pointer">Khác</Label>
              </div>
            </RadioGroup>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <Label className="text-lg font-semibold">2. Trình độ học vấn của bạn?</Label>
            <RadioGroup value={responses.education_level} onValueChange={(v) => handleFieldChange("education_level", v)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="high_school" id="high_school" />
                <Label htmlFor="high_school" className="cursor-pointer">Tốt nghiệp THPT</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="undergraduate" id="undergraduate" />
                <Label htmlFor="undergraduate" className="cursor-pointer">Đang học Đại học / Cao đẳng</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="graduate" id="graduate" />
                <Label htmlFor="graduate" className="cursor-pointer">Tốt nghiệp Đại học</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="postgraduate" id="postgraduate" />
                <Label htmlFor="postgraduate" className="cursor-pointer">Sau Đại học (Thạc sĩ/Tiến sĩ)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other_edu" />
                <Label htmlFor="other_edu" className="cursor-pointer">Khác</Label>
              </div>
            </RadioGroup>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <Label className="text-lg font-semibold">3. Bạn quan tâm đến lĩnh vực nào? (Chọn tất cả phù hợp)</Label>
            <div className="space-y-2">
              {["Lập trình", "Marketing", "Thiết kế", "Kinh doanh", "Tài chính", "Ngoại ngữ", "Kỹ năng mềm", "Nghệ thuật", "Khác"].map((field) => (
                <div key={field} className="flex items-center space-x-2">
                  <Checkbox
                    id={field}
                    checked={responses.field_of_interest.includes(field)}
                    onCheckedChange={() => handleCheckboxChange("field_of_interest", field)}
                  />
                  <Label htmlFor={field} className="cursor-pointer">{field}</Label>
                </div>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <Label className="text-lg font-semibold">4. Mục tiêu học tập của bạn? (Chọn tất cả phù hợp)</Label>
            <div className="space-y-2">
              {[
                "Nâng cao kỹ năng chuyên môn",
                "Chuyển đổi nghề nghiệp",
                "Thăng tiến trong công việc",
                "Khởi nghiệp",
                "Phát triển bản thân",
                "Chuẩn bị cho công việc đầu tiên"
              ].map((goal) => (
                <div key={goal} className="flex items-center space-x-2">
                  <Checkbox
                    id={goal}
                    checked={responses.learning_goals.includes(goal)}
                    onCheckedChange={() => handleCheckboxChange("learning_goals", goal)}
                  />
                  <Label htmlFor={goal} className="cursor-pointer">{goal}</Label>
                </div>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <Label className="text-lg font-semibold">5. Phong cách học tập ưa thích của bạn?</Label>
            <RadioGroup value={responses.preferred_learning_style} onValueChange={(v) => handleFieldChange("preferred_learning_style", v)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="visual" id="visual" />
                <Label htmlFor="visual" className="cursor-pointer">Trực quan (Hình ảnh, video, sơ đồ)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="auditory" id="auditory" />
                <Label htmlFor="auditory" className="cursor-pointer">Thính giác (Nghe giảng, podcast)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="reading" id="reading" />
                <Label htmlFor="reading" className="cursor-pointer">Đọc/Viết (Sách, tài liệu)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="kinesthetic" id="kinesthetic" />
                <Label htmlFor="kinesthetic" className="cursor-pointer">Vận động (Thực hành, làm việc tay)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="mixed" id="mixed" />
                <Label htmlFor="mixed" className="cursor-pointer">Kết hợp nhiều phương pháp</Label>
              </div>
            </RadioGroup>
          </div>
        );

      case 6:
        return (
          <div className="space-y-4">
            <Label className="text-lg font-semibold">6. Thời gian rảnh của bạn để học?</Label>
            <RadioGroup value={responses.availability} onValueChange={(v) => handleFieldChange("availability", v)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="weekday_morning" id="weekday_morning" />
                <Label htmlFor="weekday_morning" className="cursor-pointer">Buổi sáng các ngày trong tuần</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="weekday_afternoon" id="weekday_afternoon" />
                <Label htmlFor="weekday_afternoon" className="cursor-pointer">Buổi chiều các ngày trong tuần</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="weekday_evening" id="weekday_evening" />
                <Label htmlFor="weekday_evening" className="cursor-pointer">Buổi tối các ngày trong tuần</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="weekend" id="weekend" />
                <Label htmlFor="weekend" className="cursor-pointer">Cuối tuần</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="flexible" id="flexible" />
                <Label htmlFor="flexible" className="cursor-pointer">Linh hoạt</Label>
              </div>
            </RadioGroup>
          </div>
        );

      case 7:
        return (
          <div className="space-y-4">
            <Label className="text-lg font-semibold">7. Mức độ kinh nghiệm trong lĩnh vực bạn quan tâm?</Label>
            <RadioGroup value={responses.experience_level} onValueChange={(v) => handleFieldChange("experience_level", v)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="beginner" id="beginner" />
                <Label htmlFor="beginner" className="cursor-pointer">Người mới bắt đầu</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="intermediate" id="intermediate" />
                <Label htmlFor="intermediate" className="cursor-pointer">Trung cấp</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="advanced" id="advanced" />
                <Label htmlFor="advanced" className="cursor-pointer">Nâng cao</Label>
              </div>
            </RadioGroup>
          </div>
        );

      case 8:
        return (
          <div className="space-y-4">
            <Label className="text-lg font-semibold">8. Bạn ưa thích hình thức học nào?</Label>
            <RadioGroup value={responses.preferred_session_format} onValueChange={(v) => handleFieldChange("preferred_session_format", v)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="one_on_one" id="one_on_one" />
                <Label htmlFor="one_on_one" className="cursor-pointer">1-1 riêng với mentor</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="group" id="group" />
                <Label htmlFor="group" className="cursor-pointer">Nhóm nhỏ</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="both" id="both" />
                <Label htmlFor="both" className="cursor-pointer">Cả hai</Label>
              </div>
            </RadioGroup>
          </div>
        );

      case 9:
        return (
          <div className="space-y-4">
            <Label className="text-lg font-semibold">9. Ngân sách dự kiến cho mỗi buổi học (VNĐ)?</Label>
            <RadioGroup value={responses.budget_range} onValueChange={(v) => handleFieldChange("budget_range", v)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="under_500k" id="under_500k" />
                <Label htmlFor="under_500k" className="cursor-pointer">Dưới 500.000đ</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="500k_1m" id="500k_1m" />
                <Label htmlFor="500k_1m" className="cursor-pointer">500.000đ - 1.000.000đ</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1m_2m" id="1m_2m" />
                <Label htmlFor="1m_2m" className="cursor-pointer">1.000.000đ - 2.000.000đ</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="above_2m" id="above_2m" />
                <Label htmlFor="above_2m" className="cursor-pointer">Trên 2.000.000đ</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="flexible" id="budget_flexible" />
                <Label htmlFor="budget_flexible" className="cursor-pointer">Linh hoạt</Label>
              </div>
            </RadioGroup>
          </div>
        );

      case 10:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-lg font-semibold">10. Chủ đề cụ thể bạn muốn học (không bắt buộc)</Label>
              <Textarea
                value={responses.specific_topics}
                onChange={(e) => handleFieldChange("specific_topics", e.target.value)}
                placeholder="Ví dụ: React, SEO, Photoshop, Sales Skills..."
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-lg font-semibold">Thông tin bổ sung (không bắt buộc)</Label>
              <Textarea
                value={responses.additional_info}
                onChange={(e) => handleFieldChange("additional_info", e.target.value)}
                placeholder="Bất kỳ thông tin nào khác bạn muốn chia sẻ..."
                rows={3}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-background via-background to-accent/5">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold">Khảo Sát Mentee</CardTitle>
              <CardDescription>
                Giúp chúng tôi hiểu rõ hơn về bạn để gợi ý mentor phù hợp nhất
              </CardDescription>
              <div className="mt-4">
                <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
                <p className="text-sm text-muted-foreground mt-2">
                  Câu hỏi {currentStep} / {totalSteps}
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="min-h-[300px]">
                {renderStep()}
              </div>

              <div className="flex justify-between mt-8 pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  disabled={currentStep === 1}
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Quay lại
                </Button>

                {currentStep < totalSteps ? (
                  <Button
                    onClick={() => setCurrentStep(currentStep + 1)}
                    disabled={!canProceed()}
                  >
                    Tiếp theo
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Đang gửi...
                      </>
                    ) : (
                      "Hoàn thành"
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MenteeQuiz;