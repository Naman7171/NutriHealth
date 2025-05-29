
# 🛍️ Health Supplements E-Commerce Platform

A modern full-stack e-commerce web application for browsing, purchasing, and managing health supplement products. Built with a React frontend and an Express + MongoDB backend, the project is designed with 2025 UI/UX standards, mobile responsiveness, and accessibility in mind.

---

## 🔧 Tech Stack

### Frontend (`/frontend`)
- **React 18** + **TypeScript**
- **Vite** for fast builds
- **Tailwind CSS** for styling
- **Zustand** for state management
- **React Router** for navigation
- **Voice-enabled search**
- **Light/Dark Mode** toggle
- **Skeleton Loaders**, **Lazy Loading**, and **Micro-interactions**

### Backend (`/backend`)
- **Node.js + Express.js**
- **MongoDB + Mongoose**
- **JWT Authentication**
- **bcryptjs** for password hashing
- **Role-based access control (User/Admin)**
- **RESTful APIs**
- **MVC architecture**

---

## ✅ Features

### 👤 User Features
- Signup/Login with JWT
- View and search products with filters
- Add to cart and wishlist
- View product details with image galleries
- Checkout with dummy payment flow
- Leave product reviews and ratings
- View order history and manage profile

### 🛒 Admin Features
- Admin Dashboard (protected routes)
- Full CRUD for products
- Manage orders and customers
- View sales analytics (basic)

### 🌐 UI/UX Highlights
- Neumorphic/minimalist design
- Fully responsive across all devices
- Accessibility compliant (WCAG 2.2)
- Voice search support
- Smooth transitions and animations
- Lazy loading and skeleton screens

---

## 📂 Project Structure

```
root/
├── frontend/           # React frontend
│   ├── src/
│   ├── public/
│   └── vite.config.ts
├── backend/            # Node.js backend
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── .env.example
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/health-supplements-store.git
cd health-supplements-store
```

### 2. Setup Backend
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

### 3. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 🔑 Environment Variables (`/backend/.env`)
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

---

## 📦 APIs Available

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/cart`
- `POST /api/orders`
- `GET /api/wishlist`
- (More in backend documentation)

---

## 🧪 Testing (Coming Soon)
- Unit tests for backend APIs
- Integration tests
- Frontend component testing with Vitest/React Testing Library

---

## 📈 Roadmap

- [x] Product listing, cart, and checkout
- [x] JWT authentication system
- [x] Admin panel with product CRUD
- [ ] Stripe integration
- [ ] Email notifications
- [ ] Full test coverage

---

## 👨‍💻 Contributing

1. Fork this repo
2. Create your branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m "Add feature"`
4. Push and create a PR

---

## 📃 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙌 Acknowledgements

Made with ❤️ using React, Express, MongoDB and the power of Cursor.AI
