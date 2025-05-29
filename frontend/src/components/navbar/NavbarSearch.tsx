
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface NavbarSearchProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const NavbarSearch = ({ isOpen, onOpenChange }: NavbarSearchProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isListening, setIsListening] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Check if Web Speech API is available
  const speechRecognitionAvailable = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
  
  // Handle search submission
  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      onOpenChange(false);
    }
  };

  // Start voice recognition
  const startListening = () => {
    if (!speechRecognitionAvailable) {
      toast({
        title: "Voice Search Unavailable",
        description: "Your browser doesn't support voice recognition.",
        variant: "destructive"
      });
      return;
    }

    setIsListening(true);
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchTerm(transcript);
      setIsListening(false);
      toast({
        title: "Voice search detected",
        description: `Searching for: "${transcript}"`,
      });
      
      navigate(`/products?search=${encodeURIComponent(transcript)}`);
      onOpenChange(false);
    };
    
    recognition.onerror = () => {
      setIsListening(false);
      toast({
        title: "Voice Recognition Error",
        description: "Could not understand audio, please try again.",
        variant: "destructive"
      });
    };
    
    recognition.onend = () => {
      setIsListening(false);
    };
    
    recognition.start();
  };
  
  return (
    <div className="relative">
      {!isOpen ? (
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => onOpenChange(true)}
          className="rounded-full"
        >
          <Search className="h-5 w-5" />
          <span className="sr-only">Search</span>
        </Button>
      ) : (
        <form onSubmit={handleSearchSubmit} className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center bg-background border rounded-md overflow-hidden animate-in fade-in-0 slide-in-from-top-5">
          <Input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[200px] md:w-[300px] border-0 focus-visible:ring-0"
            autoFocus
          />
          
          {speechRecognitionAvailable && (
            <Button 
              variant="ghost" 
              size="icon"
              onClick={startListening}
              className={cn(
                "rounded-full transition-colors",
                isListening ? "text-primary animate-pulse" : ""
              )}
              type="button"
            >
              <Mic className="h-4 w-4" />
            </Button>
          )}
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => onOpenChange(false)}
            type="button"
          >
            <X className="h-4 w-4" />
          </Button>
        </form>
      )}
    </div>
  );
};

export default NavbarSearch;
