
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src="https://images.unsplash.com/photo-1505576633757-0ac1084af824?ixlib=rb-4.0.3&auto=format&fit=crop&q=80"
          alt="Healthy lifestyle background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 dark:bg-black/70"></div>
      </div>
      
      {/* Content */}
      <div className="container relative z-10">
        <div className="max-w-xl mx-auto md:ml-0 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in">
            Nourish Your Body,
            <span className="text-primary block mt-2">Elevate Your Life</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Discover premium health supplements crafted from the finest natural ingredients, scientifically formulated to support your wellness journey.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Link to="/products">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-white rounded-full px-8"
              >
                Shop Now
              </Button>
            </Link>
            
            <Link to="/about">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-black dark:text-white hover:bg-white/20 rounded-full px-8"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-10 left-10 w-20 h-20 border-2 border-primary rounded-full opacity-20 animate-pulse" style={{ animationDuration: "3s" }}></div>
      <div className="absolute top-10 right-10 w-32 h-32 border-2 border-primary rounded-full opacity-20 animate-pulse" style={{ animationDuration: "4s" }}></div>
    </section>
  );
}
