
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { NFTProps } from "@/components/karma/nft-card";
import { ChevronLeft, Medal, MapPin, Calendar, User, ExternalLink, ThumbsUp, Clock, Shield } from "lucide-react";

// Sample data for demo purposes
const nftData: { [key: string]: NFTProps } = {
  "1": {
    id: "1",
    title: "Community Beach Cleanup",
    description: "Organized a team of volunteers to remove 50+ pounds of trash from local beaches. We collected plastic, glass, and other waste that could harm marine life. The event brought together 15 people from the community and raised awareness about ocean pollution.",
    imageUrl: "https://images.unsplash.com/photo-1618477461853-cf6ed80fafb7?auto=format&fit=crop&q=80",
    karmaPoints: 25,
    createdAt: "April 12, 2025",
    location: "San Francisco, CA",
    status: "validated" as const,
    votes: 42,
    owner: "0x1234...5678"
  },
  "2": {
    id: "2",
    title: "Food Bank Volunteer",
    description: "Spent 8 hours packaging meals for families in need at the local food bank. We packaged over 200 meal kits that would feed approximately 50 families for a week. The food bank serves the most vulnerable members of our community, including elderly residents on fixed incomes and families experiencing financial hardship.",
    imageUrl: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80",
    karmaPoints: 20,
    createdAt: "April 5, 2025",
    location: "Austin, TX",
    status: "validated" as const,
    votes: 38,
    owner: "0x8765...4321"
  },
  "3": {
    id: "3",
    title: "Tree Planting Initiative",
    description: "Planted 15 trees in a community park as part of a local environmental restoration project. The trees were native species chosen to support local wildlife and improve air quality in the urban environment. This project was done in collaboration with the city's parks department and a local environmental nonprofit.",
    imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80",
    karmaPoints: 30,
    createdAt: "March 27, 2025",
    location: "Portland, OR",
    status: "validated" as const,
    votes: 56,
    owner: "0x2468...1357"
  }
};

const NFTDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  
  // Get the NFT data for this ID (in a real app, this would fetch from an API/blockchain)
  const nft = id && nftData[id];
  
  if (!nft) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 container max-w-5xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">NFT Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The NFT you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/">Return Home</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container max-w-5xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/profile" className="flex items-center">
              <ChevronLeft className="h-4 w-4 mr-1" /> Back to Profile
            </Link>
          </Button>
          
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">{nft.title}</h1>
            <Badge 
              variant="default" 
              className="bg-karma-purple-DEFAULT text-white"
            >
              Soulbound NFT
            </Badge>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - NFT Image */}
          <div className="md:col-span-2">
            <div className="rounded-lg overflow-hidden border shadow-sm">
              <img 
                src={nft.imageUrl} 
                alt={nft.title}
                className="w-full h-auto aspect-video object-cover"
              />
            </div>
            
            <div className="mt-6 bg-white rounded-lg border p-6">
              <h2 className="text-xl font-semibold mb-3">Description</h2>
              <p className="text-gray-700 whitespace-pre-line">
                {nft.description}
              </p>
              
              <Separator className="my-6" />
              
              <h2 className="text-xl font-semibold mb-3">Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-muted-foreground mr-3" />
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-medium">{nft.createdAt}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-muted-foreground mr-3" />
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">{nft.location}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <ThumbsUp className="h-5 w-5 text-muted-foreground mr-3" />
                  <div>
                    <p className="text-sm text-muted-foreground">Validation</p>
                    <p className="font-medium">{nft.votes} community votes</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-muted-foreground mr-3" />
                  <div>
                    <p className="text-sm text-muted-foreground">Validation Date</p>
                    <p className="font-medium">April 14, 2025</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - NFT Metadata */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg border p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Karma Value</h2>
                <Badge 
                  variant="secondary" 
                  className="flex items-center bg-karma-gold-DEFAULT text-black"
                >
                  <Medal className="w-3.5 h-3.5 mr-1.5" />
                  {nft.karmaPoints} Points
                </Badge>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-2 flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  Owner
                </h3>
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-karma-purple-light/20 flex items-center justify-center mr-2">
                    <User className="h-4 w-4 text-karma-purple" />
                  </div>
                  <span className="text-sm">
                    {nft.owner}
                  </span>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-2 flex items-center">
                  <Shield className="h-4 w-4 mr-2" />
                  NFT Properties
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-karma-background-light rounded p-2 text-center">
                    <p className="text-xs text-muted-foreground">Type</p>
                    <p className="text-sm font-medium">Soulbound</p>
                  </div>
                  <div className="bg-karma-background-light rounded p-2 text-center">
                    <p className="text-xs text-muted-foreground">Category</p>
                    <p className="text-sm font-medium">Environment</p>
                  </div>
                  <div className="bg-karma-background-light rounded p-2 text-center">
                    <p className="text-xs text-muted-foreground">Rarity</p>
                    <p className="text-sm font-medium">Uncommon</p>
                  </div>
                  <div className="bg-karma-background-light rounded p-2 text-center">
                    <p className="text-xs text-muted-foreground">Impact</p>
                    <p className="text-sm font-medium">Medium</p>
                  </div>
                </div>
              </div>
              
              <Button className="w-full" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View on Blockchain
                </a>
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NFTDetailPage;
