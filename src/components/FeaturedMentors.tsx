import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, CheckCircle, ArrowRight } from "lucide-react";
import mentor1 from "@/assets/mentor-1.jpg";
import mentor2 from "@/assets/mentor-2.jpg";
import mentor3 from "@/assets/mentor-3.jpg";

const mentors = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Senior Product Manager",
    company: "Tech Corp",
    image: mentor1,
    rating: 4.9,
    reviews: 127,
    price: 75,
    skills: ["Product Strategy", "Agile", "Leadership"],
    verified: true
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Lead Software Engineer",
    company: "Innovation Labs",
    image: mentor2,
    rating: 4.8,
    reviews: 93,
    price: 85,
    skills: ["React", "System Design", "Mentoring"],
    verified: true
  },
  {
    id: 3,
    name: "Emma Martinez",
    role: "Creative Director",
    company: "Design Studio",
    image: mentor3,
    rating: 5.0,
    reviews: 156,
    price: 90,
    skills: ["UX Design", "Branding", "Creative Strategy"],
    verified: true
  }
];

const FeaturedMentors = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">Featured Mentors</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect with industry leaders who are passionate about helping others succeed
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {mentors.map((mentor) => (
            <div 
              key={mentor.id}
              className="group bg-card rounded-2xl overflow-hidden shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-strong)] transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative h-64 overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
                <img 
                  src={mentor.image} 
                  alt={mentor.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {mentor.verified && (
                  <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full flex items-center gap-1 text-sm font-medium">
                    <CheckCircle className="w-4 h-4" />
                    Verified
                  </div>
                )}
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-2xl font-semibold mb-1">{mentor.name}</h3>
                  <p className="text-muted-foreground">{mentor.role}</p>
                  <p className="text-sm text-muted-foreground">{mentor.company}</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-accent">
                    <Star className="w-5 h-5 fill-current" />
                    <span className="font-semibold">{mentor.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">({mentor.reviews} reviews)</span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {mentor.skills.map((skill, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
                
                <div className="pt-4 border-t flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-primary">${mentor.price}</span>
                    <span className="text-muted-foreground text-sm">/hour</span>
                  </div>
                  <Button variant="default" className="gap-2 group/btn">
                    View Profile
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            View All Mentors
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedMentors;
