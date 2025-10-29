import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import FeaturedMentors from "@/components/FeaturedMentors";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <Hero />
        <div id="how-it-works">
          <HowItWorks />
        </div>
        <FeaturedMentors />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
