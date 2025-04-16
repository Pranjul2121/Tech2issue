
import { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ValidationCard } from "@/components/karma/validation-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { AlertCircle, PanelTop, UserCheck, BadgeCheck, Filter } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { NFTProps } from "@/components/karma/nft-card";

// Sample data for demo purposes
const pendingDeeds = [
  {
    id: "4",
    title: "Senior Center Visit",
    description: "Spent an afternoon visiting with seniors at a local retirement home, playing games and listening to their stories.",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80",
    karmaPoints: 15,
    createdAt: "3 days ago",
    location: "Chicago, IL",
    status: "pending" as const,
    votes: 12,
    owner: "0x8273...4589"
  },
  {
    id: "5",
    title: "Blood Donation",
    description: "Donated blood at the local Red Cross blood drive to help save lives in my community.",
    imageUrl: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&q=80",
    karmaPoints: 25,
    createdAt: "1 day ago",
    location: "Boston, MA",
    status: "pending" as const,
    votes: 18,
    owner: "0x9384...1239"
  },
  {
    id: "6",
    title: "Park Cleanup",
    description: "Spent Saturday morning picking up litter at Jefferson Park to make it cleaner for weekend visitors.",
    imageUrl: "https://images.unsplash.com/photo-1567817886294-270bbb4b8243?auto=format&fit=crop&q=80",
    karmaPoints: 20,
    createdAt: "2 days ago",
    location: "Denver, CO",
    status: "pending" as const,
    votes: 8,
    owner: "0x2345...8912"
  },
  {
    id: "7",
    title: "Homeless Shelter Volunteer",
    description: "Volunteered at a local homeless shelter, preparing and serving meals to those in need.",
    imageUrl: "https://images.unsplash.com/photo-1593113630400-ea4288922497?auto=format&fit=crop&q=80",
    karmaPoints: 30,
    createdAt: "4 days ago",
    location: "Seattle, WA",
    status: "pending" as const,
    votes: 22,
    owner: "0x7654...2345"
  }
];

const ValidatePage = () => {
  const [deeds, setDeeds] = useState(pendingDeeds);
  const [votedDeeds, setVotedDeeds] = useState<string[]>([]);

  const handleValidation = (id: string, isValid: boolean) => {
    // In a real app, this would interact with a smart contract
    console.log(`Deed ${id} validated as ${isValid ? "valid" : "invalid"}`);
    
    // Add to voted deeds
    setVotedDeeds((prev) => [...prev, id]);
  };

  const isVoted = (id: string) => votedDeeds.includes(id);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Validate Good Deeds</h1>
          <p className="text-muted-foreground">
            Help validate submissions from the community to ensure authenticity and reward genuine good deeds.
          </p>
        </div>
        
        <Alert className="mb-8 bg-karma-background-light border-karma-purple-light">
          <AlertCircle className="h-5 w-5 text-karma-purple" />
          <AlertTitle className="text-karma-purple-dark font-semibold">Validation Guidelines</AlertTitle>
          <AlertDescription className="text-gray-700">
            Please validate submissions based on evidence quality, impact, and authenticity. 
            When in doubt, research before voting. Your integrity helps our community thrive.
          </AlertDescription>
        </Alert>
        
        <Tabs defaultValue="pending">
          <div className="flex items-center justify-between mb-6">
            <TabsList>
              <TabsTrigger value="pending" className="flex items-center">
                <PanelTop className="mr-2 h-4 w-4" /> 
                Pending ({pendingDeeds.length})
              </TabsTrigger>
              <TabsTrigger value="voted" className="flex items-center">
                <UserCheck className="mr-2 h-4 w-4" /> 
                My Votes ({votedDeeds.length})
              </TabsTrigger>
              <TabsTrigger value="validated" className="flex items-center">
                <BadgeCheck className="mr-2 h-4 w-4" /> 
                Validated
              </TabsTrigger>
            </TabsList>
            
            <Button variant="outline" size="sm" className="flex items-center">
              <Filter className="mr-2 h-3.5 w-3.5" />
              Filter
            </Button>
          </div>
          
          <Separator className="mb-6" />
          
          <TabsContent value="pending" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {deeds.map((deed) => (
                <ValidationCard 
                  key={deed.id} 
                  deed={deed} 
                  onValidate={handleValidation}
                  userVoted={isVoted(deed.id)}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="voted" className="mt-0">
            {votedDeeds.length === 0 ? (
              <div className="text-center p-12 bg-gray-50 rounded-lg">
                <UserCheck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No Votes Yet</h3>
                <p className="text-muted-foreground">
                  You haven't voted on any submissions yet. Start by reviewing pending submissions.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {deeds
                  .filter((deed) => votedDeeds.includes(deed.id))
                  .map((deed) => (
                    <ValidationCard 
                      key={deed.id} 
                      deed={deed} 
                      onValidate={handleValidation}
                      userVoted={true}
                    />
                  ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="validated" className="mt-0">
            <div className="text-center p-12 bg-gray-50 rounded-lg">
              <BadgeCheck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Validation Process</h3>
              <p className="text-muted-foreground">
                Deeds are validated when they receive enough community votes. 
                Validated deeds are converted to Soulbound NFTs and added to the user's profile.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default ValidatePage;
