import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FeatureCard } from "@/components/FeatureCard";
import { AuthModal } from "@/components/AuthModal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Shield, Users, Scale, Brain, Gavel, ChevronRight, Star, Award, Globe } from "lucide-react";

// Import images
import heroImage from "@/assets/hero-justice.jpg";
import judgesImage from "@/assets/judges-panel.jpg";
import aiChatImage from "@/assets/ai-legal-chat.jpg";

const Index = () => {
  const navigate = useNavigate();
  const [authModal, setAuthModal] = useState({ isOpen: false, feature: "" });
  const [user, setUser] = useState(null);

  const handleFeatureClick = (feature: string) => {
    if (user) {
      // User is already authenticated, navigate directly
      if (feature === "nyaya-ai") {
        navigate("/nyaya-ai");
      } else if (feature === "bias-detection") {
        navigate("/bias-detection");
      } else if (feature === "lawyers") {
        navigate("/lawyer-marketplace");
      }
    } else {
      // User needs to authenticate first
      setAuthModal({ isOpen: true, feature });
    }
  };

  const handleAuthenticated = (userData: any) => {
    setUser(userData);
    setAuthModal({ isOpen: false, feature: "" });
    
    // Navigate to the requested feature
    if (authModal.feature === "nyaya-ai") {
      navigate("/nyaya-ai");
    } else if (authModal.feature === "bias-detection") {
      navigate("/bias-detection");
    } else if (authModal.feature === "lawyers") {
      navigate("/lawyer-marketplace");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-tricolor">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-tricolor min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 via-background/50 to-judicial/20" />
        
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-justice rounded-full opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-hero rounded-full opacity-30 animate-bounce-soft"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-secondary/30 rounded-full animate-pulse-glow"></div>
        
        <div className="relative container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10 animate-fade-in">
              <div className="space-y-6">
                <Badge variant="secondary" className="w-fit animate-pulse-glow text-base px-4 py-2">
                  <Award className="w-4 h-4 mr-2" />
                  🇮🇳 AI for Social Good
                </Badge>
                <h1 className="text-5xl lg:text-7xl font-black leading-tight drop-shadow-lg">
                  <span className="text-foreground">NyaySetu</span> - Justice for Every
                  <br />
                  <span className="text-foreground">Indian Citizen 🇮🇳</span>
                </h1>
                <p className="text-xl lg:text-2xl text-foreground font-bold leading-relaxed max-w-2xl drop-shadow-md">
                  Democratizing access to justice through AI-powered legal assistance, bias detection, and smart lawyer matching.
                  <br />
                  <span className="text-foreground font-black text-2xl drop-shadow-sm"> न्याय सबके लिए 🏛️</span>
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="hero" 
                  size="lg" 
                  className="text-xl px-10 py-4 btn-glow shadow-hover"
                  onClick={() => handleFeatureClick("nyaya-ai")}
                >
                  🚀 Get Legal Help Now
                  <ChevronRight className="w-6 h-6 ml-2" />
                </Button>
                <Button 
                  variant="constitutional" 
                  size="lg" 
                  className="text-xl px-10 py-4"
                  onClick={() => setAuthModal({ isOpen: true, feature: "get-started" })}
                >
                  🚀 Get Started Free
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 pt-6">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-gradient-justice border-3 border-background shadow-md" />
                    ))}
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-foreground">10,000+</p>
                    <p className="text-sm text-muted-foreground">Citizens Helped</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                    ))}
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-foreground">4.9/5</p>
                    <p className="text-sm text-muted-foreground">User Rating</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative lg:scale-105">
              <div className="relative rounded-3xl overflow-hidden shadow-justice transform hover:scale-105 transition-all duration-700 card-hover">
                <img
                  src={heroImage}
                  alt="Indian Supreme Court - Temple of Justice"
                  className="w-full h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-secondary/20" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">🏛️ Temple of Justice</h3>
                  <p className="text-lg opacity-90">Upholding Constitutional Values</p>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-8 -left-8 w-32 h-32 bg-gradient-justice rounded-full animate-pulse-glow opacity-70" />
              <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-gradient-constitutional rounded-full animate-float opacity-80" />
              <div className="absolute top-1/2 -left-6 w-20 h-20 bg-secondary/50 rounded-full animate-bounce-soft" />
            </div>
          </div>
        </div>
      </section>

      {/* Main Features Section */}
      <section className="py-24 bg-gradient-tricolor relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/10 via-background/50 to-judicial/10"></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center space-y-8 mb-20 animate-fade-in">
            <Badge variant="secondary" className="w-fit mx-auto text-lg px-6 py-3 animate-pulse-glow">
              <Globe className="w-5 h-5 mr-2" />
              🏛️ Comprehensive Legal Platform
            </Badge>
            <h2 className="text-4xl lg:text-6xl font-black leading-tight text-foreground drop-shadow-lg">
              Three Pillars of <br />
              <span className="text-foreground">Digital Justice</span>
            </h2>
            <p className="text-xl lg:text-2xl text-foreground font-bold max-w-4xl mx-auto leading-relaxed drop-shadow-md">
              Our AI-powered ecosystem addresses the core challenges of India's justice system through 
              <span className="text-foreground font-black"> constitutional assistance</span>, 
              <span className="text-foreground font-black"> bias detection</span>, and 
              <span className="text-foreground font-black"> smart legal connections</span>.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="transform hover:scale-105 transition-all duration-500 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <FeatureCard
                title="🤖 Nyaya AI Assistant"
                description="Get instant constitutional guidance in Hindi and 12 regional languages. AI-powered legal advice, document generation, and case assessment available 24/7."
                image={aiChatImage}
                icon={<MessageSquare className="w-8 h-8 text-primary" />}
                buttonText="🚀 Start Legal Consultation"
                buttonVariant="hero"
                badges={["🆓 Free Consultation", "🌐 Multilingual", "⏰ 24/7 Available"]}
                onClick={() => handleFeatureClick("nyaya-ai")}
              />
            </div>

            <div className="transform hover:scale-105 transition-all duration-500 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <FeatureCard
                title="⚖️ Bias Detection Dashboard"
                description="Upload case judgments for AI-powered bias analysis. Detect systemic discrimination and get guidance on appeals to higher courts when bias exceeds 35%."
                image={judgesImage}
                icon={<Shield className="w-8 h-8 text-warning" />}
                buttonText="🔍 Analyze Judgment"
                buttonVariant="bias"
                badges={["🧠 AI Analysis", "👁️ Transparency", "📈 Appeal Guidance"]}
                onClick={() => handleFeatureClick("bias-detection")}
              />
            </div>

            <div className="transform hover:scale-105 transition-all duration-500 animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <FeatureCard
                title="👨‍💼 Smart Lawyer Marketplace"
                description="Find verified lawyers using AI-powered matching based on specialization, fees, location, and performance. Browse profiles, ratings, and case history."
                image={judgesImage}
                icon={<Users className="w-8 h-8 text-judicial" />}
                buttonText="🔍 Find Lawyers"
                buttonVariant="judicial"
                badges={["✅ Verified Profiles", "🎯 AI Matching", "📊 Performance Based"]}
                onClick={() => handleFeatureClick("lawyers")}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-gradient-to-r from-primary via-judicial to-primary text-primary-foreground relative overflow-hidden">
        <div className="tricolor-separator absolute top-0 w-full"></div>
        
        {/* Background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-secondary mb-4">🇮🇳 Impact Across India</h2>
            <p className="text-xl opacity-95">Making justice accessible, transparent, and fair for every citizen</p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4 p-6 bg-white/10 rounded-2xl backdrop-blur card-hover">
              <div className="w-16 h-16 bg-gradient-justice rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl lg:text-5xl font-bold text-secondary text-shimmer">10,000+</div>
              <div className="text-lg font-medium">Citizens Helped</div>
              <div className="text-sm opacity-80">Legal assistance provided</div>
            </div>
            
            <div className="text-center space-y-4 p-6 bg-white/10 rounded-2xl backdrop-blur card-hover">
              <div className="w-16 h-16 bg-gradient-justice rounded-full flex items-center justify-center mx-auto mb-4">
                <Scale className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl lg:text-5xl font-bold text-secondary text-shimmer">500+</div>
              <div className="text-lg font-medium">Verified Lawyers</div>
              <div className="text-sm opacity-80">Across all specializations</div>
            </div>
            
            <div className="text-center space-y-4 p-6 bg-white/10 rounded-2xl backdrop-blur card-hover">
              <div className="w-16 h-16 bg-gradient-justice rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl lg:text-5xl font-bold text-secondary text-shimmer">95%</div>
              <div className="text-lg font-medium">AI Accuracy</div>
              <div className="text-sm opacity-80">Bias detection precision</div>
            </div>
            
            <div className="text-center space-y-4 p-6 bg-white/10 rounded-2xl backdrop-blur card-hover">
              <div className="w-16 h-16 bg-gradient-justice rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl lg:text-5xl font-bold text-secondary text-shimmer">13</div>
              <div className="text-lg font-medium">Languages</div>
              <div className="text-sm opacity-80">Regional language support</div>
            </div>
          </div>
        </div>
        
        <div className="tricolor-separator absolute bottom-0 w-full"></div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gradient-constitutional relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 via-transparent to-judicial/20"></div>
        
        {/* Floating elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-hero rounded-full opacity-30 animate-float"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-gradient-justice rounded-full opacity-40 animate-bounce-soft"></div>
        
        <div className="container mx-auto px-4 text-center relative">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="space-y-8 animate-fade-in">
              <Badge variant="secondary" className="text-lg px-6 py-3 animate-pulse-glow">
                🚀 Join the Legal Revolution
              </Badge>
              
              <h2 className="text-4xl lg:text-7xl font-bold leading-tight">
                Ready to Access <br />
                <span className="bg-gradient-hero bg-clip-text text-transparent">Digital Justice?</span>
              </h2>
              
              <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                Join <span className="text-primary font-bold">10,000+ Indians</span> who have found legal clarity and justice through our AI-powered platform.
                <br />
                <span className="text-secondary font-semibold">🇮🇳 न्याय अब सबके पास</span>
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                variant="hero" 
                size="lg" 
                className="text-xl px-12 py-4 btn-glow shadow-hover"
                onClick={() => setAuthModal({ isOpen: true, feature: "get-started" })}
              >
                <Scale className="w-6 h-6 mr-3" />
                🚀 Get Started Free
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="constitutional" 
                size="lg" 
                className="text-xl px-12 py-4"
                onClick={() => document.querySelector('footer')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Gavel className="w-6 h-6 mr-3" />
                📚 Learn More
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6 pt-12 text-center">
              <div className="space-y-2">
                <div className="w-12 h-12 bg-gradient-justice rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white text-2xl">💳</span>
                </div>
                <p className="text-lg font-semibold">No Credit Card</p>
                <p className="text-sm text-muted-foreground">100% Free to start</p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 bg-gradient-justice rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white text-2xl">🌐</span>
                </div>
                <p className="text-lg font-semibold">13 Languages</p>
                <p className="text-sm text-muted-foreground">Regional language support</p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 bg-gradient-justice rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white text-2xl">⚖️</span>
                </div>
                <p className="text-lg font-semibold">Trusted Platform</p>
                <p className="text-sm text-muted-foreground">By legal professionals</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      
      {/* Authentication Modal */}
      <AuthModal
        isOpen={authModal.isOpen}
        onClose={() => setAuthModal({ isOpen: false, feature: "" })}
        onAuthenticated={handleAuthenticated}
      />
    </div>
  );
};

export default Index;