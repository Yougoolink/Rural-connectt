@@ .. @@
 import express from 'express';
 import mongoose from 'mongoose';
 import cors from 'cors';
 import dotenv from 'dotenv';
+import helmet from 'helmet';
+import rateLimit from 'express-rate-limit';

 // Import routes
 import authRoutes from './routes/auth.js';
@@ .. @@
 const app = express();
 const PORT = process.env.PORT || 5000;

+// Rate limiting
+const limiter = rateLimit({
+  windowMs: 15 * 60 * 1000, // 15 minutes
+  max: 100, // limit each IP to 100 requests per windowMs
+  message: 'Too many requests from this IP, please try again later.'
+});
+
 // Middleware
+app.use(helmet());
+app.use(limiter);
 app.use(cors({
   origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
   credentials: true
 }));
 app.use(express.json());
 app.use(express.urlencoded({ extended: true }));

+// Request logging middleware
+app.use((req, res, next) => {
+  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
+  next();
+});
+
 // Routes
 app.use('/api/auth', authRoutes);
 app.use('/api/services', serviceRoutes);
@@ .. @@
 // Health check route
 app.get('/api/health', (req, res) => {
-  res.json({ status: 'OK', message: 'Rural Community API is running' });
+  res.json({ 
+    status: 'OK', 
+    message: 'Rural Community API is running',
+    timestamp: new Date().toISOString(),
+    version: '1.0.0'
+  });
 });

 // Error handling middleware