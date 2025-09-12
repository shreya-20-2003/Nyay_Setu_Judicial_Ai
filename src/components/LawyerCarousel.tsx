import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Heart, 
  Bookmark, 
  Star, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar,
  Filter,
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

interface Lawyer {
  id: string;
  name: string;
  specialization: string;
  experience: number;
  fees: number;
  rating: number;
  cases_won: number;
  location: string;
  availability: "available" | "busy" | "unavailable";
  phone: string;
  email: string;
  bio: string;
  qualifications: string[];
  avatar: string;
  isLiked?: boolean;
  isBookmarked?: boolean;
}

interface LawyerCarouselProps {
  lawyers: Lawyer[];
  crimeType: string;
}

export const LawyerCarousel = ({ lawyers: initialLawyers, crimeType }: LawyerCarouselProps) => {
  const [lawyers, setLawyers] = useState<Lawyer[]>(initialLawyers);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    maxFees: [5000],
    availability: "all",
    minRating: [0],
    experience: [0],
    location: "",
  });

  const toggleLike = (lawyerId: string) => {
    setLawyers(prev => prev.map(lawyer => 
      lawyer.id === lawyerId 
        ? { ...lawyer, isLiked: !lawyer.isLiked }
        : lawyer
    ));
  };

  const toggleBookmark = (lawyerId: string) => {
    setLawyers(prev => prev.map(lawyer => 
      lawyer.id === lawyerId 
        ? { ...lawyer, isBookmarked: !lawyer.isBookmarked }
        : lawyer
    ));
  };

  const filteredLawyers = lawyers.filter(lawyer => {
    if (filters.maxFees[0] < lawyer.fees) return false;
    if (filters.availability !== "all" && lawyer.availability !== filters.availability) return false;
    if (filters.minRating[0] > lawyer.rating) return false;
    if (filters.experience[0] > lawyer.experience) return false;
    if (filters.location && !lawyer.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
    return true;
  });

  const nextLawyer = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredLawyers.length);
  };

  const prevLawyer = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredLawyers.length) % filteredLawyers.length);
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "available": return "bg-success text-success-foreground";
      case "busy": return "bg-warning text-warning-foreground";
      case "unavailable": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  if (filteredLawyers.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No lawyers found matching your criteria.</p>
        <Button 
          variant="outline" 
          onClick={() => setFilters({
            maxFees: [5000],
            availability: "all",
            minRating: [0],
            experience: [0],
            location: "",
          })}
          className="mt-4"
        >
          Clear Filters
        </Button>
      </div>
    );
  }

  const currentLawyer = filteredLawyers[currentIndex];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold">Recommended Lawyers</h3>
          <p className="text-muted-foreground">
            Specialized in {crimeType} cases • {filteredLawyers.length} lawyers found
          </p>
        </div>
        
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2"
        >
          <Filter className="w-4 h-4" />
          Filters
        </Button>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <Card className="p-6 space-y-6 bg-muted/30">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold">Filter Lawyers</h4>
            <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label>Maximum Fees (₹/hour)</Label>
              <Slider
                value={filters.maxFees}
                onValueChange={(value) => setFilters(prev => ({ ...prev, maxFees: value }))}
                max={10000}
                min={500}
                step={500}
                className="w-full"
              />
              <p className="text-sm text-muted-foreground">₹{filters.maxFees[0]}</p>
            </div>

            <div className="space-y-2">
              <Label>Availability</Label>
              <Select 
                value={filters.availability} 
                onValueChange={(value) => setFilters(prev => ({ ...prev, availability: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="busy">Busy</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Minimum Rating</Label>
              <Slider
                value={filters.minRating}
                onValueChange={(value) => setFilters(prev => ({ ...prev, minRating: value }))}
                max={5}
                min={0}
                step={0.5}
                className="w-full"
              />
              <p className="text-sm text-muted-foreground">{filters.minRating[0]} stars</p>
            </div>

            <div className="space-y-2">
              <Label>Minimum Experience (years)</Label>
              <Slider
                value={filters.experience}
                onValueChange={(value) => setFilters(prev => ({ ...prev, experience: value }))}
                max={20}
                min={0}
                step={1}
                className="w-full"
              />
              <p className="text-sm text-muted-foreground">{filters.experience[0]} years</p>
            </div>

            <div className="space-y-2">
              <Label>Location</Label>
              <Input
                placeholder="Search by city"
                value={filters.location}
                onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
              />
            </div>
          </div>
        </Card>
      )}

      {/* Lawyer Card */}
      <div className="relative">
        <Card className="overflow-hidden shadow-card hover:shadow-lg transition-all duration-300">
          <div className="absolute top-4 right-4 flex gap-2 z-10">
            <Button
              variant="ghost"
              size="icon"
              className={`bg-white/90 backdrop-blur-sm hover:bg-white ${
                currentLawyer.isBookmarked ? "text-warning" : "text-muted-foreground"
              }`}
              onClick={() => toggleBookmark(currentLawyer.id)}
            >
              <Bookmark className={`w-4 h-4 ${currentLawyer.isBookmarked ? "fill-current" : ""}`} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`bg-white/90 backdrop-blur-sm hover:bg-white ${
                currentLawyer.isLiked ? "text-red-500" : "text-muted-foreground"
              }`}
              onClick={() => toggleLike(currentLawyer.id)}
            >
              <Heart className={`w-4 h-4 ${currentLawyer.isLiked ? "fill-current" : ""}`} />
            </Button>
          </div>

          <CardHeader className="pb-4">
            <div className="flex items-start gap-4">
              <Avatar className="w-16 h-16 ring-2 ring-primary/20">
                <AvatarImage src={currentLawyer.avatar} alt={currentLawyer.name} />
                <AvatarFallback>{currentLawyer.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{currentLawyer.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {currentLawyer.location}
                    </CardDescription>
                  </div>
                  
                  <Badge className={getAvailabilityColor(currentLawyer.availability)}>
                    {currentLawyer.availability}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{currentLawyer.rating}</span>
                  </div>
                  <span>•</span>
                  <span>{currentLawyer.experience} years exp.</span>
                  <span>•</span>
                  <span>{currentLawyer.cases_won} cases won</span>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="text-sm">
                {currentLawyer.specialization}
              </Badge>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">₹{currentLawyer.fees.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">per hour</p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              {currentLawyer.bio}
            </p>

            <div className="space-y-2">
              <p className="text-sm font-medium">Qualifications:</p>
              <div className="flex flex-wrap gap-1">
                {currentLawyer.qualifications.map((qual, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {qual}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button variant="outline" className="flex-1 gap-2">
                <Phone className="w-4 h-4" />
                Call
              </Button>
              <Button variant="outline" className="flex-1 gap-2">
                <Mail className="w-4 h-4" />
                Email
              </Button>
              <Button variant="hero" className="flex-1 gap-2">
                <Calendar className="w-4 h-4" />
                Book Consultation
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Arrows */}
        {filteredLawyers.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm shadow-md hover:bg-white"
              onClick={prevLawyer}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm shadow-md hover:bg-white"
              onClick={nextLawyer}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </>
        )}
      </div>

      {/* Pagination Dots */}
      {filteredLawyers.length > 1 && (
        <div className="flex justify-center gap-2">
          {filteredLawyers.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? "bg-primary" : "bg-muted"
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};