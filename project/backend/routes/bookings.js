import express from 'express';
import { body, validationResult } from 'express-validator';
import Booking from '../models/Booking.js';
import Product from '../models/Product.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// All booking routes require authentication
router.use(authenticateToken);

// Validation middleware for booking creation
const validateBooking = [
  body('items')
    .isArray({ min: 1 })
    .withMessage('Items array is required with at least one item'),
  body('items.*.product')
    .isMongoId()
    .withMessage('Valid product ID is required'),
  body('items.*.quantity')
    .isInt({ min: 1 })
    .withMessage('Quantity must be at least 1'),
  body('totalAmount')
    .isNumeric()
    .isFloat({ min: 0 })
    .withMessage('Total amount must be a positive number')
];

// Create new booking
router.post('/', validateBooking, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { items, totalAmount, deliveryAddress, notes } = req.body;

    // Verify all products exist and are in stock
    const productIds = items.map(item => item.product);
    const products = await Product.find({ _id: { $in: productIds } });
    
    if (products.length !== items.length) {
      return res.status(400).json({ message: 'Some products not found' });
    }

    // Check stock availability and calculate total
    let calculatedTotal = 0;
    const bookingItems = [];

    for (const item of items) {
      const product = products.find(p => p._id.toString() === item.product);
      
      if (!product.inStock) {
        return res.status(400).json({ 
          message: `${product.name} is out of stock` 
        });
      }

      if (product.stockQuantity && product.stockQuantity < item.quantity) {
        return res.status(400).json({ 
          message: `Insufficient stock for ${product.name}. Available: ${product.stockQuantity}` 
        });
      }

      calculatedTotal += product.price * item.quantity;
      
      bookingItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price
      });
    }

    // Verify total amount
    if (Math.abs(calculatedTotal - totalAmount) > 0.01) {
      return res.status(400).json({ 
        message: 'Total amount mismatch. Expected: ' + calculatedTotal 
      });
    }

    // Create booking
    const booking = new Booking({
      user: req.user._id,
      items: bookingItems,
      totalAmount: calculatedTotal,
      deliveryAddress,
      notes
    });

    await booking.save();

    // Update product stock quantities
    for (const item of items) {
      const product = products.find(p => p._id.toString() === item.product);
      if (product.stockQuantity) {
        product.stockQuantity -= item.quantity;
        if (product.stockQuantity === 0) {
          product.inStock = false;
        }
        await product.save();
      }
    }

    // Populate the booking with product details
    await booking.populate('items.product');

    res.status(201).json({
      message: 'Booking created successfully',
      booking
    });
  } catch (error) {
    console.error('Booking creation error:', error);
    res.status(500).json({ 
      message: 'Failed to create booking', 
      error: error.message 
    });
  }
});

// Get user's bookings
router.get('/', async (req, res) => {
  try {
    const { status, limit = 20, page = 1 } = req.query;
    let query = { user: req.user._id };

    if (status && ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'].includes(status)) {
      query.status = status;
    }

    const skip = (page - 1) * limit;
    
    const bookings = await Booking.find(query)
      .populate('items.product')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Booking.countDocuments(query);

    res.json({
      bookings,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ 
      message: 'Failed to fetch bookings', 
      error: error.message 
    });
  }
});

// Get booking by ID
router.get('/:id', async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user._id
    }).populate('items.product');
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(booking);
  } catch (error) {
    console.error('Error fetching booking:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid booking ID' });
    }
    res.status(500).json({ 
      message: 'Failed to fetch booking', 
      error: error.message 
    });
  }
});

// Update booking status (for admin - would need admin auth in production)
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'].includes(status)) {
      return res.status(400).json({ 
        message: 'Invalid status' 
      });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('items.product');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json({
      message: 'Booking status updated successfully',
      booking
    });
  } catch (error) {
    console.error('Error updating booking status:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid booking ID' });
    }
    res.status(500).json({ 
      message: 'Failed to update booking status', 
      error: error.message 
    });
  }
});

// Cancel booking
router.patch('/:id/cancel', async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user._id
    }).populate('items.product');
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (['shipped', 'delivered', 'cancelled'].includes(booking.status)) {
      return res.status(400).json({ 
        message: `Cannot cancel booking with status: ${booking.status}` 
      });
    }

    // Restore product stock quantities
    for (const item of booking.items) {
      const product = await Product.findById(item.product._id);
      if (product) {
        product.stockQuantity += item.quantity;
        product.inStock = true;
        await product.save();
      }
    }

    booking.status = 'cancelled';
    await booking.save();

    res.json({
      message: 'Booking cancelled successfully',
      booking
    });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid booking ID' });
    }
    res.status(500).json({ 
      message: 'Failed to cancel booking', 
      error: error.message 
    });
  }
});

export default router;