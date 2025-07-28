import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import CatalogPage from './pages/CatalogPage';
import CartPage from './pages/CartPage';
import AdminPage from './pages/AdminPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onPageChange={setCurrentPage} />;
      case 'login':
        return <LoginPage onPageChange={setCurrentPage} />;
      case 'catalog':
        return <CatalogPage onPageChange={setCurrentPage} />;
      case 'cart':
        return <CartPage onPageChange={setCurrentPage} />;
      case 'admin':
        return <AdminPage onPageChange={setCurrentPage} />;
      case 'custom-order':
        return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Custom Orders</h1>
            <p className="text-gray-600 mb-6">This feature is coming soon!</p>
            <button
              onClick={() => setCurrentPage('home')}
              className="bg-amber-500 text-white px-6 py-3 rounded-lg hover:bg-amber-600 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>;
      case 'about':
        return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">About Us</h1>
            <p className="text-gray-600 mb-6">Learn more about Sweet Dreams Bakery!</p>
            <button
              onClick={() => setCurrentPage('home')}
              className="bg-amber-500 text-white px-6 py-3 rounded-lg hover:bg-amber-600 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>;
      case 'contact':
        return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h1>
            <p className="text-gray-600 mb-6">Get in touch with our bakery!</p>
            <button
              onClick={() => setCurrentPage('home')}
              className="bg-amber-500 text-white px-6 py-3 rounded-lg hover:bg-amber-600 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>;
      case 'profile':
        return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">User Profile</h1>
            <p className="text-gray-600 mb-6">Manage your account settings and order history.</p>
            <button
              onClick={() => setCurrentPage('home')}
              className="bg-amber-500 text-white px-6 py-3 rounded-lg hover:bg-amber-600 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>;
      default:
        return <HomePage onPageChange={setCurrentPage} />;
    }
  };

  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen bg-gray-50">
          <Header currentPage={currentPage} onPageChange={setCurrentPage} />
          <main>{renderPage()}</main>
          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;