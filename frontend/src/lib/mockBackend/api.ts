const API_URL = import.meta.env.VITE_API_URL || '/api';

// Helper to get JWT token
const getToken = () => localStorage.getItem('token');

// Helper for fetch with auth
const fetchWithAuth = (url: string, options: RequestInit = {}) => {
  const token = getToken();
  return fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
};

// Auth APIs
export const authAPI = {
  async signup(name: string, email: string, password: string) {
    const res = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    return res.json();
  },
  async login(email: string, password: string) {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.token) localStorage.setItem('token', data.token);
    return data;
  },
  async logout() {
    localStorage.removeItem('token');
    return { success: true, message: 'Logged out successfully' };
  },
  async getCurrentUser() {
    const res = await fetchWithAuth(`${API_URL}/auth/me`);
    return res.json();
  },
  async updateProfile(profile: any) {
    const res = await fetchWithAuth(`${API_URL}/auth/profile`, {
      method: 'PUT',
      body: JSON.stringify(profile),
    });
    return res.json();
  },
};

// Product APIs
export const productAPI = {
  async getProducts(params: any = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_URL}/products${query ? `?${query}` : ''}`);
    return res.json();
  },
  async getProductById(id: string) {
    const res = await fetch(`${API_URL}/products/${id}`);
    return res.json();
  },
  async createProduct(product: any) {
    const res = await fetchWithAuth(`${API_URL}/products`, {
      method: 'POST',
      body: JSON.stringify(product),
    });
    return res.json();
  },
  async updateProduct(id: string, product: any) {
    const res = await fetchWithAuth(`${API_URL}/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(product),
    });
    return res.json();
  },
  async deleteProduct(id: string) {
    const res = await fetchWithAuth(`${API_URL}/products/${id}`, {
      method: 'DELETE' });
    return res.json();
  },
  async getCategories() {
    const res = await fetch(`${API_URL}/products/categories`);
    return res.json();
  },
};

// Cart APIs
export const cartAPI = {
  async getCartItems() {
    const res = await fetchWithAuth(`${API_URL}/cart`);
    return res.json();
  },
  async addToCart(productId: string, quantity: number = 1) {
    const res = await fetchWithAuth(`${API_URL}/cart/add`, {
      method: 'POST',
      body: JSON.stringify({ productId, quantity }),
    });
    return res.json();
  },
  async updateCartItem(productId: string, quantity: number) {
    const res = await fetchWithAuth(`${API_URL}/cart/update/${productId}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    });
    return res.json();
  },
  async removeFromCart(productId: string) {
    const res = await fetchWithAuth(`${API_URL}/cart/remove/${productId}`, {
      method: 'DELETE',
    });
    return res.json();
  },
  async clearCart() {
    const res = await fetchWithAuth(`${API_URL}/cart/clear`, {
      method: 'DELETE',
    });
    return res.json();
  },
};

// Wishlist APIs
export const wishlistAPI = {
  async getWishlistItems() {
    const res = await fetchWithAuth(`${API_URL}/wishlist`);
    return res.json();
  },
  async addToWishlist(productId: string) {
    const res = await fetchWithAuth(`${API_URL}/wishlist/add`, {
      method: 'POST',
      body: JSON.stringify({ productId }),
    });
    return res.json();
  },
  async removeFromWishlist(productId: string) {
    const res = await fetchWithAuth(`${API_URL}/wishlist/remove/${productId}`, {
      method: 'DELETE',
    });
    return res.json();
  },
  async clearWishlist() {
    const res = await fetchWithAuth(`${API_URL}/wishlist/clear`, {
      method: 'DELETE',
    });
    return res.json();
  },
};

// Order APIs
export const orderAPI = {
  async getUserOrders() {
    const res = await fetchWithAuth(`${API_URL}/orders`);
    return res.json();
  },
  async getOrderById(orderId: string) {
    const res = await fetchWithAuth(`${API_URL}/orders/${orderId}`);
    return res.json();
  },
  async createOrder(orderData: any) {
    const res = await fetchWithAuth(`${API_URL}/orders/create`, {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
    return res.json();
  },
  async cancelOrder(orderId: string) {
    const res = await fetchWithAuth(`${API_URL}/orders/${orderId}/cancel`, {
      method: 'PUT',
    });
    return res.json();
  },
};

// Review APIs
export const reviewAPI = {
  async getProductReviews(productId: string) {
    const res = await fetch(`${API_URL}/reviews/product/${productId}`);
    return res.json();
  },
  async createReview(productId: string, rating: number, comment: string) {
    const res = await fetchWithAuth(`${API_URL}/reviews/product/${productId}`, {
      method: 'POST',
      body: JSON.stringify({ rating, comment }),
    });
    return res.json();
  },
  async updateReview(reviewId: string, rating: number, comment: string) {
    const res = await fetchWithAuth(`${API_URL}/reviews/${reviewId}`, {
      method: 'PUT',
      body: JSON.stringify({ rating, comment }),
    });
    return res.json();
  },
  async deleteReview(reviewId: string) {
    const res = await fetchWithAuth(`${API_URL}/reviews/${reviewId}`, {
      method: 'DELETE',
    });
    return res.json();
  },
};

// Payment simulation
export const paymentAPI = {
  async processPayment(amount: number, paymentMethod: string): Promise<ApiResponse<any>> {
    await delay(2000); // Simulate payment processing
    
    // Simulate random success/failure for demo
    const success = Math.random() > 0.1; // 90% success rate
    
    if (success) {
      return {
        success: true,
        message: 'Payment processed successfully',
        data: {
          transactionId: `txn_${Date.now()}`,
          amount,
          paymentMethod,
          status: 'completed'
        }
      };
    } else {
      return {
        success: false,
        message: 'Payment failed. Please try again.',
        data: null as any
      };
    }
  }
};
