# Rural Community Platform - Full Stack Web Application

A comprehensive platform helping rural communities easily find and access essential products like groceries, medicines, and household items.

## 🚀 Features

### ✅ Complete API Endpoints
- **GET /api/services** — List of service types
- **GET /api/products** — List of products with advanced filtering, pagination, and sorting
- **POST /api/auth/register** — User registration
- **POST /api/auth/login** — User login
- **GET /api/news** — Return news headlines
- **POST /api/contact** — Store contact form submissions
- **GET /api/bookings** — Get user bookings
- **POST /api/bookings** — Create new booking

### ✅ Advanced Features
- **Service Booking**: Complete shopping cart system with add/remove products
- **Product Search**: Advanced search with filters by category, name, and stock status
- **User Profile Edit**: Update display name, phone, and other profile information
- **Order Management**: Track orders with status updates (pending → confirmed → processing → shipped → delivered)
- **Responsive Design**: Mobile-friendly interface
- **Security**: JWT authentication, rate limiting, and security headers

## 🛠 Tech Stack

### Frontend
- **React.js** with TypeScript
- **Vite** for development server
- **Tailwind CSS** for styling
- **Axios** for API calls
- **Lucide React** for icons

### Backend
- **Node.js** with Express.js
- **MongoDB Atlas** (Cloud Database)
- **Mongoose** for database modeling
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Express Validator** for input validation
- **Helmet** for security headers
- **Express Rate Limit** for API protection

## 📁 Project Structure

```
rural-community-platform/
├── backend/                 # Node.js backend API
│   ├── routes/             # API route handlers
│   ├── models/             # Database models
│   ├── middleware/         # Custom middleware
│   ├── scripts/            # Database seeding scripts
│   ├── server.js           # Main server file
│   ├── package.json
│   └── .env                # Backend environment variables
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── contexts/       # React contexts (Auth)
│   │   └── utils/          # Utility functions
│   ├── package.json
│   └── .env                # Frontend environment variables
└── README.md
```

## 🔧 Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- Git

### 1. Clone the Repository
```bash
git clone <repository-url>
cd rural-community-platform
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file in backend directory:
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/ruralconnect?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

Seed the database:
```bash
npm run seed
```

Start backend server:
```bash
npm run dev
```

### 3. Frontend Setup

Open new terminal:
```bash
cd frontend
npm install
```

Create `.env` file in frontend directory:
```env
VITE_API_URL=http://localhost:5000
VITE_APP_NAME=RuralConnect
```

Start frontend development server:
```bash
npm run dev
```

## 🌐 Usage

1. **Homepage**: Visit `http://localhost:5173` to see the homepage
2. **Register**: Create a new account using the signup form
3. **Login**: Sign in with your credentials
4. **Browse Products**: Use advanced search and filters
5. **Add to Cart**: Login and add products to your cart
6. **Place Orders**: Complete orders from your dashboard
7. **Track Orders**: View order status in your dashboard
8. **Profile Management**: Edit your profile information

## 🎯 Key Features Implemented

### 🛒 **Shopping Cart System**
- Add/remove products like "bread, butter, etc"
- Quantity management
- Real-time cart updates
- Persistent cart storage

### 🔍 **Advanced Product Search**
- Search by product name and description
- Filter by 8+ categories (groceries, medicines, household, electronics, books, sports, clothing, agriculture)
- Pagination for large catalogs
- Sort by name, price, date
- Stock status filtering

### 👤 **User Profile Management**
- Edit display name and phone number
- Real-time profile updates
- Form validation and error handling

### 📦 **Order Management**
- Complete booking system
- Order status tracking
- Order history with details
- Database persistence

### 🔐 **Security & Performance**
- JWT authentication
- Password hashing with bcrypt
- Rate limiting (100 requests per 15 minutes)
- Security headers with Helmet
- Input validation
- Error handling

### 📱 **Responsive Design**
- Mobile-first approach
- Tailwind CSS styling
- Loading states and animations
- User-friendly interface

## 📊 Database Schema

### Products
- 20+ products across 8 categories
- Stock management
- Price tracking
- Category organization

### Users
- Secure authentication
- Profile management
- Order history

### Bookings/Orders
- Complete order tracking
- Status management
- Item details with quantities

### Services & News
- Dynamic content management
- Category-based organization

## 🚀 Deployment Ready

The application is ready for deployment on:
- **Frontend**: Netlify, Vercel, or any static hosting
- **Backend**: Render, Heroku, or any Node.js hosting
- **Database**: MongoDB Atlas (cloud-ready)

## 📧 Contact

For any questions or support, please contact our development team.

---

**This is a fully functional rural community platform with all requested features implemented and ready for production use!**