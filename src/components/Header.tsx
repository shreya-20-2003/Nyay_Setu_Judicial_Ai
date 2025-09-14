import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Moon,
  Sun,
  Globe,
  Scale,
  User,
  Settings,
  LogOut,
  Menu,
  Accessibility,
  Type,
  Eye,
  UserCheck,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const languages = [
  { code: "en", name: "English", native: "English" },
  { code: "hi", name: "Hindi", native: "हिंदी" },
  { code: "bn", name: "Bengali", native: "বাংলা" },
  { code: "te", name: "Telugu", native: "తెలుగు" },
  { code: "mr", name: "Marathi", native: "मराठी" },
  { code: "ta", name: "Tamil", native: "தமிழ்" },
  { code: "gu", name: "Gujarati", native: "ગુજરાતી" },
  { code: "kn", name: "Kannada", native: "ಕನ್ನಡ" },
  { code: "ml", name: "Malayalam", native: "മലയാളം" },
  { code: "pa", name: "Punjabi", native: "ਪੰਜਾਬੀ" },
  { code: "or", name: "Odia", native: "ଓଡ଼ିଆ" },
  { code: "as", name: "Assamese", native: "অসমীয়া" },
];

export const Header = () => {
  const [isDark, setIsDark] = useState(false);
  const [currentLang, setCurrentLang] = useState(languages[0]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [dyslexiaFont, setDyslexiaFont] = useState(false);

  // sign-in/sign-up dialog state
  const [authOpen, setAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState<"signin" | "signup">("signin");
  const [formData, setFormData] = useState({ email: "", password: "", name: "" });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSignIn = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data.user || data);
        setIsLoggedIn(true);
        setAuthOpen(false);
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
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data.user || data);
        setIsLoggedIn(true);
        setAuthOpen(false);
      } else {
        alert(data.error || "Registration failed");
      }
    } catch (err) {
      alert("Network error");
    }
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
    document.body.classList.toggle("high-contrast");
  };

  const toggleDyslexiaFont = () => {
    setDyslexiaFont(!dyslexiaFont);
    document.body.classList.toggle("dyslexia-friendly");
  };

  const navigationItems = [
    { href: "/", label: "Home" },
    { href: "/nyaya-ai", label: "Nyaya AI" },
    { href: "/bias-detection", label: "Bias Detection" },
    { href: "/lawyer-marketplace", label: "Find Lawyers" },
    { href: "#footer", label: "About" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="tricolor-separator" />
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-hero rounded-xl shadow-justice animate-pulse-glow">
            <Scale className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-shimmer">NyaySetu</h1>
            <p className="text-xs text-muted-foreground font-medium">
              न्यायसेतु - न्याय सबके लिए
            </p>
          </div>
        </div>

        {/* Nav */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navigationItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium hover:text-primary transition-all duration-300 hover:scale-105 relative group"
              onClick={(e) => {
                if (item.href === "#footer") {
                  e.preventDefault();
                  document
                    .getElementById("footer")
                    ?.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-justice transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* Right */}
        <div className="flex items-center space-x-2">
          {/* Theme toggle */}
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>

          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10 ring-2 ring-gradient-justice">
                    <AvatarImage src="/api/placeholder/40/40" alt="Profile" />
                    <AvatarFallback className="bg-gradient-hero text-white font-bold">
                      {user?.name?.[0]?.toUpperCase() ?? "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    setIsLoggedIn(false);
                    setUser(null);
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setAuthTab("signin");
                  setAuthOpen(true);
                }}
              >
                Sign In
              </Button>
              <Button
                variant="hero"
                size="sm"
                className="btn-glow"
                onClick={() => {
                  setAuthTab("signup");
                  setAuthOpen(true);
                }}
              >
                Sign Up
              </Button>
            </div>
          )}

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader>
                <SheetTitle>Navigation Menu</SheetTitle>
              </SheetHeader>
              <div className="mt-8 space-y-4">
                {navigationItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-3 text-lg font-medium hover:bg-gradient-hover rounded-lg transition-all duration-300"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Auth dialog inline */}
      <Dialog open={authOpen} onOpenChange={setAuthOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Welcome to NyaySetu</DialogTitle>
            <DialogDescription>
              Access constitutional guidance and legal assistance
            </DialogDescription>
          </DialogHeader>
          <Tabs value={authTab} onValueChange={(v) => setAuthTab(v as any)}>
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="signin">
                <User className="w-4 h-4 mr-2" /> Sign In
              </TabsTrigger>
              <TabsTrigger value="signup">
                <UserCheck className="w-4 h-4 mr-2" /> Sign Up
              </TabsTrigger>
            </TabsList>

            {/* Sign In */}
            <TabsContent value="signin" className="space-y-3 mt-4">
              <Label>Email</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
              <Label>Password</Label>
              <Input
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
              />
              <Button className="w-full mt-3" onClick={handleSignIn}>
                Sign In
              </Button>
            </TabsContent>

            {/* Sign Up */}
            <TabsContent value="signup" className="space-y-3 mt-4">
              <Label>Name</Label>
              <Input
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
              <Label>Email</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
              <Label>Password</Label>
              <Input
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
              />
              <Button className="w-full mt-3" onClick={handleSignUp}>
                Sign Up
              </Button>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </header>
  );
};
