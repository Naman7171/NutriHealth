import { Product, Review, User } from "./types";

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Premium Whey Protein",
    description: "High-quality whey protein isolate for muscle recovery and growth.",
    price: 49.99,
    category: "protein",
    image: "https://images.unsplash.com/photo-1593097136047-6e61e50c9e8a?w=500&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    stock: 100,
    ingredients: ["Whey Protein Isolate", "Natural Flavors", "Sweeteners"],
    servingSize: "30g",
    servingsPerContainer: 30,
    nutritionalInfo: {
      calories: 120,
      protein: 24,
      carbohydrates: 3,
      fat: 1,
      fiber: 0,
      sugar: 1
    },
    isActive: true,
    averageRating: 4.8,
    totalReviews: 156,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z"
  },
  {
    id: "2",
    name: "Vitamin D3 + K2",
    description: "Essential vitamins for bone health and immune support.",
    price: 29.99,
    category: "vitamins",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    stock: 150,
    ingredients: ["Vitamin D3", "Vitamin K2", "MCT Oil"],
    servingSize: "1 softgel",
    servingsPerContainer: 60,
    nutritionalInfo: {
      calories: 5,
      protein: 0,
      carbohydrates: 0,
      fat: 0,
      fiber: 0,
      sugar: 0
    },
    isActive: true,
    averageRating: 4.9,
    totalReviews: 89,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z"
  },
  {
    id: "3",
    name: "Green Tea Extract",
    description: "Natural weight management and antioxidant support.",
    price: 24.99,
    category: "weight-loss",
    image: "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=500&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    stock: 200,
    ingredients: ["Green Tea Extract", "Caffeine", "L-Theanine"],
    servingSize: "1 capsule",
    servingsPerContainer: 60,
    nutritionalInfo: {
      calories: 0,
      protein: 0,
      carbohydrates: 0,
      fat: 0,
      fiber: 0,
      sugar: 0
    },
    isActive: true,
    averageRating: 4.7,
    totalReviews: 112,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z"
  },
  {
    id: "4",
    name: "Pre-Workout Energy",
    description: "Enhance your workout performance with this powerful pre-workout formula.",
    price: 39.99,
    category: "energy",
    image: "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=500&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    stock: 80,
    ingredients: ["Beta-Alanine", "Creatine", "Caffeine", "BCAAs"],
    servingSize: "1 scoop",
    servingsPerContainer: 30,
    nutritionalInfo: {
      calories: 5,
      protein: 0,
      carbohydrates: 1,
      fat: 0,
      fiber: 0,
      sugar: 0
    },
    isActive: true,
    averageRating: 4.6,
    totalReviews: 203,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z"
  },
  {
    id: "5",
    name: "Probiotic 50 Billion CFU",
    description: "Clinical-strength probiotic with 10 strains for digestive health and immune support. Shelf-stable and allergen-free.",
    price: 39.99,
    category: "digestive-health",
    image: "https://images.unsplash.com/photo-1587854680352-936b22b91030?w=500&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    stock: 60,
    ingredients: ["Probiotic Blend", "Prebiotic Fiber", "Rice Maltodextrin"],
    servingSize: "1 capsule",
    servingsPerContainer: 60,
    nutritionalInfo: {
      calories: 5,
      protein: 0,
      carbohydrates: 1,
      fat: 0,
      fiber: 0,
      sugar: 0
    },
    isActive: true,
    averageRating: 4.9,
    totalReviews: 78,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z"
  },
  {
    id: "6",
    name: "Magnesium Glycinate",
    description: "Highly bioavailable form of magnesium that supports muscle relaxation, sleep quality, and stress management.",
    price: 24.99,
    category: "minerals",
    image: "https://images.unsplash.com/photo-1616506329866-95eae3ca1b1e?w=500&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    stock: 90,
    ingredients: ["Magnesium Glycinate", "Rice Flour", "Vegetable Capsule"],
    servingSize: "2 capsules",
    servingsPerContainer: 60,
    nutritionalInfo: {
      calories: 5,
      protein: 0,
      carbohydrates: 1,
      fat: 0,
      fiber: 0,
      sugar: 0
    },
    isActive: true,
    averageRating: 4.7,
    totalReviews: 92,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z"
  },
  {
    id: "7",
    name: "Plant-Based Protein Bars",
    description: "Delicious protein bars with 15g of clean plant protein. Perfect for on-the-go nutrition. Gluten-free and vegan.",
    price: 29.99,
    category: "snacks",
    image: "https://images.unsplash.com/photo-1569926656779-77d4f9ade1f8?w=500&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    stock: 120,
    ingredients: ["Pea Protein", "Almonds", "Dark Chocolate", "Dates"],
    servingSize: "1 bar (60g)",
    servingsPerContainer: 12,
    nutritionalInfo: {
      calories: 220,
      protein: 15,
      carbohydrates: 24,
      fat: 9,
      fiber: 5,
      sugar: 12
    },
    isActive: true,
    averageRating: 4.4,
    totalReviews: 156,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z"
  },
  {
    id: "8",
    name: "Collagen Peptides",
    description: "Grass-fed collagen to support healthy skin, hair, nails, and joints. Unflavored and mixes easily with any liquid.",
    price: 44.99,
    category: "beauty-wellness",
    image: "https://images.unsplash.com/photo-1595348020949-87cdfbb44174?w=500&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    stock: 45,
    ingredients: ["Bovine Collagen Peptides", "Vitamin C"],
    servingSize: "2 scoops (20g)",
    servingsPerContainer: 30,
    nutritionalInfo: {
      calories: 70,
      protein: 18,
      carbohydrates: 0,
      fat: 0,
      fiber: 0,
      sugar: 0
    },
    isActive: true,
    averageRating: 4.8,
    totalReviews: 203,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z"
  }
];

export const mockReviews: Review[] = [
  {
    id: "1",
    productId: "1",
    userId: "user1",
    userName: "Sarah J.",
    rating: 5,
    comment: "Amazing protein powder! It mixes so well and tastes great without any artificial sweeteners. Will definitely purchase again.",
    createdAt: "2023-03-10T00:00:00Z",
  },
  {
    id: "2",
    productId: "1",
    userId: "user2",
    userName: "Michael T.",
    rating: 4,
    comment: "Good quality protein, but I wish it had a bit more flavor. Still, love that it's all organic!",
    createdAt: "2023-04-15T00:00:00Z",
  },
  {
    id: "3",
    productId: "2",
    userId: "user3",
    userName: "Emma K.",
    rating: 5,
    comment: "These vitamin drops are so easy to use! I've noticed a huge difference in my energy levels since I started taking them.",
    createdAt: "2023-05-20T00:00:00Z",
  },
];

export const mockUsers: User[] = [
  {
    id: "user1",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    createdAt: "2023-01-01T00:00:00Z",
  },
  {
    id: "user2",
    name: "Regular User",
    email: "user@example.com",
    role: "user",
    createdAt: "2023-01-02T00:00:00Z",
  },
];

export const mockCategories = [
  "Supplements",
  "Vitamins",
  "Minerals",
  "Superfoods",
  "Digestive Health",
  "Beauty & Wellness",
  "Snacks",
  "Sports Nutrition",
];
