
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
  return (
    <footer className="bg-muted pt-12 pb-8">
      <div className="container">
        {/* Newsletter */}
        <div className="bg-primary/10 rounded-xl p-6 md:p-8 mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-xl md:text-2xl font-bold mb-2">Stay updated with our newsletter</h3>
              <p className="text-muted-foreground">Get the latest news, promotions and health tips.</p>
            </div>
            
            <div className="w-full md:w-auto flex gap-2">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="min-w-[200px] md:min-w-[300px]" 
              />
              <Button className="bg-primary hover:bg-primary/90 whitespace-nowrap">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <span className="font-bold text-xl text-primary">NutriHealth</span>
            </Link>
            <p className="text-muted-foreground mb-4">
              Your trusted source for premium health supplements and nutrition products. 
              Committed to quality, science, and your wellness journey.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube size={20} />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-muted-foreground hover:text-foreground transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/bestsellers" className="text-muted-foreground hover:text-foreground transition-colors">
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-muted-foreground hover:text-foreground transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                  Health Blog
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Help & Support */}
          <div>
            <h3 className="font-bold text-lg mb-4">Help & Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-muted-foreground hover:text-foreground transition-colors">
                  Shipping Information
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-muted-foreground hover:text-foreground transition-colors">
                  Returns Policy
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-2 mt-0.5 text-primary" />
                <span className="text-muted-foreground">
                  support@nutrihealth.com
                </span>
              </li>
              <li className="text-muted-foreground">
                1234 Wellness Avenue<br />
                Healthy City, HC 12345<br />
                United States
              </li>
              <li className="text-muted-foreground">
                <strong>Customer Service:</strong><br />
                Mon-Fri: 9AM - 6PM (EST)
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t pt-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} NutriHealth. All rights reserved.</p>
          <p className="mt-2">
            <Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
            {" • "}
            <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            {" • "}
            <Link to="/accessibility" className="hover:text-foreground transition-colors">Accessibility</Link>
          </p>
          <p className="mt-2 text-xs">
            This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
          </p>
        </div>
      </div>
    </footer>
  );
}
