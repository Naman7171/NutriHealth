// Product Types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'vitamins' | 'protein' | 'weight-loss' | 'energy' | 'immune-support' | 'other';
  image: string;
  stock: number;
  ingredients: string[];
  servingSize: string;
  servingsPerContainer: number;
  nutritionalInfo?: {
    calories?: number;
    protein?: number;
    carbohydrates?: number;
    fat?: number;
    fiber?: number;
    sugar?: number;
  };
  isActive: boolean;
  averageRating: number;
  totalReviews: number;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Wishlist {
  products: Product[];
}

export interface Review {
  id: string;
  user: {
    id: string;
    name: string;
  };
  product: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  user: string;
  items: {
    product: Product;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: 'credit_card' | 'paypal' | 'stripe';
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

// Filter Types
export interface ProductFilters {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
