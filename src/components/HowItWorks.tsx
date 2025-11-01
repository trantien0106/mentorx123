import { Search, Calendar, MessageCircle, Star } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Tìm Mentor của bạn",
    description: "Duyệt qua danh sách các mentor chuyên nghiệp trong nhiều lĩnh vực và kỹ năng khác nhau"
  },
  {
    icon: Calendar,
    title: "Đặt lịch học",
    description: "Chọn thời gian phù hợp và đặt lịch học cá nhân hóa với mentor"
  },
  {
    icon: MessageCircle,
    title: "Kết nối & Học hỏi",
    description: "Gặp gỡ mentor qua video call và nhận được hướng dẫn cá nhân hóa"
  },
  {
    icon: Star,
    title: "Đạt được mục tiêu",
    description: "Theo dõi tiến trình và kỷ niệm những cột mốc quan trọng trong sự nghiệp"
  }
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">Cách Hoạt Động</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Bắt đầu hành trình mentorship của bạn chỉ trong 4 bước đơn giản
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="relative p-8 bg-card rounded-xl shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute -top-4 left-8 w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {index + 1}
              </div>
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 mt-4">
                <step.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
