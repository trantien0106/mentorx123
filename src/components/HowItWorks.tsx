import { Search, Calendar, MessageCircle, Star } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Find Your Mentor",
    description: "Browse through our curated list of expert mentors across various industries and skills"
  },
  {
    icon: Calendar,
    title: "Book a Session",
    description: "Choose a time that works for you and schedule your personalized mentorship session"
  },
  {
    icon: MessageCircle,
    title: "Connect & Learn",
    description: "Meet with your mentor through video calls and get personalized guidance"
  },
  {
    icon: Star,
    title: "Achieve Your Goals",
    description: "Track your progress and celebrate milestones as you grow in your career"
  }
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Start your mentorship journey in four simple steps
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
