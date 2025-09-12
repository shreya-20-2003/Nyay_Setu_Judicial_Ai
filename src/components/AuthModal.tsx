import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Scale,
  User,
  UserCheck,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Gavel,
  Upload
} from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticated: (user: any) => void;
}

export const AuthModal = ({
  isOpen,
  onClose,
  onAuthenticated
}: AuthModalProps) => {
  const [activeTab, setActiveTab] = useState("signin");
  const [userType, setUserType] = useState<"citizen" | "lawyer" | "judge">("citizen");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    location: "",
    barRegistration: "",
    specialization: "",
    experience: "",
    fees: "",
    qualifications: "",
    about: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignIn = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });
      const data = await res.json();
      if (res.ok) {
        onAuthenticated(data.user || data);
        onClose();
      } else {
        alert(data.error || "Login failed");
      }
    } catch (err) {
      alert("Network error");
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          location: formData.location,
          barRegistration: formData.barRegistration,
          specialization: formData.specialization,
          experience: formData.experience,
          fees: formData.fees,
          qualifications: formData.qualifications,
          about: formData.about,
          type: userType
        })
      });
      const data = await res.json();
      if (res.ok) {
        onAuthenticated(data.user || data);
        onClose();
      } else {
        alert(data.error || "Registration failed");
      }
    } catch (err) {
      alert("Network error");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-screen overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-primary" />
            Access NyaySetu
          </DialogTitle>
          <DialogDescription>
            Choose your role to access constitutional guidance and legal assistance
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Sign In
            </TabsTrigger>
            <TabsTrigger value="signup" className="flex items-center gap-2">
              <UserCheck className="w-4 h-4" />
              Sign Up
            </TabsTrigger>
          </TabsList>

          {/* Sign In Tab */}
          <TabsContent value="signin" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Welcome Back</CardTitle>
                <CardDescription>Enter your credentials to continue</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">Email</Label>
                  <Input
                    id="signin-email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signin-password">Password</Label>
                  <Input
                    id="signin-password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                  />
                </div>
                <Button variant="hero" className="w-full" onClick={handleSignIn}>
                  Sign In
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sign Up Tab */}
          <TabsContent value="signup" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Create Account</CardTitle>
                <CardDescription>Join NyaySetu to access legal assistance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>I am a</Label>
                  <Select value={userType} onValueChange={(value: "citizen" | "lawyer" | "judge") => setUserType(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="citizen">Citizen</SelectItem>
                      <SelectItem value="lawyer">Lawyer</SelectItem>
                      <SelectItem value="judge">Judge</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <Input
                      id="signup-name"
                      placeholder="Enter full name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-phone">Phone</Label>
                    <Input
                      id="signup-phone"
                      placeholder="+91 9876543210"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-location">Location</Label>
                  <Input
                    id="signup-location"
                    placeholder="City, State"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                  />
                </div>

                {/* Lawyer Fields */}
                {userType === "lawyer" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="bar-registration">Bar Registration Number</Label>
                      <Input
                        id="bar-registration"
                        placeholder="Bar registration number"
                        value={formData.barRegistration}
                        onChange={(e) => handleInputChange("barRegistration", e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="specialization">Specialization</Label>
                        <Select
                          value={formData.specialization}
                          onValueChange={(value) => handleInputChange("specialization", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select specialization" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="criminal">Criminal Law</SelectItem>
                            <SelectItem value="civil">Civil Law</SelectItem>
                            <SelectItem value="family">Family Law</SelectItem>
                            <SelectItem value="corporate">Corporate Law</SelectItem>
                            <SelectItem value="property">Property Law</SelectItem>
                            <SelectItem value="constitutional">Constitutional Law</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="experience">Experience (Years)</Label>
                        <Input
                          id="experience"
                          type="number"
                          placeholder="5"
                          value={formData.experience}
                          onChange={(e) => handleInputChange("experience", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="fees">Consultation Fees (₹/hour)</Label>
                      <Input
                        id="fees"
                        type="number"
                        placeholder="2000"
                        value={formData.fees}
                        onChange={(e) => handleInputChange("fees", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="qualifications">Qualifications</Label>
                      <Input
                        id="qualifications"
                        placeholder="LLB, LLM, etc."
                        value={formData.qualifications}
                        onChange={(e) => handleInputChange("qualifications", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="certificates">Upload Certificates</Label>
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
                        <input
                          type="file"
                          accept=".pdf,.jpg,.png,.jpeg"
                          multiple
                          className="hidden"
                          id="certificates-upload"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() =>
                            document.getElementById("certificates-upload")?.click()
                          }
                          className="w-full"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Choose Certificates
                        </Button>
                        <p className="text-sm text-muted-foreground mt-2">
                          Upload your legal certificates (PDF, JPG, PNG)
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="about">About</Label>
                      <Textarea
                        id="about"
                        placeholder="Brief description about your practice and expertise"
                        value={formData.about}
                        onChange={(e) => handleInputChange("about", e.target.value)}
                      />
                    </div>
                  </>
                )}

                {/* Judge Fields */}
                {userType === "judge" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="court-designation">Court Designation</Label>
                      <Select
                        value={formData.specialization}
                        onValueChange={(value) => handleInputChange("specialization", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select court level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="district">District Court</SelectItem>
                          <SelectItem value="sessions">Sessions Court</SelectItem>
                          <SelectItem value="high">High Court</SelectItem>
                          <SelectItem value="supreme">Supreme Court</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="experience">Years on Bench</Label>
                        <Input
                          id="experience"
                          type="number"
                          placeholder="10"
                          value={formData.experience}
                          onChange={(e) => handleInputChange("experience", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="court-location">Court Location</Label>
                        <Input
                          id="court-location"
                          placeholder="e.g., Delhi High Court"
                          value={formData.location}
                          onChange={(e) => handleInputChange("location", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="qualifications">Judicial Qualifications</Label>
                      <Input
                        id="qualifications"
                        placeholder="LLB, LLM, Judicial Service, etc."
                        value={formData.qualifications}
                        onChange={(e) => handleInputChange("qualifications", e.target.value)}
                      />
                    </div>
                  </>
                )}

                <Button variant="hero" className="w-full" onClick={handleSignUp}>
                  Create Account
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
