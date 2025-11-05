import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Upload, CheckCircle2, Clock, XCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BecomeMentor = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [existingApplication, setExistingApplication] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    expertise: "",
    experience_years: "",
    bio: "",
    linkedin_url: "",
    education: "",
    certifications: "",
  });

  const [files, setFiles] = useState({
    cv: null as File | null,
    id_document: null as File | null,
    certificates: [] as File[],
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
    checkExistingApplication(session.user.id);
  };

  const checkExistingApplication = async (userId: string) => {
    const { data, error } = await supabase
      .from("mentor_applications")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (data) {
      setExistingApplication(data);
    }
  };

  const uploadFile = async (file: File, path: string) => {
    const { data, error } = await supabase.storage
      .from("mentor-documents")
      .upload(`${user.id}/${path}`, file, { upsert: true });

    if (error) throw error;
    
    const { data: { publicUrl } } = supabase.storage
      .from("mentor-documents")
      .getPublicUrl(data.path);
    
    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Vui lòng đăng nhập để tiếp tục");
      return;
    }

    if (!files.cv || !files.id_document) {
      toast.error("Vui lòng tải lên CV và CMND/CCCD");
      return;
    }

    setLoading(true);
    setUploading(true);

    try {
      // Upload files
      const cvUrl = await uploadFile(files.cv, `cv_${Date.now()}.pdf`);
      const idUrl = await uploadFile(files.id_document, `id_${Date.now()}.pdf`);
      
      const certificateUrls: string[] = [];
      for (let i = 0; i < files.certificates.length; i++) {
        const url = await uploadFile(files.certificates[i], `cert_${i}_${Date.now()}.pdf`);
        certificateUrls.push(url);
      }

      setUploading(false);

      // Submit application
      const { error } = await supabase
        .from("mentor_applications")
        .insert({
          user_id: user.id,
          full_name: formData.full_name,
          phone: formData.phone,
          expertise: formData.expertise,
          experience_years: parseInt(formData.experience_years),
          bio: formData.bio,
          linkedin_url: formData.linkedin_url || null,
          education: formData.education,
          certifications: formData.certifications || null,
          cv_url: cvUrl,
          id_document_url: idUrl,
          certificate_urls: certificateUrls.length > 0 ? certificateUrls : null,
        });

      if (error) throw error;

      toast.success("Đơn đăng ký đã được gửi thành công!");
      navigate("/");
    } catch (error: any) {
      console.error("Error submitting application:", error);
      toast.error(error.message || "Có lỗi xảy ra khi gửi đơn đăng ký");
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  if (existingApplication) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-background via-background to-accent/5">
          <div className="container mx-auto px-4 max-w-2xl">
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4">
                  {existingApplication.status === "pending" && (
                    <Clock className="w-16 h-16 text-yellow-500" />
                  )}
                  {existingApplication.status === "approved" && (
                    <CheckCircle2 className="w-16 h-16 text-green-500" />
                  )}
                  {existingApplication.status === "rejected" && (
                    <XCircle className="w-16 h-16 text-red-500" />
                  )}
                </div>
                <CardTitle className="text-2xl">
                  {existingApplication.status === "pending" && "Đơn đang được xét duyệt"}
                  {existingApplication.status === "approved" && "Đơn đã được chấp nhận"}
                  {existingApplication.status === "rejected" && "Đơn đã bị từ chối"}
                </CardTitle>
                <CardDescription>
                  {existingApplication.status === "pending" && 
                    "Chúng tôi đang xem xét đơn đăng ký của bạn. Vui lòng chờ phản hồi từ đội ngũ của chúng tôi."
                  }
                  {existingApplication.status === "approved" && 
                    "Chúc mừng! Bạn đã trở thành mentor của MentorX."
                  }
                  {existingApplication.status === "rejected" && 
                    `Lý do từ chối: ${existingApplication.rejection_reason || "Không đủ điều kiện"}`
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Ngày nộp đơn</p>
                    <p className="font-medium">{new Date(existingApplication.created_at).toLocaleDateString("vi-VN")}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Họ tên</p>
                    <p className="font-medium">{existingApplication.full_name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Lĩnh vực chuyên môn</p>
                    <p className="font-medium">{existingApplication.expertise}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Số năm kinh nghiệm</p>
                    <p className="font-medium">{existingApplication.experience_years} năm</p>
                  </div>
                  <Button onClick={() => navigate("/")} className="w-full mt-6">
                    Về trang chủ
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-background via-background to-accent/5">
        <div className="container mx-auto px-4 max-w-3xl">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold">Trở thành Mentor</CardTitle>
              <CardDescription>
                Chia sẻ kiến thức và kinh nghiệm của bạn với thế hệ tiếp theo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="full_name">Họ và tên *</Label>
                  <Input
                    id="full_name"
                    required
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    placeholder="Nguyễn Văn A"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Số điện thoại *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0123456789"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expertise">Lĩnh vực chuyên môn *</Label>
                  <Input
                    id="expertise"
                    required
                    value={formData.expertise}
                    onChange={(e) => setFormData({ ...formData, expertise: e.target.value })}
                    placeholder="Ví dụ: Lập trình, Marketing, Thiết kế..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience_years">Số năm kinh nghiệm *</Label>
                  <Input
                    id="experience_years"
                    type="number"
                    required
                    min="1"
                    value={formData.experience_years}
                    onChange={(e) => setFormData({ ...formData, experience_years: e.target.value })}
                    placeholder="5"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="education">Học vấn *</Label>
                  <Textarea
                    id="education"
                    required
                    value={formData.education}
                    onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                    placeholder="Ví dụ: Cử nhân Khoa học Máy tính - Đại học Bách Khoa"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Giới thiệu bản thân *</Label>
                  <Textarea
                    id="bio"
                    required
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    placeholder="Hãy chia sẻ về bản thân, kinh nghiệm và lý do bạn muốn trở thành mentor..."
                    rows={5}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="certifications">Chứng chỉ (nếu có)</Label>
                  <Textarea
                    id="certifications"
                    value={formData.certifications}
                    onChange={(e) => setFormData({ ...formData, certifications: e.target.value })}
                    placeholder="Liệt kê các chứng chỉ chuyên môn của bạn"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkedin_url">LinkedIn Profile</Label>
                  <Input
                    id="linkedin_url"
                    type="url"
                    value={formData.linkedin_url}
                    onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Giấy tờ cần thiết</h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cv">CV/Hồ sơ *</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="cv"
                          type="file"
                          accept=".pdf"
                          required
                          onChange={(e) => setFiles({ ...files, cv: e.target.files?.[0] || null })}
                        />
                        {files.cv && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                      </div>
                      <p className="text-xs text-muted-foreground">Chỉ chấp nhận file PDF</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="id_document">CMND/CCCD *</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="id_document"
                          type="file"
                          accept=".pdf,image/*"
                          required
                          onChange={(e) => setFiles({ ...files, id_document: e.target.files?.[0] || null })}
                        />
                        {files.id_document && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                      </div>
                      <p className="text-xs text-muted-foreground">PDF hoặc hình ảnh</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="certificates">Chứng chỉ bổ sung (nếu có)</Label>
                      <Input
                        id="certificates"
                        type="file"
                        accept=".pdf"
                        multiple
                        onChange={(e) => setFiles({ ...files, certificates: Array.from(e.target.files || []) })}
                      />
                      <p className="text-xs text-muted-foreground">
                        Có thể chọn nhiều file PDF. Đã chọn: {files.certificates.length} file
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading}
                  size="lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {uploading ? "Đang tải file lên..." : "Đang gửi đơn..."}
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Gửi đơn đăng ký
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BecomeMentor;