import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {Search, GraduationCap, Home, Users, Bot } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-education.jpg";

const Index = () => {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-dark via-primary to-secondary overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <img 
          src={heroImage} 
          alt="Students pursuing international education"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
        />
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            EduConnect
          </h1>
          <p className="text-xl md:text-2xl mb-4 opacity-90">
            Bridging Dreams with Opportunities
          </p>
          <p className="text-lg mb-8 opacity-80 max-w-2xl mx-auto">
            Your gateway to international education. Connect with universities, find scholarships, 
            discover housing, and join a community of ambitious students.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
              <Link to="/signup">Get Started</Link>
            </Button>
            <Button variant="outline" size="lg" className="border-white text-primary hover:bg-white/90" asChild>
              <Link to="/scholarships">Learn More</Link>
            </Button>
          </div>
           {/* Search Bar */}
         <div className="max-w-2xl mx-auto mb-8 gap-6 mt-5 ">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="Search universities, programs, or locations..." className="pl-10 h-12 text-base" />
              </div>
              <Button size="lg" className="h-12 px-8">
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Your Journey Starts Here</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-6 text-center hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
              <GraduationCap className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Scholarships</h3>
              <p className="text-muted-foreground">Find the perfect scholarship opportunities tailored to your academic profile</p>
            </Card>
            <Card className="p-6 text-center hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
              <Home className="h-12 w-12 text-secondary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Housing</h3>
              <p className="text-muted-foreground">Discover verified accommodation near your dream universities</p>
            </Card>
            <Card className="p-6 text-center hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
              <Users className="h-12 w-12 text-tertiary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Community</h3>
              <p className="text-muted-foreground">Connect with fellow students and get support from our active forum</p>
            </Card>
            <Card className="p-6 text-center hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
              <Bot className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">AI Assistant</h3>
              <p className="text-muted-foreground">Get personalized guidance from SmartEduBot available 24/7</p>
            </Card>
          </div>
        </div>
      </section>      
    </main>
  );
};

export default Index;