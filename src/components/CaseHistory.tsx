import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Gavel, Calendar, FileText, TrendingUp, TrendingDown, ArrowRight } from "lucide-react";

interface CaseData {
  id: string;
  title: string;
  year: number;
  court: string;
  outcome: "won" | "lost" | "settled";
  description: string;
  penalty?: string;
  precedent: boolean;
  relevanceScore: number;
}

interface CaseHistoryProps {
  crimeType: string;
  cases: CaseData[];
}

export const CaseHistory = ({ crimeType, cases }: CaseHistoryProps) => {
  const getOutcomeColor = (outcome: string) => {
    switch (outcome) {
      case "won": return "bg-success text-success-foreground";
      case "lost": return "bg-destructive text-destructive-foreground";
      case "settled": return "bg-warning text-warning-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getOutcomeIcon = (outcome: string) => {
    switch (outcome) {
      case "won": return <TrendingUp className="w-4 h-4" />;
      case "lost": return <TrendingDown className="w-4 h-4" />;
      case "settled": return <FileText className="w-4 h-4" />;
      default: return <Gavel className="w-4 h-4" />;
    }
  };

  // Calculate statistics
  const totalCases = cases.length;
  const wonCases = cases.filter(c => c.outcome === "won").length;
  const lostCases = cases.filter(c => c.outcome === "lost").length;
  const settledCases = cases.filter(c => c.outcome === "settled").length;
  const winRate = totalCases > 0 ? Math.round((wonCases / totalCases) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Header with Statistics */}
      <div className="space-y-4">
        <div>
          <h3 className="text-2xl font-bold">Related Case History</h3>
          <p className="text-muted-foreground">
            Previous cases similar to {crimeType} • {totalCases} cases found
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-primary">{totalCases}</div>
            <div className="text-sm text-muted-foreground">Total Cases</div>
          </Card>
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-success">{winRate}%</div>
            <div className="text-sm text-muted-foreground">Success Rate</div>
          </Card>
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-warning">{settledCases}</div>
            <div className="text-sm text-muted-foreground">Settled</div>
          </Card>
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-destructive">{lostCases}</div>
            <div className="text-sm text-muted-foreground">Lost Cases</div>
          </Card>
        </div>
      </div>

      {/* Case List */}
      <div className="space-y-4">
        {cases.map((caseData, index) => (
          <Card key={caseData.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg leading-tight">
                    {caseData.title}
                  </CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span>{caseData.year}</span>
                    <span>•</span>
                    <span>{caseData.court}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {caseData.precedent && (
                    <Badge variant="secondary" className="text-xs">
                      Precedent
                    </Badge>
                  )}
                  <Badge className={`${getOutcomeColor(caseData.outcome)} flex items-center gap-1`}>
                    {getOutcomeIcon(caseData.outcome)}
                    {caseData.outcome.charAt(0).toUpperCase() + caseData.outcome.slice(1)}
                  </Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-0 space-y-3">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {caseData.description}
              </p>
              
              {caseData.penalty && (
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm">
                    <span className="font-medium">Penalty/Outcome: </span>
                    {caseData.penalty}
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>Relevance: {caseData.relevanceScore}%</span>
                  </div>
                </div>
                
                <Button variant="ghost" size="sm" className="text-xs gap-1">
                  View Full Case
                  <ArrowRight className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>

            {index < cases.length - 1 && <Separator className="mt-4" />}
          </Card>
        ))}
      </div>

      {/* Legal Disclaimer */}
      <Card className="bg-warning/10 border-warning/20">
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <Gavel className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
            <div className="space-y-2">
              <p className="font-medium text-sm">Legal Disclaimer</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                The cases shown are for reference only and do not guarantee similar outcomes. 
                Every legal case is unique and depends on specific circumstances, evidence, and applicable laws. 
                Please consult with a qualified lawyer for advice specific to your situation.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};