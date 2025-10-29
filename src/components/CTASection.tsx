import { Button } from "@/components/ui/button";
import { Sparkles, Users } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[image:var(--gradient-primary)] opacity-5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-10 text-primary-foreground shadow-[var(--shadow-strong)] hover:shadow-[var(--shadow-glow)] transition-all duration-300">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-bold mb-4">Looking for Guidance?</h3>
              <p className="text-primary-foreground/90 mb-6 text-lg">
                Connect with expert mentors who can help accelerate your career growth and achieve your goals faster.
              </p>
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Find Your Mentor
              </Button>
            </div>
            
            <div className="bg-gradient-to-br from-accent to-accent/80 rounded-3xl p-10 text-accent-foreground shadow-[var(--shadow-strong)] hover:shadow-[var(--shadow-glow)] transition-all duration-300">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-bold mb-4">Share Your Expertise</h3>
              <p className="text-accent-foreground/90 mb-6 text-lg">
                Join our community of mentors and make a meaningful impact by guiding the next generation of professionals.
              </p>
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Become a Mentor
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
