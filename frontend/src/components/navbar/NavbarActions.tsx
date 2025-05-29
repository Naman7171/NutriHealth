
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ThemeToggle';
import { useCart } from '@/context/CartContext';

interface NavbarActionsProps {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}

const NavbarActions = ({ isMobileMenuOpen, toggleMobileMenu }: NavbarActionsProps) => {
  const { totalItems } = useCart();
  
  return (
    <div className="flex items-center space-x-2">
      {/* Theme Toggle */}
      <ThemeToggle />
      
      {/* Wishlist */}
      <Link to="/wishlist">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Heart className="h-5 w-5" />
          <span className="sr-only">Wishlist</span>
        </Button>
      </Link>
      
      {/* Cart */}
      <Link to="/checkout">
        <Button variant="ghost" size="icon" className="rounded-full relative">
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
          <span className="sr-only">Cart</span>
        </Button>
      </Link>
      
      {/* User - now links to profile instead of login */}
      <Link to="/profile">
        <Button variant="ghost" size="icon" className="rounded-full">
          <User className="h-5 w-5" />
          <span className="sr-only">Account</span>
        </Button>
      </Link>
      
      {/* Mobile menu toggle */}
      <Button 
        variant="ghost" 
        size="icon" 
        className="md:hidden rounded-full"
        onClick={toggleMobileMenu}
      >
        {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        <span className="sr-only">Menu</span>
      </Button>
    </div>
  );
};

export default NavbarActions;
