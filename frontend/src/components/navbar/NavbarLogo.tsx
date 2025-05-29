
import React from 'react';
import { Link } from 'react-router-dom';

const NavbarLogo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2 shrink-0">
      <span className="font-bold text-xl md:text-2xl text-primary">NutriHealth</span>
    </Link>
  );
};

export default NavbarLogo;
