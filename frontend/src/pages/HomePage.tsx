import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, Phone, Mail, MapPin, Truck, Heart, Shield, Clock, Users, Package, Star, Calendar, TrendingUp } from 'lucide-react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import LoadingSpinner from '../components/LoadingSpinner';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

interface Service {
  _id: string;
  name: string;
  description: string;
  icon: string;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  inStock: boolean;
  stockQuantity?: number;
}

interface NewsItem {
  _id: string;
  title: string;
  description: string;
  date: string;
  category: string;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [services, setServices] = useState<Service[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [contactForm, setContactForm] = useState({ name: '', message: '' });
  const [submitStatus, setSubmitStatus] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [searchTerm, selectedCategory]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [servicesRes, productsRes, newsRes] = await Promise.all([
        axios.get('/api/services'),
        axios.get('/api/products?limit=8'),
        axios.get('/api/news?limit=4')
      ]);
      
      setServices(servicesRes.data);
      setProducts(productsRes.data.products || productsRes.data);
      setNews(newsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const params = new URLSearchParams({
        limit: '8',
        ...(searchTerm && { search: searchTerm }),
        ...(selectedCategory !== 'all' && { category: selectedCategory })
      });

      const response = await axios.get(`/api/products?${params}`);
      setProducts(response.data.products || response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/contact', contactForm);
      setSubmitStatus('success');
      setContactForm({ name: '', message: '' });
      setTimeout(() => setSubmitStatus(''), 3000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(''), 3000);
    }
  };

  const handleAddToCart = (product: Product) => {
    // For non-logged in users, redirect to signup
    onNavigate('signup');
  };

  const categories = ['all', 'groceries', 'medicines', 'household', 'electronics', 'books', 'sports', 'clothing', 'agriculture'];

  const getIcon = (iconName: string) => {
    const icons = {
      truck: Truck,
      heart: Heart,
      shield: Shield,
      clock: Clock,
      users: Users,
      package: Package
    };
    return icons[iconName as keyof typeof icons] || Package;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fadeIn">
              Connecting Rural Communities
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-green-100 max-w-3xl mx-auto">
              Easy access to essential products, groceries, medicines, and services for rural communities across the country.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => onNavigate('signup')}
                className="bg-white text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-all duration-200 hover:scale-105 shadow-lg"
              >
                Get Started Today
              </button>
              <button 
                onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-700 transition-all duration-200 hover:scale-105"
              >
                Browse Products
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive services designed to meet the unique needs of rural communities
            </p>
          </div>
          
          {loading ? (
            <div className="flex justify-center">
              <LoadingSpinner text="Loading services..." />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => {
                const Icon = getIcon(service.icon);
                return (
                  <div key={service._id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-green-100">
                    <div className="flex items-center mb-4">
                      <div className="bg-green-100 p-3 rounded-lg mr-4">
                        <Icon className="h-6 w-6 text-green-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">{service.name}</h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{service.description}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Available Products</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Quality products delivered directly to your doorstep in rural areas
            </p>
          </div>

          {/* Search and Filter */}
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            categories={categories}
          />

          {loading ? (
            <div className="flex justify-center py-8">
              <LoadingSpinner text="Loading products..." />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          )}

          {products.length === 0 && !loading && (
            <div className="text-center py-8">
              <p className="text-gray-500">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* News Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">News & Updates</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stay informed about the latest developments in rural community services
            </p>
          </div>
          
          {loading ? (
            <div className="flex justify-center">
              <LoadingSpinner text="Loading news..." />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.map((item) => (
                <div key={item._id} className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center mb-3">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                      {item.category}
                    </span>
                    <span className="ml-3 text-sm text-gray-500">
                      {new Date(item.date).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                  <div className="mt-4 flex items-center text-green-600 hover:text-green-700 cursor-pointer">
                    <span className="text-sm font-medium">Read more</span>
                    <TrendingUp className="h-4 w-4 ml-1" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get in touch with our team. We're here to help rural communities thrive.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <MapPin className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Our Address</h3>
                  <p className="text-gray-600">
                    Rural Connect Head Office<br />
                    123 Community Street<br />
                    Rural Development Hub<br />
                    Bangalore, Karnataka 560001
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Phone className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Helpline</h3>
                  <p className="text-gray-600">
                    24/7 Support: <span className="font-semibold">+91-1800-123-4567</span><br />
                    WhatsApp: <span className="font-semibold">+91-9876-543-210</span>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Mail className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Support</h3>
                  <p className="text-gray-600">
                    General: support@ruralconnect.in<br />
                    Emergency: emergency@ruralconnect.in
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="How can we help you?"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors duration-200 font-semibold"
                >
                  Send Message
                </button>
                
                {submitStatus === 'success' && (
                  <div className="text-green-600 text-center">Message sent successfully!</div>
                )}
                {submitStatus === 'error' && (
                  <div className="text-red-600 text-center">Failed to send message. Please try again.</div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;