import React, { useState } from 'react';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Truck, Store } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

interface CartPageProps {
  onPageChange: (page: string) => void;
}

const CartPage: React.FC<CartPageProps> = ({ onPageChange }) => {
  const { items, updateQuantity, removeFromCart, getTotal, clearCart } = useCart();
  const { user } = useAuth();
  const [orderType, setOrderType] = useState<'pickup' | 'delivery'>('pickup');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);

  const subtotal = getTotal();
  const deliveryFee = orderType === 'delivery' ? 5.99 : 0;
  const tax = subtotal * 0.08; // 8% tax
  const discount = appliedCoupon ? (subtotal * appliedCoupon.discount / 100) : 0;
  const total = subtotal + deliveryFee + tax - discount;

  const handleQuantityUpdate = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const applyCoupon = () => {
    // Mock coupon validation
    const validCoupons = [
      { code: 'SWEET10', discount: 10 },
      { code: 'NEWBIE15', discount: 15 },
      { code: 'LOYALTY20', discount: 20 }
    ];
    
    const coupon = validCoupons.find(c => c.code === couponCode.toUpperCase());
    if (coupon) {
      setAppliedCoupon(coupon);
      setCouponCode('');
    } else {
      alert('Invalid coupon code');
    }
  };

  const proceedToCheckout = () => {
    if (!user) {
      onPageChange('login');
      return;
    }
    
    if (orderType === 'delivery' && !deliveryAddress) {
      alert('Please enter delivery address');
      return;
    }
    
    // In a real app, this would create an order and redirect to payment
    alert('Order placed successfully! Redirecting to payment...');
    clearCart();
    onPageChange('home');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-8" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-xl text-gray-600 mb-8">Add some delicious items to get started!</p>
            <button
              onClick={() => onPageChange('catalog')}
              className="bg-amber-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors"
            >
              Browse Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => onPageChange('catalog')}
            className="flex items-center space-x-2 text-amber-600 hover:text-amber-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Continue Shopping</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900 ml-8">Shopping Cart</h1>
          <span className="ml-4 bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
            {items.length} item{items.length !== 1 ? 's' : ''}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Cart Items</h2>
                  <button
                    onClick={clearCart}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                {items.map((item) => (
                  <div key={`${item.product.id}-${JSON.stringify(item.customizations)}`} className="p-6">
                    <div className="flex items-start space-x-4">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{item.product.name}</h3>
                        <p className="text-gray-600 text-sm mt-1">{item.product.description}</p>
                        
                        {item.customizations && item.customizations.length > 0 && (
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">Customizations:</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {item.customizations.map((customization, index) => (
                                <span key={index} className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded">
                                  {customization}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => handleQuantityUpdate(item.product.id, item.quantity - 1)}
                              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="font-semibold text-lg px-3">{item.quantity}</span>
                            <button
                              onClick={() => handleQuantityUpdate(item.product.id, item.quantity + 1)}
                              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          
                          <div className="flex items-center space-x-4">
                            <span className="text-lg font-semibold text-gray-900">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </span>
                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Order Type */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Type</h3>
              <div className="space-y-3">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="orderType"
                    value="pickup"
                    checked={orderType === 'pickup'}
                    onChange={(e) => setOrderType(e.target.value as 'pickup')}
                    className="text-amber-600 focus:ring-amber-500"
                  />
                  <Store className="w-5 h-5 text-gray-600" />
                  <span className="font-medium">Store Pickup (Free)</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="orderType"
                    value="delivery"
                    checked={orderType === 'delivery'}
                    onChange={(e) => setOrderType(e.target.value as 'delivery')}
                    className="text-amber-600 focus:ring-amber-500"
                  />
                  <Truck className="w-5 h-5 text-gray-600" />
                  <span className="font-medium">Delivery ($5.99)</span>
                </label>
              </div>

              {orderType === 'delivery' && (
                <div className="mt-4 space-y-3">
                  <input
                    type="text"
                    placeholder="Delivery Address"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="date"
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                    <select
                      value={deliveryTime}
                      onChange={(e) => setDeliveryTime(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    >
                      <option value="">Select Time</option>
                      <option value="9:00-11:00">9:00 AM - 11:00 AM</option>
                      <option value="11:00-13:00">11:00 AM - 1:00 PM</option>
                      <option value="13:00-15:00">1:00 PM - 3:00 PM</option>
                      <option value="15:00-17:00">3:00 PM - 5:00 PM</option>
                      <option value="17:00-19:00">5:00 PM - 7:00 PM</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Coupon */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Coupon Code</h3>
              {appliedCoupon ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-green-800 font-medium">{appliedCoupon.code}</span>
                    <span className="text-green-600">-{appliedCoupon.discount}%</span>
                  </div>
                  <button
                    onClick={() => setAppliedCoupon(null)}
                    className="text-green-600 text-sm hover:underline mt-1"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                  <button
                    onClick={applyCoupon}
                    className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
                  >
                    Apply
                  </button>
                </div>
              )}
              <p className="text-xs text-gray-500 mt-2">
                Try: SWEET10, NEWBIE15, or LOYALTY20
              </p>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                {orderType === 'delivery' && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="font-medium">${deliveryFee.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (8%)</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({appliedCoupon.discount}%)</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={proceedToCheckout}
                className="w-full mt-6 bg-amber-500 text-white py-4 px-6 rounded-lg font-semibold hover:bg-amber-600 transition-colors"
              >
                {user ? 'Proceed to Checkout' : 'Login to Checkout'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;