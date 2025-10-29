import { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  Star, 
  CheckCircle, 
  MapPin, 
  Briefcase, 
  Calendar,
  MessageCircle,
  Award,
  Users,
  Clock,
  DollarSign,
  Heart
} from "lucide-react";
import mentor1 from "@/assets/mentor-1.jpg";
import mentor2 from "@/assets/mentor-2.jpg";
import mentor3 from "@/assets/mentor-3.jpg";

const mentorData = {
  "1": {
    id: 1,
    name: "Sarah Johnson",
    role: "Senior Product Manager",
    company: "Tech Corp",
    image: mentor1,
    rating: 4.9,
    reviews: 127,
    totalSessions: 450,
    responseTime: "2 hours",
    price: 75,
    skills: ["Product Strategy", "Agile", "Leadership", "User Research", "Roadmapping", "Stakeholder Management"],
    verified: true,
    location: "San Francisco, CA",
    languages: ["English", "Spanish"],
    bio: "I'm a Senior Product Manager with over 10 years of experience building products that millions of users love. I've worked at both startups and large tech companies, giving me a unique perspective on product development at different scales. My passion is helping aspiring PMs develop the strategic thinking and leadership skills needed to succeed.",
    experience: [
      {
        title: "Senior Product Manager",
        company: "Tech Corp",
        period: "2020 - Present",
        description: "Leading product strategy for B2B SaaS platform serving 50k+ businesses"
      },
      {
        title: "Product Manager",
        company: "Innovation Labs",
        period: "2017 - 2020",
        description: "Launched 3 successful products from 0 to 1, growing to $10M ARR"
      },
      {
        title: "Associate Product Manager",
        company: "Startup Inc",
        period: "2014 - 2017",
        description: "Managed mobile app with 2M+ downloads and 4.8 star rating"
      }
    ],
    availability: [
      "Monday: 9:00 AM - 5:00 PM",
      "Wednesday: 1:00 PM - 7:00 PM",
      "Friday: 10:00 AM - 4:00 PM",
      "Saturday: 2:00 PM - 6:00 PM"
    ],
    topReviews: [
      {
        name: "Michael R.",
        rating: 5,
        date: "2 weeks ago",
        comment: "Sarah provided incredible insights into product strategy. Her real-world examples and frameworks were exactly what I needed. Highly recommend!"
      },
      {
        name: "Jennifer L.",
        rating: 5,
        date: "1 month ago",
        comment: "Amazing mentor! Sarah helped me prepare for PM interviews and I got offers from 3 companies. Her coaching style is supportive yet challenging."
      },
      {
        name: "David K.",
        rating: 4,
        date: "2 months ago",
        comment: "Very knowledgeable and patient. Gave me practical advice for leading my first product team."
      }
    ]
  },
  "2": {
    id: 2,
    name: "Michael Chen",
    role: "Lead Software Engineer",
    company: "Innovation Labs",
    image: mentor2,
    rating: 4.8,
    reviews: 93,
    totalSessions: 320,
    responseTime: "4 hours",
    price: 85,
    skills: ["React", "System Design", "Mentoring", "TypeScript", "Node.js", "AWS"],
    verified: true,
    location: "Seattle, WA",
    languages: ["English", "Mandarin"],
    bio: "Lead Software Engineer specializing in building scalable web applications. I've mentored 50+ engineers throughout my career and love helping developers level up their technical and soft skills. Whether you're preparing for interviews or looking to grow in your current role, I'm here to help.",
    experience: [
      {
        title: "Lead Software Engineer",
        company: "Innovation Labs",
        period: "2019 - Present",
        description: "Leading engineering team of 12, architecting microservices handling 10M+ requests/day"
      },
      {
        title: "Senior Software Engineer",
        company: "Cloud Systems",
        period: "2016 - 2019",
        description: "Built real-time analytics platform processing 100TB+ data daily"
      },
      {
        title: "Software Engineer",
        company: "Tech Solutions",
        period: "2013 - 2016",
        description: "Full-stack development using React and Node.js"
      }
    ],
    availability: [
      "Tuesday: 6:00 PM - 9:00 PM",
      "Thursday: 6:00 PM - 9:00 PM",
      "Sunday: 10:00 AM - 2:00 PM"
    ],
    topReviews: [
      {
        name: "Sarah M.",
        rating: 5,
        date: "1 week ago",
        comment: "Michael's system design knowledge is outstanding. He broke down complex concepts into digestible pieces. Aced my interview!"
      },
      {
        name: "Alex P.",
        rating: 5,
        date: "3 weeks ago",
        comment: "Best coding mentor I've had. Very patient and provides excellent code reviews."
      },
      {
        name: "Emma T.",
        rating: 4,
        date: "1 month ago",
        comment: "Great mentor with deep technical knowledge. Helped me understand React patterns better."
      }
    ]
  },
  "3": {
    id: 3,
    name: "Emma Martinez",
    role: "Creative Director",
    company: "Design Studio",
    image: mentor3,
    rating: 5.0,
    reviews: 156,
    totalSessions: 580,
    responseTime: "1 hour",
    price: 90,
    skills: ["UX Design", "Branding", "Creative Strategy", "Design Systems", "User Research", "Figma"],
    verified: true,
    location: "New York, NY",
    languages: ["English", "French"],
    bio: "Award-winning Creative Director with 12+ years of experience crafting memorable brand experiences. I've led design for Fortune 500 companies and fast-growing startups. My mentoring focuses on developing both creative excellence and strategic thinking to help designers make real business impact.",
    experience: [
      {
        title: "Creative Director",
        company: "Design Studio",
        period: "2018 - Present",
        description: "Leading creative vision for 50+ client projects annually, managing team of 15 designers"
      },
      {
        title: "Senior UX Designer",
        company: "Digital Agency",
        period: "2015 - 2018",
        description: "Redesigned core products resulting in 200% increase in user engagement"
      },
      {
        title: "UX Designer",
        company: "Creative Co",
        period: "2012 - 2015",
        description: "Conducted user research and designed experiences for mobile and web products"
      }
    ],
    availability: [
      "Monday: 10:00 AM - 6:00 PM",
      "Tuesday: 2:00 PM - 8:00 PM",
      "Thursday: 10:00 AM - 4:00 PM",
      "Saturday: 11:00 AM - 3:00 PM"
    ],
    topReviews: [
      {
        name: "James W.",
        rating: 5,
        date: "3 days ago",
        comment: "Emma is phenomenal! Her portfolio reviews are incredibly detailed and actionable. Already seeing results in my job applications."
      },
      {
        name: "Lisa K.",
        rating: 5,
        date: "2 weeks ago",
        comment: "The best design mentor on this platform. Emma helped me transition from graphic design to UX. Forever grateful!"
      },
      {
        name: "Robert H.",
        rating: 5,
        date: "1 month ago",
        comment: "Outstanding mentor. Great balance of critique and encouragement. Highly recommend for any designer looking to grow."
      }
    ]
  }
};

const MentorProfile = () => {
  const { id } = useParams();
  const mentor = mentorData[id as keyof typeof mentorData] || mentorData["1"];
  const [isFavorited, setIsFavorited] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <Card className="p-8 shadow-[var(--shadow-medium)]">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="relative">
                      <Avatar className="w-32 h-32 border-4 border-primary/20">
                        <AvatarImage src={mentor.image} alt={mentor.name} />
                        <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {mentor.verified && (
                        <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground p-2 rounded-full">
                          <CheckCircle className="w-5 h-5" />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h1 className="text-3xl font-bold mb-1">{mentor.name}</h1>
                          <p className="text-xl text-muted-foreground">{mentor.role}</p>
                          <p className="text-muted-foreground flex items-center gap-2 mt-2">
                            <Briefcase className="w-4 h-4" />
                            {mentor.company}
                          </p>
                        </div>
                        <Button
                          variant={isFavorited ? "default" : "outline"}
                          size="icon"
                          onClick={() => setIsFavorited(!isFavorited)}
                          className="rounded-full"
                        >
                          <Heart className={`w-5 h-5 ${isFavorited ? "fill-current" : ""}`} />
                        </Button>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 py-2">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{mentor.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">Responds in {mentor.responseTime}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{mentor.totalSessions}+ sessions</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 pt-2">
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-5 h-5 ${
                                  i < Math.floor(mentor.rating)
                                    ? "fill-accent text-accent"
                                    : "text-muted"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="font-semibold text-lg">{mentor.rating}</span>
                          <span className="text-muted-foreground">({mentor.reviews} reviews)</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 pt-2">
                        {mentor.skills.map((skill, idx) => (
                          <Badge key={idx} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>

                <Tabs defaultValue="about" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="about">About</TabsTrigger>
                    <TabsTrigger value="experience">Experience</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="about" className="space-y-4">
                    <Card className="p-6">
                      <h3 className="text-xl font-semibold mb-4">About Me</h3>
                      <p className="text-muted-foreground leading-relaxed">{mentor.bio}</p>
                      
                      <div className="grid md:grid-cols-2 gap-6 mt-6 pt-6 border-t">
                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <Award className="w-5 h-5 text-primary" />
                            Languages
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {mentor.languages.map((lang, idx) => (
                              <Badge key={idx} variant="outline">{lang}</Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-primary" />
                            Availability
                          </h4>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            {mentor.availability.map((time, idx) => (
                              <li key={idx}>{time}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="experience" className="space-y-4">
                    {mentor.experience.map((exp, idx) => (
                      <Card key={idx} className="p-6">
                        <div className="flex gap-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Briefcase className="w-6 h-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold">{exp.title}</h4>
                            <p className="text-muted-foreground">{exp.company}</p>
                            <p className="text-sm text-muted-foreground mt-1">{exp.period}</p>
                            <p className="text-muted-foreground mt-3">{exp.description}</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="reviews" className="space-y-4">
                    {mentor.topReviews.map((review, idx) => (
                      <Card key={idx} className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <p className="font-semibold">{review.name}</p>
                            <p className="text-sm text-muted-foreground">{review.date}</p>
                          </div>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? "fill-accent text-accent"
                                    : "text-muted"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-muted-foreground">{review.comment}</p>
                      </Card>
                    ))}
                    
                    <div className="text-center pt-4">
                      <Button variant="outline">Load More Reviews</Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              <div className="lg:col-span-1">
                <Card className="p-6 sticky top-24 shadow-[var(--shadow-strong)]">
                  <div className="space-y-6">
                    <div className="text-center pb-6 border-b">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <DollarSign className="w-6 h-6 text-primary" />
                        <span className="text-4xl font-bold text-primary">${mentor.price}</span>
                      </div>
                      <p className="text-muted-foreground">per hour session</p>
                    </div>
                    
                    <Button variant="hero" size="lg" className="w-full gap-2">
                      <Calendar className="w-5 h-5" />
                      Book a Session
                    </Button>
                    
                    <Button variant="outline" size="lg" className="w-full gap-2">
                      <MessageCircle className="w-5 h-5" />
                      Send Message
                    </Button>
                    
                    <div className="pt-6 border-t space-y-3 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span>Instant booking confirmation</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span>Free cancellation 24h before</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span>Secure video conferencing</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span>Session recording available</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MentorProfile;
