
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import NavbarLogo from './NavbarLogo';
import NavbarDesktopMenu from './NavbarDesktopMenu';
import NavbarMobileMenu from './NavbarMobileMenu';
import NavbarSearch from './NavbarSearch';
import NavbarActions from './NavbarActions';
import './index.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 navbar-container",
      "bg-white dark:bg-background/95 dark:backdrop-blur-md border-b shadow-sm",
      isScrolled ? "py-1" : "py-1"
    )}>
      <div className="container px-4 mx-auto h-full flex items-center justify-between gap-4">
        {/* Logo */}
        <NavbarLogo />
        
        {/* Desktop Navigation */}
        <NavbarDesktopMenu />
        
        {/* Actions */}
        <div className="flex items-center space-x-2">
          {/* Search */}
          <NavbarSearch
            isOpen={isSearchOpen}
            onOpenChange={setIsSearchOpen}
          />
          
          {/* Other Actions */}
          <NavbarActions
            isMobileMenuOpen={isMobileMenuOpen}
            toggleMobileMenu={toggleMobileMenu}
          />
        </div>
      </div>
      
      {/* Mobile menu */}
      <NavbarMobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
}
