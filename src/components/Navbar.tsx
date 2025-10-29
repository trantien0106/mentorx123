import { Button } from "@/components/ui/button";
import { Menu, User } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border shadow-[var(--shadow-soft)]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">M</span>
            </div>
            <span className="text-xl font-bold">MentorConnect</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="/mentors" className="text-foreground hover:text-primary transition-colors font-medium">
              Find Mentors
            </a>
            <a href="#how-it-works" className="text-foreground hover:text-primary transition-colors font-medium">
              How It Works
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">
              Forum
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">
              Pricing
            </a>
          </div>
          
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost">
              Sign In
            </Button>
            <Button variant="default" className="gap-2">
              <User className="w-4 h-4" />
              Get Started
            </Button>
          </div>
          
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-3 border-t">
            <a href="#" className="block text-foreground hover:text-primary transition-colors font-medium py-2">
              Find Mentors
            </a>
            <a href="#" className="block text-foreground hover:text-primary transition-colors font-medium py-2">
              How It Works
            </a>
            <a href="#" className="block text-foreground hover:text-primary transition-colors font-medium py-2">
              Forum
            </a>
            <a href="#" className="block text-foreground hover:text-primary transition-colors font-medium py-2">
              Pricing
            </a>
            <div className="pt-3 space-y-2">
              <Button variant="ghost" className="w-full">
                Sign In
              </Button>
              <Button variant="default" className="w-full gap-2">
                <User className="w-4 h-4" />
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
