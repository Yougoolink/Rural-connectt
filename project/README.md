# Rural Community Platform - Full Stack Web Application

A comprehensive platform helping rural communities easily find and access essential products like groceries, medicines, and household items.

## 🚀 Tech Stack

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

## 📁 Project Structure

```
rural-community-platform/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── contexts/       # React contexts (Auth)
│   │   └── utils/          # Utility functions
│   ├── package.json
│   └── .env                # Frontend environment variables
├── backend/                 # Node.js backend API
│   ├── routes/             # API route handlers
│   ├── models/             # Database models
│   ├── middleware/         # Custom middleware
│   ├── scripts/            # Database seeding scripts
│   ├── server.js           # Main server file
│   ├── package.json
│   └── .env                # Backend environment variables
└── README.md
```

## 🛠 Features Implemented

### Homepage (Frontend)
- ✅ Responsive navbar with logo and navigation
- ✅ Hero section with call-to-action
- ✅ Services section (6+ services with icons)
- ✅ Products section (10+ products with prices)
- ✅ News & Updates section (dynamic content)
- ✅ Contact Us section with form and details
- ✅ Mobile-responsive design

### User Authentication
- ✅ User signup/registration
- ✅ User login/logout
- ✅ JWT-based authentication
- ✅ Password hashing with bcrypt
- ✅ Form validation

### User Dashboard
- ✅ Welcome message with user info
- ✅ Profile editing (name, phone)
- ✅ Shopping cart functionality
- ✅ Order/booking management
- ✅ Order history with status tracking

### Backend API Endpoints
- ✅ `GET /api/services` - List all services
- ✅ `GET /api/products` - List all products with filtering
- ✅ `POST /api/auth/register` - User registration
- ✅ `POST /api/auth/login` - User login
- ✅ `GET /api/news` - Get news headlines
- ✅ `POST /api/contact` - Store contact form submissions
- ✅ `POST /api/bookings` - Create new booking
- ✅ `GET /api/bookings` - Get user bookings

### Bonus Features
- ✅ Shopping cart with add/remove items
- ✅ Product search and category filtering
- ✅ Order status tracking
- ✅ User profile management
- ✅ Responsive design for all screen sizes
- ✅ Loading states and error handling
- ✅ Database seeding script

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
JWT_SECRET=your-super-secret-jwt-key-here
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
4. **Browse Products**: View available products on homepage
5. **Add to Cart**: Login and add products to your cart
6. **Place Orders**: Complete orders from your dashboard
7. **Track Orders**: View order status in your dashboard

## 🧪 Demo Accounts

After running the seed script, you can create your own account or use the registration form.

## 📱 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/verify` - Verify JWT token

### Public Endpoints
- `GET /api/services` - Get all services
- `GET /api/products` - Get all products (with filtering)
- `GET /api/news` - Get news items
- `POST /api/contact` - Submit contact form

### Protected Endpoints (Require Authentication)
- `GET /api/bookings` - Get user's bookings
- `POST /api/bookings` - Create new booking
- `PUT /api/auth/profile` - Update user profile

## 🚀 Deployment

### Frontend (Netlify/Vercel)
1. Build the frontend: `cd frontend && npm run build`
2. Deploy the `dist` folder
3. Set environment variables in deployment platform

### Backend (Render/Heroku)
1. Set environment variables
2. Deploy the backend folder
3. Update CORS_ORIGIN to match frontend URL

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📧 Contact

For any questions or support, please contact our development team.