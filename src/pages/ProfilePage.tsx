
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { KarmaScoreCard } from "@/components/karma/karma-score-card";
import { NFTCard } from "@/components/karma/nft-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Copy, ExternalLink, Award } from "lucide-react";

// Sample data for demo purposes
const userNFTs = [
  {
    id: "1",
    title: "Community Beach Cleanup",
    description: "Organized a team of volunteers to remove 50+ pounds of trash from local beaches.",
    imageUrl: "https://images.unsplash.com/photo-1618477461853-cf6ed80fafb7?auto=format&fit=crop&q=80",
    karmaPoints: 25,
    createdAt: "2 days ago",
    location: "San Francisco, CA",
    status: "validated" as const,
    votes: 42,
  },
  {
    id: "2",
    title: "Food Bank Volunteer",
    description: "Spent 8 hours packaging meals for families in need at the local food bank.",
    imageUrl: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80",
    karmaPoints: 20,
    createdAt: "1 week ago",
    location: "Austin, TX",
    status: "validated" as const,
    votes: 38,
  },
  {
    id: "3",
    title: "Tree Planting Initiative",
    description: "Planted 15 trees in a community park as part of a local environmental restoration project.",
    imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80",
    karmaPoints: 30,
    createdAt: "2 weeks ago",
    location: "Portland, OR",
    status: "validated" as const,
    votes: 56,
  },
  {
    id: "4",
    title: "Senior Center Visit",
    description: "Spent an afternoon visiting with seniors at a local retirement home.",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80",
    karmaPoints: 15,
    createdAt: "3 weeks ago",
    location: "Chicago, IL",
    status: "pending" as const,
    votes: 12,
  },
];

const ProfilePage = () => {
  // Wallet address would come from a connected wallet in a real app
  const walletAddress = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";
  const shortenedAddress = `${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}`;

  // Calculate total karma points
  const totalKarmaPoints = userNFTs.reduce(
    (total, nft) => total + (nft.status === "validated" ? nft.karmaPoints : 0),
    0
  );
  
  // Count validated NFTs
  const validatedNFTCount = userNFTs.filter(nft => nft.status === "validated").length;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Sidebar - Profile */}
          <div className="md:col-span-1">
            <div className="sticky top-20 space-y-6">
              <div className="flex flex-col items-center text-center">
                {/* User Avatar */}
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-karma-purple to-karma-purple-light flex items-center justify-center text-white text-3xl font-bold mb-4">
                  <Award className="h-12 w-12" />
                </div>
                
                <h2 className="text-xl font-bold mb-1">KarmaUser</h2>
                
                <div className="flex items-center text-sm text-muted-foreground mb-4">
                  <span>{shortenedAddress}</span>
                  <button 
                    className="ml-2 text-karma-purple" 
                    onClick={() => navigator.clipboard.writeText(walletAddress)}
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </button>
                </div>
                
                <Button variant="outline" size="sm" className="mb-6 w-full">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View on Blockchain
                </Button>
              </div>
              
              <KarmaScoreCard
                score={totalKarmaPoints}
                nftCount={validatedNFTCount}
                ranking={120}
                lastAction="2 days ago"
                username="KarmaUser"
              />

              <div className="bg-white rounded-lg border p-4 shadow-sm">
                <h3 className="font-medium mb-2">About</h3>
                <p className="text-sm text-muted-foreground">
                  Community volunteer passionate about making a difference through small, consistent acts of kindness.
                </p>
              </div>
            </div>
          </div>
          
          {/* Right Content - NFT Tabs */}
          <div className="md:col-span-2">
            <Tabs defaultValue="all">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">My Karma NFTs</h1>
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="validated">Validated</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                </TabsList>
              </div>
              
              <Separator className="mb-6" />
              
              <TabsContent value="all" className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {userNFTs.map((nft) => (
                    <NFTCard key={nft.id} {...nft} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="validated" className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {userNFTs
                    .filter((nft) => nft.status === "validated")
                    .map((nft) => (
                      <NFTCard key={nft.id} {...nft} />
                    ))}
                </div>
              </TabsContent>
              
              <TabsContent value="pending" className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {userNFTs
                    .filter((nft) => nft.status === "pending")
                    .map((nft) => (
                      <NFTCard key={nft.id} {...nft} />
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProfilePage;
