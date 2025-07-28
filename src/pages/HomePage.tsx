import React from 'react';
import { ArrowRight, Star, Cake, Cookie, Heading as Bread2, ShoppingBag } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

interface HomePageProps {
  onPageChange: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onPageChange }) => {
  const { addToCart } = useCart();
  const featuredProducts = products.slice(0, 3);

  const handleAddToCart = (product: typeof products[0]) => {
    addToCart(product);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-amber-50 to-orange-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium">
                <Star className="w-4 h-4 fill-current" />
                <span>Est. 1985 - Award Winning Bakery</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Fresh Baked
                <span className="text-amber-600 block">Every Day</span>
              </h1>
              
              <p className="text-xl text-gray-600 max-w-lg">
                Indulge in our artisanal breads, decadent cakes, and freshly baked pastries made with love and the finest ingredients.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => onPageChange('catalog')}
                  className="flex items-center justify-center space-x-2 bg-amber-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-amber-600 transition-colors"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Shop Now</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                
                <button
                  onClick={() => onPageChange('custom-order')}
                  className="flex items-center justify-center space-x-2 border-2 border-amber-500 text-amber-600 px-8 py-4 rounded-lg font-semibold hover:bg-amber-50 transition-colors"
                >
                  <Cake className="w-5 h-5" />
                  <span>Custom Orders</span>
                </button>
              </div>
            </div>
            
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/264939/pexels-photo-264939.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Fresh baked goods"
                className="rounded-2xl shadow-2xl w-full h-96 object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-gray-600 font-medium">500+ Happy Customers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Specialties</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our wide range of freshly baked goods, from artisanal breads to custom celebration cakes.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Cake, title: 'Custom Cakes', desc: 'Wedding, birthday, and special occasion cakes', page: 'catalog' },
              { icon: Cookie, title: 'Fresh Cookies', desc: 'Daily baked cookies in various flavors', page: 'catalog' },
              { icon: Bread2, title: 'Artisan Breads', desc: 'Sourdough, whole wheat, and specialty breads', page: 'catalog' }
            ].map((category, index) => (
              <div
                key={index}
                onClick={() => onPageChange(category.page)}
                className="group bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-2xl hover:shadow-lg transition-all duration-300 cursor-pointer border border-amber-100 hover:border-amber-200"
              >
                <div className="bg-amber-500 text-white p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <category.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{category.title}</h3>
                <p className="text-gray-600 mb-4">{category.desc}</p>
                <div className="flex items-center text-amber-600 font-semibold group-hover:translate-x-2 transition-transform">
                  <span>Explore</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-xl text-gray-600">Our most popular items, loved by customers every day</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow">
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    ${product.price}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                      <span className="text-sm text-gray-500 ml-2">(4.9)</span>
                    </div>
                    
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-amber-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-amber-600 transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button
              onClick={() => onPageChange('catalog')}
              className="bg-amber-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors"
            >
              View All Products
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah Johnson', text: 'The wedding cake was absolutely perfect! Everyone loved it and it tasted as amazing as it looked.', rating: 5 },
              { name: 'Mike Chen', text: 'Best sourdough bread in town. I come here every weekend for their fresh loaves.', rating: 5 },
              { name: 'Emily Davis', text: 'Custom birthday cake exceeded my expectations. My daughter was thrilled!', rating: 5 }
            ].map((testimonial, index) => (
              <div key={index} className="bg-amber-50 p-6 rounded-xl border border-amber-100">
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <p className="font-semibold text-gray-900">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;