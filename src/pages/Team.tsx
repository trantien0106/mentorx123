import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  description: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Nguyễn Thị Đan Hà",
    role: "CEO",
    description: "Giám đốc điều hành - Định hướng tầm nhìn và chiến lược phát triển"
  },
  {
    name: "Vũ Quang Minh",
    role: "DevOps",
    description: "Chuyên gia DevOps - Quản lý hạ tầng và vận hành hệ thống"
  },
  {
    name: "Trần Thị Hà Anh",
    role: "Product",
    description: "Quản lý sản phẩm - Phát triển và tối ưu trải nghiệm người dùng"
  },
  {
    name: "Trần Văn Tiến",
    role: "Business",
    description: "Phát triển kinh doanh - Mở rộng thị trường và đối tác"
  },
  {
    name: "Phạm Bá Trung",
    role: "Marketing",
    description: "Giám đốc marketing - Xây dựng thương hiệu và truyền thông"
  }
];

const Team = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Đội Ngũ Sáng Lập
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Gặp gỡ những người đã xây dựng nên MentorX - nền tảng kết nối mentor và mentee hàng đầu
          </p>
        </div>
      </section>

      {/* Team Members Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center mx-auto mb-4 text-3xl font-bold text-primary-foreground">
                    {member.name.split(" ").pop()?.charAt(0)}
                  </div>
                  <CardTitle className="text-center text-2xl">
                    {member.name}
                  </CardTitle>
                  <div className="text-center">
                    <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                      {member.role}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6 text-foreground">Sứ Mệnh Của Chúng Tôi</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Tại MentorX, chúng tôi tin rằng mọi người đều xứng đáng có cơ hội học hỏi và phát triển từ những người có kinh nghiệm.
            Đội ngũ của chúng tôi cam kết xây dựng một nền tảng kết nối mentor và mentee một cách hiệu quả,
            giúp mọi người đạt được mục tiêu cá nhân và nghề nghiệp của họ.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Team;
