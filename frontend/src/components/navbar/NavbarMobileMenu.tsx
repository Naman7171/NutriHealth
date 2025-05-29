
import React from 'react';
import { Link } from 'react-router-dom';

interface NavbarMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const NavbarMobileMenu = ({ isOpen, onClose }: NavbarMobileMenuProps) => {
  if (!isOpen) return null;
  
  return (
    <div className="md:hidden fixed top-[calc(var(--navbar-height))] left-0 w-full bg-white dark:bg-background border-t shadow-lg animate-in slide-in-from-top-5 z-50">
      <nav className="container mx-auto py-4 flex flex-col space-y-4">
        <Link 
          to="/products" 
          className="px-4 py-2 hover:bg-muted rounded-md transition-colors"
          onClick={onClose}
        >
          Products
        </Link>
        <Link 
          to="/products?category=Vitamins" 
          className="px-4 py-2 hover:bg-muted rounded-md transition-colors"
          onClick={onClose}
        >
          Vitamins
        </Link>
        <Link 
          to="/products?category=Protein" 
          className="px-4 py-2 hover:bg-muted rounded-md transition-colors"
          onClick={onClose}
        >
          Protein
        </Link>
        <Link 
          to="/products?bestseller=true" 
          className="px-4 py-2 hover:bg-muted rounded-md transition-colors"
          onClick={onClose}
        >
          Best Sellers
        </Link>
        <Link 
          to="/profile" 
          className="px-4 py-2 hover:bg-muted rounded-md transition-colors"
          onClick={onClose}
        >
          My Account
        </Link>
        <Link 
          to="/admin" 
          className="px-4 py-2 hover:bg-muted rounded-md transition-colors"
          onClick={onClose}
        >
          Admin Dashboard
        </Link>
        <Link 
          to="/wishlist" 
          className="px-4 py-2 hover:bg-muted rounded-md transition-colors"
          onClick={onClose}
        >
          Wishlist
        </Link>
      </nav>
    </div>
  );
};

export default NavbarMobileMenu;
