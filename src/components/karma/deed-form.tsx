
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, MapPin } from "lucide-react";

interface DeedFormProps {
  onSubmit: (data: {
    title: string;
    description: string;
    image: File | null;
    location: string;
  }) => void;
}

export function DeedForm({ onSubmit }: DeedFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate a delay for form submission
    setTimeout(() => {
      onSubmit({ title, description, image, location });
      setLoading(false);
      // Reset form (in a real app you might redirect)
      setTitle("");
      setDescription("");
      setImage(null);
      setImagePreview(null);
      setLocation("");
    }, 1500);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Submit a Good Deed</CardTitle>
        <CardDescription>
          Share details about your good deed to earn karma points after validation
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title of your good deed</Label>
            <Input 
              id="title"
              placeholder="E.g., Beach Cleanup, Blood Donation, Volunteer Work"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description"
              placeholder="Describe what you did, how it helped others, and any impact it had..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-32"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="image">Upload Proof (Image/Video)</Label>
            <div className={`border-2 border-dashed rounded-lg p-6 ${imagePreview ? 'border-karma-purple' : 'border-muted'}`}>
              {imagePreview ? (
                <div className="relative">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="max-h-64 mx-auto rounded-md"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => {
                      setImage(null);
                      setImagePreview(null);
                    }}
                  >
                    Change
                  </Button>
                </div>
              ) : (
                <div className="text-center">
                  <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                  <Label 
                    htmlFor="image-upload" 
                    className="cursor-pointer text-primary hover:text-primary/80"
                  >
                    Click to upload or drag and drop
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    PNG, JPG, GIF, MP4 up to 10MB
                  </p>
                </div>
              )}
              <Input 
                id="image-upload"
                type="file"
                accept="image/*,video/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center gap-1">
              <MapPin className="h-4 w-4" /> Location (Optional)
            </Label>
            <Input 
              id="location"
              placeholder="E.g., San Francisco, CA"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full"
            disabled={!title || !description || !image || loading}
          >
            {loading ? "Submitting..." : "Submit for Validation"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
