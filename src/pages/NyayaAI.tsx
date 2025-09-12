import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LawyerCarousel } from "@/components/LawyerCarousel";
import { CaseHistory } from "@/components/CaseHistory";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  MessageSquare, 
  Send, 
  User, 
  Bot, 
  Scale, 
  AlertTriangle,
  FileText,
  Users,
  Clock,
  TrendingUp,
  BarChart3
} from "lucide-react";
import { SpeechFeatures } from "@/components/SpeechFeatures";
import { TricolourChart } from "@/components/TricolourChart";

// Mock data for lawyers
const mockLawyers = [
  {
    id: "1",
    name: "Adv. Priya Sharma",
    specialization: "Criminal Law",
    experience: 8,
    fees: 3000,
    rating: 4.8,
    cases_won: 156,
    location: "Delhi High Court",
    availability: "available" as const,
    phone: "+91-9876543210",
    email: "priya.sharma@lawfirm.com",
    bio: "Experienced criminal lawyer with expertise in white-collar crimes, cybercrime, and constitutional matters. Successfully handled over 150 cases with a 85% success rate.",
    qualifications: ["LLB", "LLM Criminal Law", "Cyber Law Certificate"],
    avatar: "/api/placeholder/120/120",
  },
  {
    id: "2",
    name: "Adv. Rajesh Kumar",
    specialization: "Constitutional Law",
    experience: 12,
    fees: 4500,
    rating: 4.9,
    cases_won: 234,
    location: "Supreme Court",
    availability: "busy" as const,
    phone: "+91-9876543211",
    email: "rajesh.kumar@lawfirm.com",
    bio: "Senior advocate specializing in constitutional law and human rights. Regular practitioner at Supreme Court with extensive experience in landmark cases.",
    qualifications: ["LLB", "LLM Constitutional Law", "Human Rights Certificate"],
    avatar: "/api/placeholder/120/120",
  },
  {
    id: "3",
    name: "Adv. Meena Patel",
    specialization: "Criminal Defense",
    experience: 6,
    fees: 2500,
    rating: 4.7,
    cases_won: 89,
    location: "Mumbai Sessions Court",
    availability: "available" as const,
    phone: "+91-9876543212",
    email: "meena.patel@lawfirm.com",
    bio: "Criminal defense specialist with focus on fraud cases, financial crimes, and appeals. Known for meticulous case preparation and strong courtroom presence.",
    qualifications: ["LLB", "Diploma in Criminal Law", "Forensic Accounting"],
    avatar: "/api/placeholder/120/120",
  },
];

// Mock case history data
const mockCases = [
  {
    id: "1",
    title: "State vs. Tech Startup CEO - Cheating and Criminal Breach of Trust",
    year: 2023,
    court: "Delhi High Court",
    outcome: "won" as const,
    description: "A case involving allegations of cheating investors and criminal breach of trust. The defense successfully argued lack of intent to deceive and proved that business failure does not constitute criminal breach of trust.",
    penalty: "Case dismissed, accused acquitted of all charges",
    precedent: true,
    relevanceScore: 92,
  },
  {
    id: "2",
    title: "Investor vs. Startup Founder - Section 420 IPC",
    year: 2022,
    court: "Mumbai Sessions Court",
    outcome: "settled" as const,
    description: "Civil and criminal case filed by investors claiming cheating under Section 420 IPC. Case was settled through mediation with compensation agreement.",
    penalty: "Settled with ₹50 lakh compensation, criminal charges withdrawn",
    precedent: false,
    relevanceScore: 87,
  },
  {
    id: "3",
    title: "SEBI vs. Tech Company - Securities Fraud",
    year: 2021,
    court: "Securities Appellate Tribunal",
    outcome: "lost" as const,
    description: "Regulatory action for securities fraud and misleading investors. The tribunal found sufficient evidence of intentional misrepresentation in financial statements.",
    penalty: "₹2 crore penalty, 5-year market ban for promoters",
    precedent: false,
    relevanceScore: 78,
  },
];

interface ChatMessage {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
}

// Mock user data
const mockUser = {
  id: "1",
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: "/api/placeholder/40/40",
  joinDate: "March 2024",
  consultations: 3,
  cases: 1,
};

const NyayaAI = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "ai",
      content: "नमस्ते! I'm your AI legal assistant. Please describe the legal issue or crime you need help with. I can provide constitutional guidance, suggest relevant laws, and connect you with specialized lawyers.",
      timestamp: new Date(),
    }
  ]);
  
  const [inputValue, setInputValue] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [crimeType, setCrimeType] = useState("");

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response and analyze crime type
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: `Based on your description, this appears to be related to **fraud and criminal breach of trust** under Sections 420 and 406 of the Indian Penal Code.

**Legal Analysis:**
• Section 420 IPC - Cheating and dishonestly inducing delivery of property
• Section 406 IPC - Criminal breach of trust
• Possible civil remedies under Contract Act

**Immediate Steps:**
1. Preserve all evidence (contracts, communications, financial records)
2. File a complaint with police (if criminal breach involved)
3. Consider civil suit for damages
4. Consult a criminal law specialist

I've found specialized lawyers and similar cases that might help your situation. Please review the recommendations below.`,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiResponse]);
      setCrimeType("Fraud and Criminal Breach of Trust");
      setShowResults(true);
    }, 2000);

    setInputValue("");
  };

  return (
    <div className="min-h-screen bg-gradient-tricolor">
      <Header />
      
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="text-center mb-8 p-8 bg-gradient-to-r from-secondary/10 via-background/50 to-judicial/10 rounded-2xl shadow-xl">
          <h1 className="text-4xl font-black mb-4 text-foreground drop-shadow-lg">NyayaAI Assistant</h1>
          <p className="text-xl text-foreground font-bold mb-6 drop-shadow-md">
            Get instant legal guidance powered by advanced AI
          </p>
          <div className="tricolor-separator w-full"></div>
        </div>
        <div className="grid lg:grid-cols-4 gap-8">
          {/* User Profile Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader className="text-center pb-4">
                <Avatar className="w-20 h-20 mx-auto ring-4 ring-primary/20">
                  <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                  <AvatarFallback>{mockUser.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-lg">{mockUser.name}</CardTitle>
                <p className="text-sm text-muted-foreground">Member since {mockUser.joinDate}</p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-primary">{mockUser.consultations}</div>
                    <div className="text-xs text-muted-foreground">Consultations</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-judicial">{mockUser.cases}</div>
                    <div className="text-xs text-muted-foreground">Active Cases</div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Badge variant="secondary" className="w-full justify-center">
                    <Scale className="w-3 h-3 mr-1" />
                    Constitutional Rights
                  </Badge>
                  <Badge variant="outline" className="w-full justify-center">
                    <FileText className="w-3 h-3 mr-1" />
                    Legal Documents
                  </Badge>
                  <Badge variant="outline" className="w-full justify-center">
                    <Users className="w-3 h-3 mr-1" />
                    Lawyer Network
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Chat Interface */}
          <div className="lg:col-span-3 space-y-8">
            {/* Chat Section */}
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  Nyaya AI Assistant
                  <Badge variant="secondary" className="ml-auto">
                    <Clock className="w-3 h-3 mr-1" />
                    Available 24/7
                  </Badge>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col overflow-hidden p-0">
                {/* Messages Container */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {messages.map((message, index) => (
                    <div
                      key={message.id}
                      className={`flex gap-4 ${message.type === "user" ? "justify-end" : "justify-start"}`}
                      style={{ marginBottom: index < messages.length - 1 ? '24px' : '0' }}
                    >
                      {message.type === "ai" && (
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-10 h-10 bg-gradient-hero rounded-full flex items-center justify-center shadow-md">
                            <Bot className="w-5 h-5 text-white" />
                          </div>
                        </div>
                      )}
                      
                      <div
                        className={`max-w-[70%] p-4 rounded-2xl shadow-sm transition-all duration-200 hover:shadow-md ${
                          message.type === "user"
                            ? "bg-primary text-primary-foreground rounded-br-sm"
                            : "bg-muted rounded-bl-sm"
                        }`}
                      >
                        <div className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                          {message.content}
                        </div>
                        <div className="text-xs opacity-70 mt-3 text-right">
                          {message.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                      
                      {message.type === "user" && (
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-10 h-10 bg-judicial rounded-full flex items-center justify-center shadow-md">
                            <User className="w-5 h-5 text-white" />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                {/* Input Area */}
                <div className="border-t bg-background/50 p-6">
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <Textarea
                        placeholder="Describe your legal issue or crime you need help with..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="flex-1 min-h-[80px] max-h-[120px] resize-none border-2 focus:border-primary/50 rounded-xl"
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                      />
                      <Button
                        variant="hero"
                        onClick={handleSendMessage}
                        disabled={!inputValue.trim()}
                        className="px-6 py-3 h-auto self-end rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
                      >
                        <Send className="w-5 h-5" />
                      </Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <SpeechFeatures 
                        onSpeechToText={(text) => setInputValue(prev => prev + " " + text)}
                      />
                      {messages.length > 1 && (
                        <SpeechFeatures 
                          textToRead={messages[messages.length - 1]?.content}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cases Analytics */}
            {showResults && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    Case Analytics - Cases Won vs Lost
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <TricolourChart
                      data={[
                        { name: 'Cases Won', value: 156, category: 'won' },
                        { name: 'Cases Lost', value: 23, category: 'lost' },
                        { name: 'Pending', value: 12, category: 'pending' }
                      ]}
                      type="bar"
                      title="📊 Case Outcomes Distribution"
                    />
                    <TricolourChart
                      data={[
                        { name: 'Won', value: 156, category: 'won' },
                        { name: 'Lost', value: 23, category: 'lost' },
                        { name: 'Pending', value: 12, category: 'pending' }
                      ]}
                      type="pie"
                      title="🎯 Success Rate Analysis"
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Results Section */}
            {showResults && (
              <div className="space-y-8">
                {/* Lawyer Recommendations */}
                <LawyerCarousel lawyers={mockLawyers} crimeType={crimeType} />
                
                {/* Case History */}
                <CaseHistory crimeType={crimeType} cases={mockCases} />
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default NyayaAI;
