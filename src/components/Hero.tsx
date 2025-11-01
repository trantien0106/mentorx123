import { Button } from "@/components/ui/button";
import { ArrowRight, Search } from "lucide-react";
import heroImage from "@/assets/hero-mentorship.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[image:var(--gradient-hero)] opacity-10" />
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-5"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-4">
            <p className="text-sm font-medium text-primary">Kết nối. Học hỏi. Phát triển.</p>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Tìm Mentor
            <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent"> Hoàn Hảo</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Kết nối với những chuyên gia giàu kinh nghiệm để định hướng con đường sự nghiệp và đạt được mục tiêu của bạn
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button variant="hero" size="xl" className="gap-2 group" onClick={() => window.location.href = '/mentors'}>
              Tìm Mentor
              <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </Button>
            <Button variant="outline" size="xl" className="gap-2">
              Trở thành Mentor
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
          
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-12">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">1000+</div>
              <div className="text-sm text-muted-foreground">Mentor Chuyên Nghiệp</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">50k+</div>
              <div className="text-sm text-muted-foreground">Buổi Học Hoàn Thành</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">4.9/5</div>
              <div className="text-sm text-muted-foreground">Đánh Giá Trung Bình</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
