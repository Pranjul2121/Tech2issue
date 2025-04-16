
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { DeedForm } from "@/components/karma/deed-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const SubmitDeedPage = () => {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (data: {
    title: string;
    description: string;
    image: File | null;
    location: string;
  }) => {
    try {
      // In a real app, this would send the data to an API or smart contract
      console.log("Submitting deed:", data);
      
      // For demo purposes, we'll just simulate a successful submission
      setIsSubmitted(true);
      
      // Reset any previous errors
      setError(null);
    } catch (err) {
      setError("There was an error submitting your deed. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Submit a Good Deed</h1>
          <p className="text-muted-foreground">
            Share the details of your good deed to earn karma points after community validation.
          </p>
        </div>
        
        {isSubmitted ? (
          <div className="max-w-2xl mx-auto">
            <Alert className="mb-6 bg-green-50 border-green-200">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <AlertTitle className="text-green-800">Success!</AlertTitle>
              <AlertDescription className="text-green-700">
                Your good deed has been submitted and is pending validation. 
                You'll receive notifications when your submission is reviewed.
              </AlertDescription>
            </Alert>
            
            <div className="flex justify-center gap-4 mt-8">
              <Button onClick={() => setIsSubmitted(false)}>
                Submit Another Deed
              </Button>
              <Button variant="outline" onClick={() => navigate("/profile")}>
                Go to My Profile
              </Button>
            </div>
          </div>
        ) : (
          <>
            {error && (
              <Alert className="mb-6 bg-red-50 border-red-200">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <AlertTitle className="text-red-800">Error</AlertTitle>
                <AlertDescription className="text-red-700">{error}</AlertDescription>
              </Alert>
            )}
            
            <DeedForm onSubmit={handleSubmit} />
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default SubmitDeedPage;
