import { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { BookingDialog } from "@/components/BookingDialog";
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
import { allMentors } from "@/data/mentors";

const mentorDataMap = Object.fromEntries(
  allMentors.map(mentor => [mentor.id.toString(), mentor])
);

const MentorProfile = () => {
  const { id } = useParams();
  const mentor = mentorDataMap[id as string] || allMentors[0];
  const [isFavorited, setIsFavorited] = useState(false);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);

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
                    
                    <Button 
                      variant="hero" 
                      size="lg" 
                      className="w-full gap-2"
                      onClick={() => setBookingDialogOpen(true)}
                    >
                      <Calendar className="w-5 h-5" />
                      Đặt lịch
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
      
      <BookingDialog
        open={bookingDialogOpen}
        onOpenChange={setBookingDialogOpen}
        mentorId={mentor.id.toString()}
        mentorName={mentor.name}
        basePrice={mentor.price}
      />
    </div>
  );
};

export default MentorProfile;
