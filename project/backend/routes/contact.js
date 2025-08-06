import express from 'express';
import { body, validationResult } from 'express-validator';
import Contact from '../models/Contact.js';

const router = express.Router();

// Validation middleware for contact form
const validateContact = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('message')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Message must be between 10 and 1000 characters')
];

// Submit contact form
router.post('/', validateContact, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { name, message } = req.body;

    const contact = new Contact({
      name: name.trim(),
      message: message.trim()
    });

    await contact.save();

    res.status(201).json({
      message: 'Contact form submitted successfully',
      contactId: contact._id
    });
  } catch (error) {
    console.error('Contact form submission error:', error);
    res.status(500).json({ 
      message: 'Failed to submit contact form', 
      error: error.message 
    });
  }
});

// Get all contact messages (admin route - would need admin auth in production)
router.get('/', async (req, res) => {
  try {
    const { status, limit = 50 } = req.query;
    let query = {};

    if (status && ['new', 'read', 'replied'].includes(status)) {
      query.status = status;
    }

    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));
    
    res.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ 
      message: 'Failed to fetch contacts', 
      error: error.message 
    });
  }
});

// Get contact by ID
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.json(contact);
  } catch (error) {
    console.error('Error fetching contact:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid contact ID' });
    }
    res.status(500).json({ 
      message: 'Failed to fetch contact', 
      error: error.message 
    });
  }
});

// Update contact status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['new', 'read', 'replied'].includes(status)) {
      return res.status(400).json({ 
        message: 'Invalid status. Must be: new, read, or replied' 
      });
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.json({
      message: 'Contact status updated successfully',
      contact
    });
  } catch (error) {
    console.error('Error updating contact status:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid contact ID' });
    }
    res.status(500).json({ 
      message: 'Failed to update contact status', 
      error: error.message 
    });
  }
});

export default router;