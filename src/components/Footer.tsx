import { Scale, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <footer id="footer" className="bg-gradient-to-br from-primary via-primary/95 to-judicial text-primary-foreground relative overflow-hidden">
      {/* Tricolor separator */}
      <div className="tricolor-separator" />
      
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-14 h-14 bg-gradient-justice rounded-xl shadow-glow">
                <Scale className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-shimmer">NyaySetu</h2>
                <p className="text-sm opacity-90 font-medium">न्यायसेतु - न्याय सबके लिए</p>
              </div>
            </div>
            <p className="text-base opacity-95 leading-relaxed">
              Democratizing justice through AI-powered legal assistance. Making constitutional rights accessible to every Indian citizen with transparency, fairness, and dignity.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-secondary/20 hover:text-secondary transition-all duration-300 hover:scale-110">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-secondary/20 hover:text-secondary transition-all duration-300 hover:scale-110">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-secondary/20 hover:text-secondary transition-all duration-300 hover:scale-110">
                <Linkedin className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-secondary/20 hover:text-secondary transition-all duration-300 hover:scale-110">
                <Youtube className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-justice rounded-full"></div>
              Core Services
            </h3>
            <ul className="space-y-3 text-base">
              <li><a href="/nyaya-ai" className="hover:text-secondary transition-all duration-300 hover:translate-x-1 block">🤖 Nyaya AI Assistant</a></li>
              <li><a href="/bias-detection" className="hover:text-secondary transition-all duration-300 hover:translate-x-1 block">⚖️ Bias Detection</a></li>
              <li><a href="/lawyers" className="hover:text-secondary transition-all duration-300 hover:translate-x-1 block">👨‍💼 Lawyer Marketplace</a></li>
              <li><a href="#legal-docs" className="hover:text-secondary transition-all duration-300 hover:translate-x-1 block">📄 Document Analysis</a></li>
              <li><a href="#case-law" className="hover:text-secondary transition-all duration-300 hover:translate-x-1 block">📚 Case Law Research</a></li>
            </ul>
          </div>

          {/* Legal Resources */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-justice rounded-full"></div>
              Legal Resources
            </h3>
            <ul className="space-y-3 text-base">
              <li><a href="#constitution" className="hover:text-secondary transition-all duration-300 hover:translate-x-1 block">📜 Constitution of India</a></li>
              <li><a href="#rights" className="hover:text-secondary transition-all duration-300 hover:translate-x-1 block">⚡ Fundamental Rights</a></li>
              <li><a href="#procedures" className="hover:text-secondary transition-all duration-300 hover:translate-x-1 block">📋 Legal Procedures</a></li>
              <li><a href="#faq" className="hover:text-secondary transition-all duration-300 hover:translate-x-1 block">❓ FAQ</a></li>
              <li><a href="#guides" className="hover:text-secondary transition-all duration-300 hover:translate-x-1 block">📖 Legal Guides</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-justice rounded-full"></div>
              Contact Us
            </h3>
            <div className="space-y-4 text-base">
              <div className="flex items-center space-x-3 hover:text-secondary transition-colors cursor-pointer">
                <div className="w-8 h-8 bg-secondary/20 rounded-lg flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <span>support@nyaysetu.in</span>
              </div>
              <div className="flex items-center space-x-3 hover:text-secondary transition-colors cursor-pointer">
                <div className="w-8 h-8 bg-secondary/20 rounded-lg flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <span>+91-11-1234-5678</span>
              </div>
              <div className="flex items-center space-x-3 hover:text-secondary transition-colors cursor-pointer">
                <div className="w-8 h-8 bg-secondary/20 rounded-lg flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <span>New Delhi, India</span>
              </div>
            </div>
            <div className="bg-secondary/10 p-4 rounded-lg border border-secondary/20">
              <p className="text-sm font-medium text-secondary">🚨 Emergency Legal Help</p>
              <p className="text-xs opacity-90 mt-1">Available 24/7 for urgent constitutional matters</p>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-primary-foreground/20 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="text-center lg:text-left">
              <p className="text-base font-medium">&copy; 2024 NyaySetu. All rights reserved.</p>
              <p className="text-sm opacity-90 mt-1">🇮🇳 Built with love for India | Powered by Constitutional Values</p>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <a href="#privacy" className="hover:text-secondary transition-all duration-300 hover:scale-105">Privacy Policy</a>
              <a href="#terms" className="hover:text-secondary transition-all duration-300 hover:scale-105">Terms of Service</a>
              <a href="#accessibility" className="hover:text-secondary transition-all duration-300 hover:scale-105">Accessibility</a>
              <a href="#security" className="hover:text-secondary transition-all duration-300 hover:scale-105">Security</a>
              <a href="#careers" className="hover:text-secondary transition-all duration-300 hover:scale-105">Careers</a>
            </div>
          </div>
          
          {/* Final tricolor accent */}
          <div className="mt-8 mb-4">
            <div className="tricolor-separator opacity-60"></div>
          </div>
        </div>
      </div>
    </footer>
  );
};