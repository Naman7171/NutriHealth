
import { User, Product, CartItem, WishlistItem, Order, Review } from './types';

class MockDatabase {
  private users: User[] = [];
  private products: Product[] = [];
  private cartItems: CartItem[] = [];
  private wishlistItems: WishlistItem[] = [];
  private orders: Order[] = [];
  private reviews: Review[] = [];
  private currentUserId: string | null = null;

  constructor() {
    this.loadFromStorage();
    this.initializeData();
  }

  private loadFromStorage() {
    try {
      const stored = localStorage.getItem('mockDatabase');
      if (stored) {
        const data = JSON.parse(stored);
        this.users = data.users || [];
        this.products = data.products || [];
        this.cartItems = data.cartItems || [];
        this.wishlistItems = data.wishlistItems || [];
        this.orders = data.orders || [];
        this.reviews = data.reviews || [];
      }
      this.currentUserId = localStorage.getItem('currentUserId');
    } catch (error) {
      console.error('Error loading from storage:', error);
    }
  }

  private saveToStorage() {
    try {
      const data = {
        users: this.users,
        products: this.products,
        cartItems: this.cartItems,
        wishlistItems: this.wishlistItems,
        orders: this.orders,
        reviews: this.reviews,
      };
      localStorage.setItem('mockDatabase', JSON.stringify(data));
      if (this.currentUserId) {
        localStorage.setItem('currentUserId', this.currentUserId);
      }
    } catch (error) {
      console.error('Error saving to storage:', error);
    }
  }

  private initializeData() {
    if (this.products.length === 0) {
      this.products = [
        {
          id: '1',
          name: 'Premium Vitamin D3',
          slug: 'premium-vitamin-d3',
          description: 'High-potency Vitamin D3 supplement for immune support and bone health.',
          price: 24.99,
          category: 'Vitamins',
          tags: ['vitamin-d', 'immune-support', 'bone-health'],
          imageUrls: ['https://images.unsplash.com/photo-1559181567-c3190ca9959b'],
          stock: 100,
          rating: 4.8,
          createdAt: '2024-01-01T00:00:00Z'
        },
        {
          id: '2',
          name: 'Omega-3 Fish Oil',
          slug: 'omega-3-fish-oil',
          description: 'Pure omega-3 fish oil for heart and brain health.',
          price: 32.99,
          category: 'Supplements',
          tags: ['omega-3', 'heart-health', 'brain-health'],
          imageUrls: ['https://images.unsplash.com/photo-1559181567-c3190ca9959b'],
          stock: 75,
          rating: 4.6,
          createdAt: '2024-01-02T00:00:00Z'
        }
      ];
    }

    if (this.users.length === 0) {
      this.users = [
        {
          id: 'admin1',
          name: 'Admin User',
          email: 'admin@nutrihealth.com',
          password: 'admin123',
          role: 'admin',
          createdAt: '2024-01-01T00:00:00Z'
        }
      ];
    }

    this.saveToStorage();
  }

  // User methods
  createUser(userData: Omit<User, 'id' | 'createdAt'>): User {
    const user: User = {
      id: Date.now().toString(),
      ...userData,
      createdAt: new Date().toISOString()
    };
    this.users.push(user);
    this.saveToStorage();
    return user;
  }

  findUserByEmail(email: string): User | undefined {
    return this.users.find(user => user.email === email);
  }

  findUserById(id: string): User | undefined {
    return this.users.find(user => user.id === id);
  }

  setCurrentUser(userId: string | null) {
    this.currentUserId = userId;
    if (userId) {
      localStorage.setItem('currentUserId', userId);
    } else {
      localStorage.removeItem('currentUserId');
    }
  }

  getCurrentUser(): User | null {
    return this.currentUserId ? this.findUserById(this.currentUserId) || null : null;
  }

  // Product methods
  getProducts(filters?: { category?: string; search?: string; page?: number; limit?: number }) {
    let filtered = [...this.products];

    if (filters?.category) {
      filtered = filtered.filter(p => p.category === filters.category);
    }

    if (filters?.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search) ||
        p.tags.some(tag => tag.toLowerCase().includes(search))
      );
    }

    const page = filters?.page || 1;
    const limit = filters?.limit || 12;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    return {
      data: filtered.slice(startIndex, endIndex),
      pagination: {
        page,
        limit,
        total: filtered.length,
        totalPages: Math.ceil(filtered.length / limit)
      }
    };
  }

  getProductById(id: string): Product | undefined {
    return this.products.find(p => p.id === id);
  }

  createProduct(productData: Omit<Product, 'id' | 'createdAt'>): Product {
    const product: Product = {
      id: Date.now().toString(),
      ...productData,
      createdAt: new Date().toISOString()
    };
    this.products.push(product);
    this.saveToStorage();
    return product;
  }

  // Cart methods
  getCartItems(userId: string): CartItem[] {
    return this.cartItems.filter(item => item.userId === userId);
  }

  addToCart(userId: string, productId: string, quantity: number): CartItem {
    const existingItem = this.cartItems.find(item => 
      item.userId === userId && item.productId === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      const cartItem: CartItem = {
        id: Date.now().toString(),
        userId,
        productId,
        quantity
      };
      this.cartItems.push(cartItem);
    }

    this.saveToStorage();
    return this.cartItems.find(item => 
      item.userId === userId && item.productId === productId
    )!;
  }

  removeFromCart(userId: string, productId: string): boolean {
    const index = this.cartItems.findIndex(item => 
      item.userId === userId && item.productId === productId
    );
    
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      this.saveToStorage();
      return true;
    }
    return false;
  }

  // Wishlist methods
  getWishlistItems(userId: string): WishlistItem[] {
    return this.wishlistItems.filter(item => item.userId === userId);
  }

  addToWishlist(userId: string, productId: string): WishlistItem {
    const existing = this.wishlistItems.find(item => 
      item.userId === userId && item.productId === productId
    );

    if (!existing) {
      const item: WishlistItem = {
        id: Date.now().toString(),
        userId,
        productId
      };
      this.wishlistItems.push(item);
      this.saveToStorage();
      return item;
    }
    return existing;
  }

  removeFromWishlist(userId: string, productId: string): boolean {
    const index = this.wishlistItems.findIndex(item => 
      item.userId === userId && item.productId === productId
    );
    
    if (index !== -1) {
      this.wishlistItems.splice(index, 1);
      this.saveToStorage();
      return true;
    }
    return false;
  }

  // Order methods
  createOrder(orderData: Omit<Order, 'id' | 'createdAt'>): Order {
    const order: Order = {
      id: Date.now().toString(),
      ...orderData,
      createdAt: new Date().toISOString()
    };
    this.orders.push(order);
    this.saveToStorage();
    return order;
  }

  getOrdersByUser(userId: string): Order[] {
    return this.orders.filter(order => order.userId === userId);
  }

  // Review methods
  getReviewsByProduct(productId: string): Review[] {
    return this.reviews.filter(review => review.productId === productId);
  }

  createReview(reviewData: Omit<Review, 'id' | 'createdAt'>): Review {
    const review: Review = {
      id: Date.now().toString(),
      ...reviewData,
      createdAt: new Date().toISOString()
    };
    this.reviews.push(review);
    this.saveToStorage();
    return review;
  }
}

export const mockDB = new MockDatabase();
