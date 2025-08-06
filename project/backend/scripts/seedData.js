import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Service from '../models/Service.js';
import Product from '../models/Product.js';
import News from '../models/News.js';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

const seedServices = async () => {
  const services = [
    {
      name: 'Home Delivery',
      description: 'Fast and reliable delivery of essential products directly to your doorstep in rural areas.',
      icon: 'truck'
    },
    {
      name: 'Healthcare Support',
      description: 'Access to medicines, health consultations, and medical supplies for rural communities.',
      icon: 'heart'
    },
    {
      name: 'Quality Assurance',
      description: 'All products are quality-checked and guaranteed to meet safety standards.',
      icon: 'shield'
    },
    {
      name: '24/7 Support',
      description: 'Round-the-clock customer support to help with your orders and inquiries.',
      icon: 'clock'
    },
    {
      name: 'Community Connect',
      description: 'Connecting rural communities with local businesses and service providers.',
      icon: 'users'
    },
    {
      name: 'Bulk Orders',
      description: 'Special pricing and arrangements for bulk orders for communities and groups.',
      icon: 'package'
    }
  ];

  await Service.deleteMany({});
  await Service.insertMany(services);
  console.log('✅ Services seeded successfully');
};

const seedProducts = async () => {
  const products = [
    // Groceries
    {
      name: 'Rice (5kg)',
      description: 'Premium quality basmati rice, perfect for daily meals.',
      price: 450,
      category: 'groceries',
      inStock: true,
      stockQuantity: 100
    },
    {
      name: 'Wheat Flour (10kg)',
      description: 'Fresh ground wheat flour for making rotis and bread.',
      price: 380,
      category: 'groceries',
      inStock: true,
      stockQuantity: 80
    },
    {
      name: 'Cooking Oil (1L)',
      description: 'Refined sunflower oil for healthy cooking.',
      price: 120,
      category: 'groceries',
      inStock: true,
      stockQuantity: 150
    },
    {
      name: 'Sugar (1kg)',
      description: 'Pure white sugar for your daily needs.',
      price: 45,
      category: 'groceries',
      inStock: true,
      stockQuantity: 200
    },
    {
      name: 'Tea Powder (250g)',
      description: 'Premium quality tea leaves for the perfect cup.',
      price: 85,
      category: 'groceries',
      inStock: true,
      stockQuantity: 120
    },
    {
      name: 'Onions (2kg)',
      description: 'Fresh onions sourced directly from local farms.',
      price: 60,
      category: 'groceries',
      inStock: true,
      stockQuantity: 90
    },

    // Medicines
    {
      name: 'Paracetamol Tablets',
      description: 'Pain relief and fever reducer tablets (10 tablets).',
      price: 25,
      category: 'medicines',
      inStock: true,
      stockQuantity: 300
    },
    {
      name: 'Antiseptic Solution',
      description: 'Dettol antiseptic liquid for wound cleaning (100ml).',
      price: 65,
      category: 'medicines',
      inStock: true,
      stockQuantity: 50
    },
    {
      name: 'Bandages',
      description: 'Medical bandages for wound care and first aid.',
      price: 35,
      category: 'medicines',
      inStock: true,
      stockQuantity: 75
    },

    // Household
    {
      name: 'Soap (4 pack)',
      description: 'Antibacterial soap bars for daily hygiene.',
      price: 80,
      category: 'household',
      inStock: true,
      stockQuantity: 100
    },
    {
      name: 'Detergent Powder (1kg)',
      description: 'Effective detergent powder for washing clothes.',
      price: 150,
      category: 'household',
      inStock: true,
      stockQuantity: 70
    },
    {
      name: 'Toothpaste',
      description: 'Fluoride toothpaste for complete oral care.',
      price: 45,
      category: 'household',
      inStock: true,
      stockQuantity: 85
    }
  ];

  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log('✅ Products seeded successfully');
};

const seedNews = async () => {
  const news = [
    {
      title: 'New Healthcare Initiative Launched for Rural Areas',
      description: 'Government announces comprehensive healthcare program to provide better medical access to rural communities across the state.',
      category: 'health',
      date: new Date('2024-12-15'),
      author: 'Health Ministry'
    },
    {
      title: 'Digital Literacy Program Reaches 500+ Villages',
      description: 'Rural Connect partners with local NGOs to bring digital education and technology awareness to remote villages.',
      category: 'technology',
      date: new Date('2024-12-10'),
      author: 'RuralConnect Team'
    },
    {
      title: 'Agricultural Subsidy Program Extended',
      description: 'Farmers can now access subsidized seeds and fertilizers through our platform with government partnership.',
      category: 'agriculture',
      date: new Date('2024-12-08'),
      author: 'Agriculture Department'
    },
    {
      title: 'Community Water Project Completed in 50 Villages',
      description: 'Clean water access improved significantly with the completion of bore wells and water purification systems.',
      category: 'community',
      date: new Date('2024-12-05'),
      author: 'Rural Development Authority'
    }
  ];

  await News.deleteMany({});
  await News.insertMany(news);
  console.log('✅ News seeded successfully');
};

const seedDatabase = async () => {
  try {
    await connectDB();
    
    console.log('🌱 Starting database seeding...');
    
    await seedServices();
    await seedProducts();
    await seedNews();
    
    console.log('🎉 Database seeding completed successfully!');
    
    mongoose.disconnect();
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();