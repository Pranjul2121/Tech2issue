
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Award, Medal, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface KarmaScoreCardProps {
  score: number;
  nftCount: number;
  ranking?: number;
  lastAction?: string;
  username?: string;
}

export function KarmaScoreCard({
  score,
  nftCount,
  ranking = 0,
  lastAction,
  username = "Anonymous",
}: KarmaScoreCardProps) {
  // Calculate the progress level (0-100)
  const progressLevel = Math.min(score / 10, 100);
  
  // Determine the karma level based on score
  const karmaLevel = score < 30 ? "Beginner" : 
                    score < 70 ? "Rising" : 
                    score < 150 ? "Established" : 
                    score < 300 ? "Advanced" : "Enlightened";

  return (
    <Card className="overflow-hidden border-2 border-karma-purple/20">
      <div className="bg-gradient-to-r from-karma-purple to-karma-purple-light p-1" />
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold">{username}'s Karma</CardTitle>
          {ranking > 0 && (
            <Badge variant="secondary" className="flex items-center bg-karma-gold-DEFAULT text-black">
              <Medal className="w-3 h-3 mr-1" />
              Rank #{ranking}
            </Badge>
          )}
        </div>
        <CardDescription>Building reputation through good deeds</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Award className="w-8 h-8 mr-2 text-karma-purple" />
            <div>
              <p className="text-3xl font-bold">{score}</p>
              <p className="text-xs text-muted-foreground">Karma Points</p>
            </div>
          </div>
          <div>
            <Badge variant="outline" className="flex items-center">
              <Star className="w-3 h-3 mr-1 text-karma-gold" />
              {karmaLevel}
            </Badge>
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span>Progress to Next Level</span>
            <span className="font-semibold">{progressLevel.toFixed(0)}%</span>
          </div>
          <Progress value={progressLevel} className="h-2" />
        </div>
        
        <div className="mt-4 flex justify-between text-sm">
          <div>
            <p className="font-semibold">{nftCount}</p>
            <p className="text-xs text-muted-foreground">Soulbound NFTs</p>
          </div>
          {lastAction && (
            <div className="text-right">
              <p className="font-semibold">Last Action</p>
              <p className="text-xs text-muted-foreground">{lastAction}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
