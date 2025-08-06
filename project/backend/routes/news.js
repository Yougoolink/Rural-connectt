import express from 'express';
import News from '../models/News.js';

const router = express.Router();

// Get all published news
router.get('/', async (req, res) => {
  try {
    const { category, limit = 10 } = req.query;
    let query = { isPublished: true };

    if (category && category !== 'all') {
      query.category = category;
    }

    const news = await News.find(query)
      .sort({ date: -1 })
      .limit(parseInt(limit));
    
    res.json(news);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ message: 'Failed to fetch news', error: error.message });
  }
});

// Get news by ID
router.get('/:id', async (req, res) => {
  try {
    const newsItem = await News.findById(req.params.id);
    
    if (!newsItem) {
      return res.status(404).json({ message: 'News item not found' });
    }

    if (!newsItem.isPublished) {
      return res.status(404).json({ message: 'News item not available' });
    }

    res.json(newsItem);
  } catch (error) {
    console.error('Error fetching news item:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid news ID' });
    }
    res.status(500).json({ message: 'Failed to fetch news item', error: error.message });
  }
});

// Get news by category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const { limit = 10 } = req.query;
    
    const news = await News.find({ 
      category: category.toLowerCase(),
      isPublished: true 
    })
    .sort({ date: -1 })
    .limit(parseInt(limit));
    
    res.json(news);
  } catch (error) {
    console.error('Error fetching news by category:', error);
    res.status(500).json({ message: 'Failed to fetch news', error: error.message });
  }
});

export default router;