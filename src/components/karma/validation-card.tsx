
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { NFTProps } from "@/components/karma/nft-card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, HelpCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";

interface ValidationCardProps {
  deed: NFTProps;
  onValidate: (id: string, isValid: boolean) => void;
  userVoted?: boolean;
}

export function ValidationCard({ deed, onValidate, userVoted = false }: ValidationCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [hasVoted, setHasVoted] = useState(userVoted);
  const [vote, setVote] = useState<'yes' | 'no' | null>(null);

  const handleVote = async (isValid: boolean) => {
    if (hasVoted) return;
    
    setIsLoading(true);
    setVote(isValid ? 'yes' : 'no');
    
    try {
      // Update deed status in localStorage if it exists there
      const storedNFTs = localStorage.getItem('userNFTs');
      if (storedNFTs) {
        const nfts = JSON.parse(storedNFTs);
        const updatedNFTs = nfts.map((nft: NFTProps) => {
          if (nft.id === deed.id) {
            return {
              ...nft,
              status: isValid ? "validated" as const : "rejected" as const,
              votes: (nft.votes || 0) + 1
            };
          }
          return nft;
        });
        localStorage.setItem('userNFTs', JSON.stringify(updatedNFTs));
      }
      
      // Call the provided onValidate callback
      onValidate(deed.id, isValid);
      setHasVoted(true);
      
      toast({
        title: "Vote recorded",
        description: `You've ${isValid ? 'validated' : 'rejected'} this deed.`
      });
    } catch (error) {
      console.error("Error updating deed status:", error);
      toast({
        title: "Error recording vote",
        description: "There was an error processing your vote.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Simulated validation progress (in a real app, this would come from the blockchain)
  const yesVotes = deed.votes || 0;
  const noVotes = Math.floor(yesVotes * 0.3); // Just for simulation
  const totalVotes = yesVotes + noVotes;
  const yesPercentage = totalVotes > 0 ? (yesVotes / totalVotes) * 100 : 0;
  
  return (
    <Card>
      <div className="relative">
        <img 
          src={deed.imageUrl} 
          alt={deed.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2">
          <Badge variant="outline">Needs Validation</Badge>
        </div>
      </div>
      <CardHeader className="pb-2">
        <h3 className="font-semibold text-lg">{deed.title}</h3>
        <p className="text-sm text-muted-foreground">{deed.description}</p>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex justify-between text-xs text-muted-foreground mb-1">
          <span>Validation Progress</span>
          <span>{yesVotes} Yes / {noVotes} No</span>
        </div>
        <div className="flex">
          <div className="w-full bg-muted rounded-full h-2.5">
            <div 
              className="bg-karma-purple h-2.5 rounded-full" 
              style={{ width: `${yesPercentage}%` }}
            ></div>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
          <div className="flex items-center">
            <span>Submitted: {deed.createdAt}</span>
          </div>
          {deed.location && (
            <div className="flex items-center">
              <span>Location: {deed.location}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between gap-4">
        {hasVoted ? (
          <div className="w-full">
            <Badge 
              variant={vote === 'yes' ? "default" : "destructive"} 
              className={`w-full flex justify-center py-1 ${vote === 'yes' ? "bg-karma-purple-DEFAULT text-white" : ""}`}
            >
              {vote === 'yes' ? (
                <span className="flex items-center">
                  <CheckCircle2 className="mr-1 h-4 w-4" />
                  You voted: Valid
                </span>
              ) : (
                <span className="flex items-center">
                  <XCircle className="mr-1 h-4 w-4" />
                  You voted: Invalid
                </span>
              )}
            </Badge>
          </div>
        ) : (
          <>
            <Button
              onClick={() => handleVote(true)}
              disabled={isLoading}
              variant="outline"
              className="flex-1 border-green-500 hover:bg-green-500/10"
            >
              <CheckCircle2 className="mr-1 h-4 w-4 text-green-500" />
              Valid
            </Button>
            <Button
              onClick={() => handleVote(false)}
              disabled={isLoading}
              variant="outline"
              className="flex-1 border-red-500 hover:bg-red-500/10"
            >
              <XCircle className="mr-1 h-4 w-4 text-red-500" />
              Invalid
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
