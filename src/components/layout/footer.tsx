
import { Link } from "react-router-dom";
import { Award } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2">
              <Award className="h-6 w-6 text-karma-purple" />
              <span className="text-xl font-bold bg-gradient-to-r from-karma-purple to-karma-gold-light bg-clip-text text-transparent">
                KarmaChain
              </span>
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">
              Rewarding real-world good deeds with Soulbound NFTs and building a trusted reputation system.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="grid gap-2">
              <Link to="/" className="text-sm hover:underline">Home</Link>
              <Link to="/profile" className="text-sm hover:underline">Profile</Link>
              <Link to="/submit" className="text-sm hover:underline">Submit Deed</Link>
              <Link to="/validate" className="text-sm hover:underline">Validate</Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <p className="text-sm text-muted-foreground">
              Join our community and start building your Karma Score today.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-karma-purple hover:text-karma-purple-light">
                Twitter
              </a>
              <a href="#" className="text-karma-purple hover:text-karma-purple-light">
                Discord
              </a>
              <a href="#" className="text-karma-purple hover:text-karma-purple-light">
                GitHub
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-4">
          <p className="text-center text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} KarmaChain. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
