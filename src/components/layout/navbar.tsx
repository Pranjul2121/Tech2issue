
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Award, Plus, User, Activity, Home } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link to="/" className="flex items-center space-x-2">
            <Award className="h-6 w-6 text-karma-purple" />
            <span className="text-xl font-bold bg-gradient-to-r from-karma-purple to-karma-gold-light bg-clip-text text-transparent">
              KarmaChain
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="hidden md:flex items-center space-x-2">
            <Link to="/" className="flex items-center text-sm font-medium px-4">
              <Home className="mr-2 h-4 w-4" />
              Home
            </Link>
            <Link to="/profile" className="flex items-center text-sm font-medium px-4">
              <User className="mr-2 h-4 w-4" />
              Profile
            </Link>
            <Link to="/submit" className="flex items-center text-sm font-medium px-4">
              <Plus className="mr-2 h-4 w-4" />
              Submit Deed
            </Link>
            <Link to="/validate" className="flex items-center text-sm font-medium px-4">
              <Activity className="mr-2 h-4 w-4" />
              Validate
            </Link>
          </nav>
          <div className="flex items-center space-x-2">
            <Button variant="outline">Connect Wallet</Button>
          </div>
        </div>
      </div>
    </header>
  );
}
