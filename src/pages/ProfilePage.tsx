
import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { KarmaScoreCard } from "@/components/karma/karma-score-card";
import { NFTCard, NFTProps } from "@/components/karma/nft-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Copy, ExternalLink, Award, Edit, Check, Upload } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";

// Sample data for demo purposes - will be used as fallback if no localStorage data
const sampleNFTs = [
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

// Available profile images
const profileImageOptions = [
  { 
    id: "default",
    url: null
  },
  { 
    id: "profile1", 
    url: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&q=80&w=200&h=200" 
  },
  { 
    id: "profile2", 
    url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=200&h=200" 
  },
  { 
    id: "profile3", 
    url: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&q=80&w=200&h=200" 
  }
];

// Available theme options
const themeOptions = [
  { id: "light", label: "Light Mode", value: "light" },
  { id: "dark", label: "Dark Mode", value: "dark" },
  { id: "purple", label: "Purple Theme", value: "purple" }
];

const ProfilePage = () => {
  const isMobile = useIsMobile();
  
  // User profile state
  const [username, setUsername] = useState("KarmaUser");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [customImage, setCustomImage] = useState<File | null>(null);
  const [customImagePreview, setCustomImagePreview] = useState<string | null>(null);
  const [theme, setTheme] = useState("light");
  const [bio, setBio] = useState("Community volunteer passionate about making a difference through small, consistent acts of kindness.");
  
  // NFT state
  const [userNFTs, setUserNFTs] = useState<NFTProps[]>([]);
  
  // Load NFTs from localStorage on component mount
  useEffect(() => {
    const storedNFTs = localStorage.getItem('userNFTs');
    if (storedNFTs) {
      // Combine stored NFTs with sample NFTs
      const parsedNFTs = JSON.parse(storedNFTs);
      setUserNFTs([...parsedNFTs, ...sampleNFTs]);
    } else {
      // If no stored NFTs, use sample data
      setUserNFTs(sampleNFTs);
    }
    
    // Load user profile data if available
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      const profile = JSON.parse(storedProfile);
      setUsername(profile.username || username);
      setBio(profile.bio || bio);
      setTheme(profile.theme || theme);
      setProfileImage(profile.profileImage || profileImage);
      setCustomImagePreview(profile.customImagePreview || null);
    }
  }, []);
  
  // Edit profile dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editUsername, setEditUsername] = useState(username);
  const [editBio, setEditBio] = useState(bio);
  const [editTheme, setEditTheme] = useState(theme);
  const [editProfileImage, setEditProfileImage] = useState<string | null>(profileImage);
  const [editCustomImage, setEditCustomImage] = useState<File | null>(customImage);
  const [editCustomImagePreview, setEditCustomImagePreview] = useState<string | null>(customImagePreview);

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
  
  // Handle custom image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setEditCustomImage(file);
      setEditProfileImage(null);
      
      // Create preview for uploaded image
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setEditCustomImagePreview(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Reset edit form
  const resetEditForm = () => {
    setEditUsername(username);
    setEditBio(bio);
    setEditTheme(theme);
    setEditProfileImage(profileImage);
    setEditCustomImage(customImage);
    setEditCustomImagePreview(customImagePreview);
  };
  
  // Save profile changes
  const saveProfileChanges = () => {
    setUsername(editUsername);
    setBio(editBio);
    setTheme(editTheme);
    setProfileImage(editProfileImage);
    setCustomImage(editCustomImage);
    setCustomImagePreview(editCustomImagePreview);
    
    // Save profile to localStorage
    localStorage.setItem('userProfile', JSON.stringify({
      username: editUsername,
      bio: editBio,
      theme: editTheme,
      profileImage: editProfileImage,
      customImagePreview: editCustomImagePreview
    }));
    
    // Close dialog/drawer
    setDialogOpen(false);
    setDrawerOpen(false);
    
    // Show success toast
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    });
    
    // Apply theme changes
    document.documentElement.setAttribute('data-theme', editTheme);
  };

  // Get current display image (custom upload or selected preset)
  const currentDisplayImage = customImagePreview || profileImage;
  const editDisplayImage = editCustomImagePreview || editProfileImage;
  
  // Edit profile component (shared between dialog and drawer)
  const EditProfileContent = (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="username">Display Name</Label>
        <Input 
          id="username" 
          value={editUsername} 
          onChange={(e) => setEditUsername(e.target.value)} 
          maxLength={20}
        />
      </div>
      
      <div className="space-y-2">
        <Label>Profile Picture</Label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {profileImageOptions.map(option => (
            <div 
              key={option.id}
              className={`relative cursor-pointer rounded-lg overflow-hidden ${
                option.url === editProfileImage ? 'ring-2 ring-primary' : 'ring-1 ring-border'
              }`}
              onClick={() => {
                setEditProfileImage(option.url);
                setEditCustomImage(null);
                setEditCustomImagePreview(null);
              }}
            >
              {option.url ? (
                <img 
                  src={option.url} 
                  alt="Profile option" 
                  className="w-full h-20 object-cover"
                />
              ) : (
                <div className="w-full h-20 bg-muted flex items-center justify-center">
                  <Award className="h-10 w-10 text-muted-foreground" />
                </div>
              )}
              {option.url === editProfileImage && (
                <div className="absolute top-1 right-1 bg-primary rounded-full p-1">
                  <Check className="h-3 w-3 text-primary-foreground" />
                </div>
              )}
            </div>
          ))}
          <div className="col-span-2 sm:col-span-4">
            <div className="relative">
              {editCustomImagePreview && (
                <div className="relative mb-2">
                  <img 
                    src={editCustomImagePreview} 
                    alt="Custom" 
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => {
                      setEditCustomImage(null);
                      setEditCustomImagePreview(null);
                    }}
                  >
                    Change
                  </Button>
                </div>
              )}
              <div className={`border-2 border-dashed rounded-lg p-4 ${!editCustomImagePreview ? 'block' : 'hidden'}`}>
                <Label 
                  htmlFor="custom-image" 
                  className="cursor-pointer flex flex-col items-center justify-center text-center"
                >
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <span className="text-primary hover:text-primary/80">
                    Upload custom image
                  </span>
                  <p className="text-xs text-muted-foreground mt-1">
                    PNG, JPG up to 5MB
                  </p>
                </Label>
                <Input 
                  id="custom-image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Input 
          id="bio" 
          value={editBio} 
          onChange={(e) => setEditBio(e.target.value)} 
        />
      </div>
      
      <div className="space-y-2">
        <Label>Theme</Label>
        <RadioGroup value={editTheme} onValueChange={setEditTheme}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {themeOptions.map(option => (
              <div 
                key={option.id}
                className={`flex items-center border rounded-lg p-3 cursor-pointer ${
                  editTheme === option.value ? 'bg-secondary border-primary' : ''
                }`}
                onClick={() => setEditTheme(option.value)}
              >
                <RadioGroupItem value={option.value} id={option.id} className="mr-2" />
                <Label htmlFor={option.id} className="cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
  
  const EditProfileActions = (
    <div className="flex justify-end gap-2 mt-4">
      <Button variant="outline" onClick={() => { 
        resetEditForm();
        setDialogOpen(false);
        setDrawerOpen(false);
      }}>
        Cancel
      </Button>
      <Button onClick={saveProfileChanges}>
        Save Changes
      </Button>
    </div>
  );
  
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
                <div className="w-24 h-24 rounded-full relative mb-4">
                  {currentDisplayImage ? (
                    <Avatar className="w-24 h-24">
                      <AvatarImage src={currentDisplayImage} alt={username} />
                      <AvatarFallback>
                        <Award className="h-12 w-12" />
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gradient-to-r from-karma-purple to-karma-purple-light flex items-center justify-center text-white text-3xl font-bold">
                      <Award className="h-12 w-12" />
                    </div>
                  )}
                  
                  {/* Edit button over avatar */}
                  {isMobile ? (
                    <DrawerTrigger asChild onClick={() => {
                      resetEditForm();
                      setDrawerOpen(true);
                    }}>
                      <Button 
                        size="icon" 
                        variant="secondary"
                        className="absolute bottom-0 right-0 rounded-full h-8 w-8 shadow-md"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DrawerTrigger>
                  ) : (
                    <Button 
                      size="icon" 
                      variant="secondary"
                      className="absolute bottom-0 right-0 rounded-full h-8 w-8 shadow-md"
                      onClick={() => {
                        resetEditForm();
                        setDialogOpen(true);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                
                <h2 className="text-xl font-bold mb-1">{username}</h2>
                
                <div className="flex items-center text-sm text-muted-foreground mb-4">
                  <span>{shortenedAddress}</span>
                  <button 
                    className="ml-2 text-karma-purple" 
                    onClick={() => {
                      navigator.clipboard.writeText(walletAddress);
                      toast({ 
                        title: "Address copied", 
                        description: "Wallet address copied to clipboard" 
                      });
                    }}
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
                username={username}
              />

              <div className="bg-white rounded-lg border p-4 shadow-sm">
                <h3 className="font-medium mb-2">About</h3>
                <p className="text-sm text-muted-foreground">
                  {bio}
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
                {userNFTs.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {userNFTs.map((nft) => (
                      <NFTCard key={nft.id} {...nft} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">No NFTs found. Submit a good deed to get started!</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="validated" className="mt-0">
                {userNFTs.filter((nft) => nft.status === "validated").length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {userNFTs
                      .filter((nft) => nft.status === "validated")
                      .map((nft) => (
                        <NFTCard key={nft.id} {...nft} />
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">No validated NFTs found yet.</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="pending" className="mt-0">
                {userNFTs.filter((nft) => nft.status === "pending").length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {userNFTs
                      .filter((nft) => nft.status === "pending")
                      .map((nft) => (
                        <NFTCard key={nft.id} {...nft} />
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">No pending NFTs found.</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      {/* Dialog for desktop */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          {EditProfileContent}
          <DialogFooter>
            {EditProfileActions}
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Drawer for mobile */}
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerContent className="px-4 pb-6">
          <div className="mx-auto w-full max-w-sm pt-6">
            <h3 className="text-lg font-semibold mb-4">Edit Profile</h3>
            {EditProfileContent}
            {EditProfileActions}
          </div>
        </DrawerContent>
      </Drawer>
      
      <Footer />
    </div>
  );
};

export default ProfilePage;
