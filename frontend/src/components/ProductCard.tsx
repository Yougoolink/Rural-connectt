import React from 'react';
import { ShoppingCart, Star } from 'lucide-react';

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  inStock: boolean;
  stockQuantity?: number;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  showAddToCart?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onAddToCart, 
  showAddToCart = true 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
            {product.name}
          </h3>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            product.inStock 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
        
        <p className="text-gray-600 mb-4 text-sm line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-green-600">
            ₹{product.price}
          </span>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-500">4.5</span>
          </div>
        </div>
        
        {product.stockQuantity && product.stockQuantity < 10 && (
          <p className="text-orange-600 text-xs mb-3">
            Only {product.stockQuantity} left in stock!
          </p>
        )}
        
        {showAddToCart && (
          <button 
            onClick={() => onAddToCart(product)}
            disabled={!product.inStock}
            className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;