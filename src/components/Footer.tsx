import { Github, Twitter, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary/30 border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-semibold mb-4">Dành cho Mentee</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Tìm Mentor</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Cách hoạt động</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Câu chuyện thành công</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Dành cho Mentor</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Trở thành Mentor</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Tài nguyên Mentor</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Cộng đồng</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Công ty</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Về chúng tôi</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Tuyển dụng</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Liên hệ</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Pháp lý</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Chính sách bảo mật</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Điều khoản dịch vụ</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Chính sách Cookie</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold">M</span>
            </div>
            <span className="font-semibold">MentorX</span>
          </div>
          
          <p className="text-sm text-muted-foreground">
            © 2025 MentorX. Bảo lưu mọi quyền.
          </p>
          
          <div className="flex items-center gap-4">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
