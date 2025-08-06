import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'News title is required'],
    trim: true,
    maxlength: [200, 'Title cannot be more than 200 characters']
  },
  description: {
    type: String,
    required: [true, 'News description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  category: {
    type: String,
    required: [true, 'News category is required'],
    enum: ['agriculture', 'health', 'education', 'technology', 'community', 'government']
  },
  date: {
    type: Date,
    default: Date.now
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  author: {
    type: String,
    default: 'RuralConnect Team'
  }
}, {
  timestamps: true
});

export default mongoose.model('News', newsSchema);