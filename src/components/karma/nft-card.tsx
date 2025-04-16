
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Clock, MapPin, Medal, ThumbsUp, User } from "lucide-react";

export interface NFTProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  karmaPoints: number;
  createdAt: string;
  location?: string;
  status: "pending" | "validated" | "rejected";
  votes?: number;
  owner?: string;
}

export function NFTCard({
  id,
  title,
  description,
  imageUrl,
  karmaPoints,
  createdAt,
  location,
  status,
  votes = 0,
  owner
}: NFTProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2">
          <Badge 
            variant={status === "validated" ? "default" : status === "pending" ? "outline" : "destructive"}
            className={status === "validated" ? "bg-karma-purple-DEFAULT text-white" : ""}
          >
            {status === "validated" ? "Validated" : status === "pending" ? "Pending" : "Rejected"}
          </Badge>
        </div>
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg">{title}</h3>
          <Badge variant="secondary" className="flex items-center bg-karma-gold-DEFAULT text-black">
            <Medal className="w-3 h-3 mr-1" />
            {karmaPoints} Points
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="text-sm">
        <p className="text-muted-foreground line-clamp-2 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
          <div className="flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            <span>{createdAt}</span>
          </div>
          {location && (
            <div className="flex items-center">
              <MapPin className="w-3 h-3 mr-1" />
              <span>{location}</span>
            </div>
          )}
          {votes > 0 && (
            <div className="flex items-center">
              <ThumbsUp className="w-3 h-3 mr-1" />
              <span>{votes} Votes</span>
            </div>
          )}
          {owner && (
            <div className="flex items-center">
              <User className="w-3 h-3 mr-1" />
              <span className="truncate max-w-32">{owner}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <div className="w-full h-1 bg-gradient-to-r from-karma-purple to-karma-gold" />
      </CardFooter>
    </Card>
  );
}
