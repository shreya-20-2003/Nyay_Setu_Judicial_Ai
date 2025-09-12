import { useState } from "react";
import { Upload, Scale, Gavel, AlertTriangle, CheckCircle, FileText, Shield, Award, BarChart3 } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { TricolourChart } from "@/components/TricolourChart";
import { SpeechFeatures } from "@/components/SpeechFeatures";

const BiasDetection = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{
    biasPercentage: number;
    factors: string[];
    recommendation: string;
  } | null>(null);
  const { toast } = useToast();

  // Mock user profile
  const mockUser = {
    name: "Rajesh Kumar",
    email: "rajesh.kumar@email.com",
    role: "citizen",
    casesAnalyzed: 5,
    memberSince: "2024"
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === "application/pdf" || file.type.includes("document"))) {
      setUploadedFile(file);
      toast({
        title: "File uploaded successfully",
        description: `${file.name} is ready for analysis`,
      });
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF or DOC file",
        variant: "destructive",
      });
    }
  };

  const analyzeJudgment = async () => {
    if (!uploadedFile) return;
    
    setIsAnalyzing(true);
    
    // Simulate API call for bias analysis
    setTimeout(() => {
      const mockBiasPercentage = Math.floor(Math.random() * 60) + 20; // 20-80%
      const mockFactors = [
        "Language patterns suggesting gender bias",
        "Sentencing disparity based on social background",
        "Inconsistent application of precedents",
        "Disproportionate consideration of caste factors",
        "Economic status bias in judgment reasoning"
      ];
      
      setAnalysisResult({
        biasPercentage: mockBiasPercentage,
        factors: mockFactors.slice(0, Math.floor(Math.random() * 3) + 2),
        recommendation: mockBiasPercentage > 35 
          ? "This case shows possible bias. You should file a complaint in the High Court or above."
          : "No significant bias detected in this judgment."
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  const getBiasColor = (percentage: number) => {
    if (percentage < 25) return "hsl(var(--success))";
    if (percentage < 50) return "hsl(var(--warning))";
    return "hsl(var(--destructive))";
  };

  const getBiasLevel = (percentage: number) => {
    if (percentage < 25) return { level: "Low", color: "success" };
    if (percentage < 50) return { level: "Moderate", color: "warning" };
    return { level: "High", color: "destructive" };
  };

  return (
    <div className="min-h-screen bg-gradient-tricolor relative overflow-hidden">
      {/* Tricolour Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 via-background/50 to-judicial/20"></div>
      <div className="absolute top-0 w-full h-2 bg-gradient-tricolor"></div>
      <div className="absolute bottom-0 w-full h-2 bg-gradient-tricolor"></div>
      
      {/* Floating tricolour elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-constitutional rounded-full opacity-20 animate-float"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-judicial rounded-full opacity-30 animate-bounce-soft"></div>
      <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-gradient-hero rounded-full animate-pulse-glow opacity-40"></div>
      
      <Header />
      
      <main className="container mx-auto px-4 py-8 mt-16 relative">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* User Profile Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-constitutional/30 shadow-xl bg-gradient-to-br from-background via-constitutional/5 to-judicial/5 backdrop-blur">
              <CardHeader className="text-center bg-gradient-to-r from-constitutional/10 to-judicial/10 rounded-t-lg">
                <div className="w-20 h-20 bg-gradient-to-br from-constitutional to-judicial rounded-full mx-auto flex items-center justify-center mb-4 shadow-lg">
                  <span className="text-2xl font-bold text-white">{mockUser.name.charAt(0)}</span>
                </div>
                <CardTitle className="text-xl">{mockUser.name}</CardTitle>
                <CardDescription>{mockUser.email}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-constitutional/10 to-judicial/10 rounded-lg">
                  <span className="text-muted-foreground">Cases Analyzed</span>
                  <Badge variant="secondary" className="bg-constitutional text-white">{mockUser.casesAnalyzed}</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-judicial/10 to-constitutional/10 rounded-lg">
                  <span className="text-muted-foreground">Member Since</span>
                  <Badge variant="secondary" className="bg-judicial text-white">{mockUser.memberSince}</Badge>
                </div>
                <div className="flex items-center justify-center space-x-2 pt-4 p-3 bg-gradient-to-r from-constitutional/5 via-background to-judicial/5 rounded-lg">
                  <Scale className="h-6 w-6 text-constitutional animate-pulse" />
                  <span className="text-sm font-semibold text-judicial">Justice Seeker</span>
                  <Shield className="h-6 w-6 text-judicial animate-pulse" />
                </div>
                <div className="text-center pt-4">
                  <Badge variant="outline" className="border-constitutional text-constitutional bg-constitutional/10">
                    🇮🇳 Transparency Champion
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Header Section */}
            <div className="text-center space-y-6 p-8 bg-gradient-to-r from-constitutional/10 via-background to-judicial/10 rounded-2xl border border-constitutional/20 shadow-xl">
              <div className="flex items-center justify-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-constitutional to-judicial rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  <Gavel className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-constitutional via-judicial to-constitutional bg-clip-text text-transparent">
                  Judicial Bias Detection
                </h1>
                <div className="w-16 h-16 bg-gradient-to-br from-judicial to-constitutional rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  <Scale className="h-8 w-8 text-white" />
                </div>
              </div>
              <p className="text-xl font-bold text-foreground max-w-3xl mx-auto leading-relaxed">
                Upload case judgments to analyze potential bias and ensure 
                <span className="text-constitutional font-bold"> fair justice </span>
                for every 
                <span className="text-judicial font-bold"> Indian citizen 🇮🇳</span>
              </p>
              <div className="tricolor-separator w-full"></div>
            </div>

            {/* File Upload Section */}
            <Card className="border-constitutional/30 shadow-xl bg-gradient-to-br from-background via-constitutional/5 to-judicial/5 backdrop-blur">
              <CardHeader className="bg-gradient-to-r from-constitutional/10 to-judicial/10 rounded-t-lg">
                <CardTitle className="flex items-center space-x-3 text-xl font-bold">
                  <div className="w-8 h-8 bg-gradient-to-br from-constitutional to-judicial rounded-full flex items-center justify-center">
                    <Upload className="h-5 w-5 text-white" />
                  </div>
                  <span className="bg-gradient-to-r from-constitutional to-judicial bg-clip-text text-transparent font-bold">Upload Case Judgment</span>
                </CardTitle>
                <CardDescription className="text-base font-bold text-foreground">
                  Upload a PDF or DOC file containing the case judgment for comprehensive AI-powered bias analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-2 border-dashed border-constitutional/40 bg-gradient-to-br from-constitutional/5 to-judicial/5 rounded-xl p-12 text-center space-y-6 hover:border-constitutional/60 transition-colors">
                  <div className="w-20 h-20 bg-gradient-to-br from-constitutional to-judicial rounded-full flex items-center justify-center mx-auto shadow-lg animate-pulse">
                    <FileText className="h-10 w-10 text-white" />
                  </div>
                  <div>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <Button 
                      variant="constitutional" 
                      size="lg" 
                      className="cursor-pointer shadow-lg hover:shadow-xl"
                      onClick={() => document.getElementById('file-upload')?.click()}
                    >
                      <Upload className="h-5 w-5 mr-2" />
                      Choose Judgment File
                    </Button>
                  </div>
                  {uploadedFile && (
                    <div className="p-4 bg-gradient-to-r from-constitutional/20 to-judicial/20 rounded-lg">
                      <p className="text-lg font-semibold text-constitutional">
                        📄 Selected: {uploadedFile.name}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">Ready for bias analysis</p>
                    </div>
                  )}
                </div>

                <Button 
                  onClick={analyzeJudgment}
                  disabled={!uploadedFile || isAnalyzing}
                  className="w-full bg-gradient-to-r from-constitutional to-judicial hover:from-constitutional/80 hover:to-judicial/80 text-white shadow-lg hover:shadow-xl"
                  size="lg"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"></div>
                      Analyzing Judgment for Bias...
                    </>
                  ) : (
                    <>
                      <Shield className="h-5 w-5 mr-2" />
                      🔍 Analyze for Judicial Bias
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Analysis Results */}
            {analysisResult && (
              <Card className="border-constitutional/30 shadow-xl bg-gradient-to-br from-background via-constitutional/5 to-judicial/5 backdrop-blur animate-fade-in">
                <CardHeader className="bg-gradient-to-r from-constitutional/10 to-judicial/10 rounded-t-lg">
                  <CardTitle className="flex items-center space-x-3 text-xl">
                    <div className="w-8 h-8 bg-gradient-to-br from-constitutional to-judicial rounded-full flex items-center justify-center">
                      <Scale className="h-5 w-5 text-white" />
                    </div>
                    <span className="bg-gradient-to-r from-constitutional to-judicial bg-clip-text text-transparent">
                      🇮🇳 Judicial Bias Analysis Report
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* Bias Analytics Chart */}
                  <div className="mb-8 p-6 bg-gradient-to-r from-constitutional/5 to-judicial/5 rounded-xl border border-constitutional/20">
                    <div className="flex items-center gap-2 mb-4">
                      <BarChart3 className="h-6 w-6 text-primary" />
                      <h3 className="text-xl font-bold text-foreground">Bias vs Unbiased Judgments Analysis</h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <TricolourChart
                        data={[
                          { name: 'Unbiased', value: 342, category: 'unbiased' },
                          { name: 'Biased', value: 78, category: 'biased' },
                          { name: 'Under Review', value: 23, category: 'pending' }
                        ]}
                        type="bar"
                        title="📊 System-wide Bias Detection"
                      />
                      <TricolourChart
                        data={[
                          { name: 'Fair Judgments', value: 342, category: 'unbiased' },
                          { name: 'Biased Cases', value: 78, category: 'biased' }
                        ]}
                        type="pie"
                        title="⚖️ Justice Fairness Ratio"
                      />
                    </div>
                    <div className="mt-4 p-4 bg-gradient-to-r from-success/10 to-constitutional/10 rounded-lg border border-success/20">
                      <p className="text-sm font-bold text-foreground">
                        💡 <strong>Systemic Analysis:</strong> This case shows systemic bias patterns. 
                        Consider appealing in higher courts for fair justice. Your case deserves unbiased judgment.
                      </p>
                    </div>
                  </div>

                  {/* Bias Percentage */}
                  <div className="space-y-6 p-6 bg-gradient-to-r from-constitutional/10 to-judicial/10 rounded-xl">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-foreground">Bias Detection Score</span>
                      <div className="text-center">
                        <div className="text-4xl font-bold mb-2" style={{ color: getBiasColor(analysisResult.biasPercentage) }}>
                          {analysisResult.biasPercentage}%
                        </div>
                        <Badge 
                          variant="secondary" 
                          className={`${getBiasLevel(analysisResult.biasPercentage).color === 'success' ? 'bg-success text-white' : 
                            getBiasLevel(analysisResult.biasPercentage).color === 'warning' ? 'bg-warning text-white' : 
                            'bg-destructive text-white'}`}
                        >
                          {getBiasLevel(analysisResult.biasPercentage).level} Risk
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <Progress 
                        value={analysisResult.biasPercentage} 
                        className="h-6 bg-gradient-to-r from-constitutional/20 to-judicial/20"
                      />
                      <div className="flex justify-between text-sm font-bold">
                        <span className="text-success">0% - Fair Judgment</span>
                        <span className="text-warning">35% - Threshold</span>
                        <span className="text-destructive">100% - High Bias</span>
                      </div>
                    </div>
                  </div>

                  {/* Bias Factors */}
                  <div className="space-y-4 p-6 bg-gradient-to-r from-constitutional/5 to-judicial/5 rounded-xl border border-constitutional/20">
                    <h3 className="text-xl font-bold text-foreground flex items-center space-x-2">
                      <AlertTriangle className="h-6 w-6 text-warning" />
                      <span>Detected Bias Indicators:</span>
                    </h3>
                    <div className="grid gap-3">
                      {analysisResult.factors.map((factor, index) => (
                        <div key={index} className="flex items-start space-x-3 p-4 bg-gradient-to-r from-warning/10 to-destructive/10 rounded-lg border border-warning/20">
                          <div className="w-8 h-8 bg-gradient-to-br from-warning to-destructive rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-white font-bold text-sm">{index + 1}</span>
                          </div>
                          <span className="text-foreground font-bold">{factor}</span>
                          <SpeechFeatures textToRead={factor} />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommendation Alert */}
                  <Alert className={`${analysisResult.biasPercentage > 35 ? "border-destructive bg-gradient-to-r from-destructive/10 to-warning/10" : "border-success bg-gradient-to-r from-success/10 to-constitutional/10"} p-6`}>
                    <div className="flex items-center space-x-3">
                      {analysisResult.biasPercentage > 35 ? (
                        <div className="w-12 h-12 bg-gradient-to-br from-destructive to-warning rounded-full flex items-center justify-center">
                          <AlertTriangle className="h-6 w-6 text-white" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 bg-gradient-to-br from-success to-constitutional rounded-full flex items-center justify-center">
                          <CheckCircle className="h-6 w-6 text-white" />
                        </div>
                      )}
                      <div className="flex-1">
                        <AlertTitle className="text-xl font-bold">
                          {analysisResult.biasPercentage > 35 ? "⚠️ Judicial Bias Detected" : "✅ Fair Judgment Confirmed"}
                        </AlertTitle>
                        <AlertDescription className="text-lg mt-2 font-bold">
                          {analysisResult.recommendation}
                        </AlertDescription>
                        <div className="mt-3">
                          <SpeechFeatures textToRead={analysisResult.recommendation} />
                        </div>
                      </div>
                    </div>
                  </Alert>

                  {analysisResult.biasPercentage > 35 && (
                    <div className="space-y-4 pt-6">
                      <div className="tricolor-separator w-full"></div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <Button variant="destructive" size="lg" className="bg-gradient-to-r from-destructive to-warning hover:from-destructive/80 hover:to-warning/80 shadow-lg">
                          <Gavel className="h-5 w-5 mr-2" />
                          📝 File High Court Complaint
                        </Button>
                        <Button variant="judicial" size="lg" className="shadow-lg">
                          <Scale className="h-5 w-5 mr-2" />
                          🏛️ Contact Legal Aid
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BiasDetection;