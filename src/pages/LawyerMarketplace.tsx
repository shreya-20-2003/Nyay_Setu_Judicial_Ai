import { useState } from "react";
import { Star, MapPin, Phone, Mail, Calendar, Upload, Filter, Search, BookOpen, Award, Clock } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";

interface Lawyer {
  id: string;
  name: string;
  specialization: string[];
  experience: number;
  rating: number;
  fees: number;
  location: string;
  availability: "Available" | "Busy" | "Not Available";
  languages: string[];
  qualifications: string[];
  bio: string;
  avatar: string;
}

const mockLawyers: Lawyer[] = [
  {
    id: "1",
    name: "Adv. Priya Sharma",
    specialization: ["Criminal Law", "Women Rights"],
    experience: 12,
    rating: 4.8,
    fees: 5000,
    location: "New Delhi",
    availability: "Available",
    languages: ["Hindi", "English", "Punjabi"],
    qualifications: ["LLB", "LLM Human Rights"],
    bio: "Experienced criminal lawyer specializing in women's rights cases with over 12 years of practice.",
    avatar: "/placeholder.svg"
  },
  {
    id: "2", 
    name: "Adv. Rajesh Kumar",
    specialization: ["Corporate Law", "Taxation"],
    experience: 15,
    rating: 4.6,
    fees: 8000,
    location: "Mumbai",
    availability: "Busy",
    languages: ["Hindi", "English", "Marathi"],
    qualifications: ["LLB", "CA", "CS"],
    bio: "Corporate law expert with extensive experience in taxation and business law matters.",
    avatar: "/placeholder.svg"
  },
  {
    id: "3",
    name: "Adv. Meera Nair", 
    specialization: ["Family Law", "Property Law"],
    experience: 8,
    rating: 4.9,
    fees: 3500,
    location: "Bangalore",
    availability: "Available",
    languages: ["English", "Malayalam", "Kannada"],
    qualifications: ["LLB", "LLM Family Law"],
    bio: "Family law specialist with a compassionate approach to sensitive legal matters.",
    avatar: "/placeholder.svg"
  }
];

const LawyerMarketplace = () => {
  const [userRole, setUserRole] = useState<"citizen" | "lawyer">("citizen");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>("");
  const [maxFees, setMaxFees] = useState([10000]);
  const [selectedAvailability, setSelectedAvailability] = useState<string>("");
  const [showFilters, setShowFilters] = useState(false);
  const [lawyerForm, setLawyerForm] = useState({
    name: "",
    email: "",
    phone: "",
    specialization: "",
    experience: "",
    fees: "",
    qualifications: "",
    languages: "",
    availability: "",
    bio: "",
    certificates: null as File | null
  });
  const { toast } = useToast();

  const filteredLawyers = mockLawyers.filter(lawyer => {
    const matchesSearch = lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lawyer.specialization.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSpecialization = selectedSpecialization === "all" || !selectedSpecialization || 
                                 lawyer.specialization.some(spec => spec.includes(selectedSpecialization));
    const matchesFees = lawyer.fees <= maxFees[0];
    const matchesAvailability = selectedAvailability === "all" || !selectedAvailability || lawyer.availability === selectedAvailability;
    
    return matchesSearch && matchesSpecialization && matchesFees && matchesAvailability;
  });

  const handleLawyerFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Registration Successful!",
      description: "Your lawyer profile has been created. It will be reviewed within 24 hours.",
    });
    // Reset form
    setLawyerForm({
      name: "",
      email: "",
      phone: "",
      specialization: "",
      experience: "",
      fees: "",
      qualifications: "",
      languages: "",
      availability: "",
      bio: "",
      certificates: null
    });
  };

  const handleCertificateUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLawyerForm(prev => ({ ...prev, certificates: file }));
      toast({
        title: "Certificate uploaded",
        description: `${file.name} has been uploaded successfully`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-tricolor relative overflow-hidden">
      {/* Tricolour Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 via-background/50 to-judicial/20"></div>
      <div className="absolute top-0 w-full h-2 bg-gradient-tricolor"></div>
      <div className="absolute bottom-0 w-full h-2 bg-gradient-tricolor"></div>
      
      <Header />
      
      <main className="container mx-auto px-4 py-8 mt-16 relative">
        {/* Header Section */}
        <div className="text-center space-y-6 mb-8 p-8 bg-gradient-to-r from-secondary/10 via-background/50 to-judicial/10 rounded-2xl border border-secondary/20 shadow-xl">
          <h1 className="text-4xl font-black text-foreground drop-shadow-lg">
            Smart Lawyer Marketplace
          </h1>
          <p className="text-lg font-bold text-foreground drop-shadow-md">
            Connect with verified legal professionals or register as a lawyer
          </p>
          <div className="tricolor-separator w-full"></div>
          
          {/* Role Selection */}
          <div className="flex justify-center space-x-4">
            <Button
              variant={userRole === "citizen" ? "default" : "outline"}
              className={userRole === "citizen" ? "bg-primary text-primary-foreground hover:bg-primary/90 font-black shadow-xl" : "border-2 border-foreground text-foreground hover:bg-foreground hover:text-background font-black shadow-xl"}
              onClick={() => setUserRole("citizen")}
            >
              I'm a Citizen 🙋
            </Button>
            <Button
              variant={userRole === "lawyer" ? "default" : "outline"}
              className={userRole === "lawyer" ? "bg-primary text-primary-foreground hover:bg-primary/90 font-black shadow-xl" : "border-2 border-foreground text-foreground hover:bg-foreground hover:text-background font-black shadow-xl"}
              onClick={() => setUserRole("lawyer")}
            >
              I'm a Lawyer 👨‍⚖️👩‍⚖️
            </Button>
          </div>
        </div>

        {userRole === "lawyer" ? (
          /* Lawyer Registration Form */
          <Card className="max-w-4xl mx-auto border-primary/20 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="h-6 w-6" />
                <span>Lawyer Registration</span>
              </CardTitle>
              <CardDescription>
                Register your profile to connect with clients seeking legal assistance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLawyerFormSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={lawyerForm.name}
                      onChange={(e) => setLawyerForm(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Adv. Your Name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={lawyerForm.email}
                      onChange={(e) => setLawyerForm(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={lawyerForm.phone}
                      onChange={(e) => setLawyerForm(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+91 98765 43210"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="specialization">Specialization</Label>
                    <Select value={lawyerForm.specialization} onValueChange={(value) => setLawyerForm(prev => ({ ...prev, specialization: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your specialization" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Criminal Law">Criminal Law</SelectItem>
                        <SelectItem value="Civil Law">Civil Law</SelectItem>
                        <SelectItem value="Family Law">Family Law</SelectItem>
                        <SelectItem value="Corporate Law">Corporate Law</SelectItem>
                        <SelectItem value="Property Law">Property Law</SelectItem>
                        <SelectItem value="Constitutional Law">Constitutional Law</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience">Experience (Years)</Label>
                    <Input
                      id="experience"
                      type="number"
                      value={lawyerForm.experience}
                      onChange={(e) => setLawyerForm(prev => ({ ...prev, experience: e.target.value }))}
                      placeholder="10"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fees">Consultation Fees (₹)</Label>
                    <Input
                      id="fees"
                      type="number"
                      value={lawyerForm.fees}
                      onChange={(e) => setLawyerForm(prev => ({ ...prev, fees: e.target.value }))}
                      placeholder="5000"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="qualifications">Qualifications</Label>
                    <Input
                      id="qualifications"
                      value={lawyerForm.qualifications}
                      onChange={(e) => setLawyerForm(prev => ({ ...prev, qualifications: e.target.value }))}
                      placeholder="LLB, LLM, etc."
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="languages">Languages Spoken</Label>
                    <Input
                      id="languages"
                      value={lawyerForm.languages}
                      onChange={(e) => setLawyerForm(prev => ({ ...prev, languages: e.target.value }))}
                      placeholder="Hindi, English, Tamil"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="availability">Availability</Label>
                  <Select value={lawyerForm.availability} onValueChange={(value) => setLawyerForm(prev => ({ ...prev, availability: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your availability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Available">Available</SelectItem>
                      <SelectItem value="Busy">Busy</SelectItem>
                      <SelectItem value="Not Available">Not Available</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">About/Bio</Label>
                  <Textarea
                    id="bio"
                    value={lawyerForm.bio}
                    onChange={(e) => setLawyerForm(prev => ({ ...prev, bio: e.target.value }))}
                    placeholder="Brief description about your practice and expertise"
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="certificates">Upload Certificates</Label>
                  <div className="border-2 border-dashed border-primary/30 rounded-lg p-4 text-center">
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleCertificateUpload}
                      className="hidden"
                      id="certificate-upload"
                    />
                    <Button 
                      variant="outline" 
                      className="cursor-pointer border-2 border-secondary text-secondary hover:bg-secondary hover:text-white font-bold shadow-lg"
                      onClick={() => document.getElementById('certificate-upload')?.click()}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Certificates
                    </Button>
                    {lawyerForm.certificates && (
                      <p className="text-sm text-muted-foreground mt-2">
                        {lawyerForm.certificates.name}
                      </p>
                    )}
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-secondary to-judicial hover:from-secondary/80 hover:to-judicial/80 text-white font-black shadow-xl" 
                  size="lg"
                  onClick={() => {
                    toast({
                      title: "🎉 Registration Successful!",
                      description: "You've successfully registered as a NyaySetu verified lawyer! Welcome aboard.",
                    });
                  }}
                >
                  Register as Lawyer
                </Button>
              </form>
            </CardContent>
          </Card>
        ) : (
          /* Citizen View - Lawyer Directory */
          <div className="space-y-6">
            {/* Search and Filters */}
            <Card className="border-primary/20 shadow-lg">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search lawyers by name or specialization..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => setShowFilters(!showFilters)}
                    >
                      <Filter className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </div>

                  {showFilters && (
                    <div className="grid md:grid-cols-3 gap-4 pt-4 border-t">
                      <div className="space-y-2">
                        <Label>Specialization</Label>
                        <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
                          <SelectTrigger>
                            <SelectValue placeholder="All specializations" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All specializations</SelectItem>
                            <SelectItem value="Criminal Law">Criminal Law</SelectItem>
                            <SelectItem value="Civil Law">Civil Law</SelectItem>
                            <SelectItem value="Family Law">Family Law</SelectItem>
                            <SelectItem value="Corporate Law">Corporate Law</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Max Fees: ₹{maxFees[0]}</Label>
                        <Slider
                          value={maxFees}
                          onValueChange={setMaxFees}
                          max={20000}
                          min={1000}
                          step={500}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Availability</Label>
                        <Select value={selectedAvailability} onValueChange={setSelectedAvailability}>
                          <SelectTrigger>
                            <SelectValue placeholder="All availability" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All availability</SelectItem>
                            <SelectItem value="Available">Available</SelectItem>
                            <SelectItem value="Busy">Busy</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Lawyers Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLawyers.map((lawyer) => (
                <Card key={lawyer.id} className="border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={lawyer.avatar} alt={lawyer.name} />
                        <AvatarFallback>{lawyer.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{lawyer.name}</CardTitle>
                        <div className="flex items-center space-x-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < Math.floor(lawyer.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} 
                            />
                          ))}
                          <span className="text-sm text-muted-foreground ml-1">({lawyer.rating})</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{lawyer.location}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {lawyer.specialization.map((spec, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {spec}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{lawyer.experience} years</span>
                      </div>
                      <Badge 
                        variant={lawyer.availability === "Available" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {lawyer.availability}
                      </Badge>
                    </div>

                    <div className="text-lg font-semibold text-primary">
                      ₹{lawyer.fees} / consultation
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {lawyer.bio}
                    </p>

                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1">
                        <Phone className="h-4 w-4 mr-1" />
                        Call
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Mail className="h-4 w-4 mr-1" />
                        Email
                      </Button>
                    </div>

                    <Button variant="justice" className="w-full">
                      <Calendar className="h-4 w-4 mr-2" />
                      Book Consultation
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredLawyers.length === 0 && (
              <Card className="border-primary/20 shadow-lg">
                <CardContent className="text-center py-12">
                  <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No lawyers found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search criteria or filters
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedSpecialization("");
                      setMaxFees([10000]);
                      setSelectedAvailability("");
                    }}
                  >
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default LawyerMarketplace;