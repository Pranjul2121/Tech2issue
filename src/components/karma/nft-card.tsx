import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Clock, MapPin, Medal, ThumbsUp, User, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";

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
  onDelete?: (id: string) => void;
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
  owner,
  onDelete
}: NFTProps) {
  const handleDelete = () => {
    if (onDelete) {
      onDelete(id);
      toast({
        title: "Deed deleted",
        description: "Your deed has been successfully deleted.",
      });
    }
  };

  // Function to check if image URL is valid
  const isValidImage = (url: string) => {
    return url && (
      url.startsWith('http') || 
      url.startsWith('https') || 
      url.startsWith('data:image')
    );
  };

  // Use a fallback image if the provided URL is invalid
  const imageSource = isValidImage(imageUrl) 
    ? imageUrl 
    : "https://images.unsplash.com/photo-1611329532992-0b7b3100daa7?auto=format&fit=crop&q=80";

  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <img 
          src={imageSource} 
          alt={title}
          className="w-full h-48 object-cover"
          onError={(e) => {
            // Set a fallback image if the image fails to load
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1611329532992-0b7b3100daa7?auto=format&fit=crop&q=80";
          }}
        />
        <div className="absolute top-2 right-2 flex gap-2">
          {onDelete && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm" className="h-7 w-7 p-0">
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your deed.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
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
