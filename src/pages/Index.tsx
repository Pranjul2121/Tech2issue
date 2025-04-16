
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { KarmaScoreCard } from "@/components/karma/karma-score-card";
import { NFTCard } from "@/components/karma/nft-card";
import { Award, ExternalLink, Upload, Users, Vote } from "lucide-react";
import { Link } from "react-router-dom";

// Sample data for demo purposes
const featuredDeeds = [
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
    owner: "0x1234...5678"
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
    owner: "0x8765...4321"
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
    owner: "0x2468...1357"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-karma-background-light to-white py-20 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-karma-purple-dark to-karma-purple-light bg-clip-text text-transparent">
                Build your Karma with Good Deeds
              </h1>
              <p className="text-lg mb-6 text-gray-700">
                KarmaChain rewards real-world good actions with Soulbound NFTs, building a trusted digital reputation that follows you across the web.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg">
                  <Link to="/submit">
                    <Upload className="mr-2 h-5 w-5" />
                    Submit a Good Deed
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/validate">
                    <Vote className="mr-2 h-5 w-5" />
                    Help Validate
                  </Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <KarmaScoreCard
                score={75}
                nftCount={5}
                ranking={120}
                lastAction="Community Beach Cleanup"
                username="KarmaUser"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-12">How KarmaChain Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg border border-gray-200 bg-white shadow-sm">
              <div className="w-16 h-16 bg-karma-purple-light/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="h-8 w-8 text-karma-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Upload Proof</h3>
              <p className="text-gray-600">
                Submit evidence of your good deed with photos, description, and optional location.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg border border-gray-200 bg-white shadow-sm">
              <div className="w-16 h-16 bg-karma-purple-light/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-karma-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Get Validated</h3>
              <p className="text-gray-600">
                The community votes on your submission to verify it's authentic and meaningful.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg border border-gray-200 bg-white shadow-sm">
              <div className="w-16 h-16 bg-karma-purple-light/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-karma-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Earn Karma</h3>
              <p className="text-gray-600">
                Receive a Soulbound NFT that increases your KarmaScore and builds your reputation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Deeds Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto max-w-5xl">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Featured Good Deeds</h2>
            <Button variant="outline" size="sm" asChild>
              <Link to="/validate">
                <ExternalLink className="mr-2 h-4 w-4" />
                View All
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredDeeds.map((deed) => (
              <NFTCard key={deed.id} {...deed} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
