import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  image: string;
  icon: ReactNode;
  buttonText: string;
  buttonVariant?: "hero" | "justice" | "judicial" | "constitutional" | "bias";
  badges?: string[];
  onClick: () => void;
  className?: string;
}

export const FeatureCard = ({
  title,
  description,
  image,
  icon,
  buttonText,
  buttonVariant = "hero",
  badges = [],
  onClick,
  className,
}: FeatureCardProps) => {
  return (
    <Card className={`group relative overflow-hidden bg-card hover:shadow-justice transition-all duration-500 transform hover:-translate-y-2 ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-judicial/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute top-4 left-4 p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-md">
          {icon}
        </div>
      </div>

      <CardHeader className="relative">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors duration-300">
              {title}
            </CardTitle>
            {badges.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {badges.map((badge, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {badge}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
        <CardDescription className="text-muted-foreground leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="relative">
        <Button
          variant={buttonVariant}
          onClick={onClick}
          className="w-full group/btn"
          size="lg"
        >
          {buttonText}
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
        </Button>
      </CardContent>
    </Card>
  );
};