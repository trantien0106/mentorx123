import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success("Đã đăng xuất");
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border shadow-[var(--shadow-soft)]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">M</span>
            </div>
            <span className="text-xl font-bold">MentorX</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <Link to="/mentors" className="text-foreground hover:text-primary transition">
              Tìm Mentor
            </Link>
            <a href="/#how-it-works" className="text-foreground hover:text-primary transition">
              Cách hoạt động
            </a>
            <Link to="/forum" className="text-foreground hover:text-primary transition">
              Diễn đàn
            </Link>
            {user && (
              <Link to="/messages" className="text-foreground hover:text-primary transition flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                Tin nhắn
              </Link>
            )}
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <span className="text-sm text-muted-foreground">
                  {user.email}
                </span>
                <Button variant="ghost" size="sm" onClick={handleSignOut}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Đăng xuất
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/auth">Đăng nhập</Link>
                </Button>
                <Button asChild>
                  <Link to="/auth">Bắt đầu</Link>
                </Button>
              </>
            )}
          </div>
          
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-background border-b shadow-lg p-4 space-y-4">
            <Link
              to="/mentors"
              className="block text-foreground hover:text-primary transition py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Tìm Mentor
            </Link>
            <a
              href="/#how-it-works"
              className="block text-foreground hover:text-primary transition py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Cách hoạt động
            </a>
            <Link
              to="/forum"
              className="block text-foreground hover:text-primary transition py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Diễn đàn
            </Link>
            {user && (
              <Link
                to="/messages"
                className="block text-foreground hover:text-primary transition py-2 flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <MessageCircle className="w-4 h-4" />
                Tin nhắn
              </Link>
            )}
            <div className="flex flex-col gap-2 pt-4 border-t">
              {user ? (
                <>
                  <span className="text-sm text-muted-foreground py-2">
                    {user.email}
                  </span>
                  <Button variant="ghost" className="w-full" onClick={handleSignOut}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Đăng xuất
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" className="w-full" asChild>
                    <Link to="/auth">Đăng nhập</Link>
                  </Button>
                  <Button className="w-full" asChild>
                    <Link to="/auth">Bắt đầu</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
