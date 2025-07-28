import React from 'react';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-amber-900 text-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-amber-500 text-white p-2 rounded-full">
                <span className="text-xl">🧁</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Sweet Dreams Bakery</h3>
                <p className="text-amber-200 text-sm">Freshly baked with love since 1985</p>
              </div>
            </div>
            <p className="text-amber-200 mb-4">
              We're passionate about creating delicious, artisanal baked goods using the finest ingredients. 
              From custom wedding cakes to daily fresh bread, we make every bite special.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-amber-300 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-amber-300 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-amber-300 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 text-amber-300 mt-0.5" />
                <div>
                  <p className="text-amber-200">123 Bakery Street</p>
                  <p className="text-amber-200">Sweet City, SC 12345</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-amber-300" />
                <p className="text-amber-200">(555) 123-CAKE</p>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-amber-300" />
                <p className="text-amber-200">hello@sweetdreamsbakery.com</p>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Hours</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-amber-300" />
                <div>
                  <p className="text-amber-200 font-medium">Monday - Friday</p>
                  <p className="text-amber-300 text-sm">6:00 AM - 9:00 PM</p>
                </div>
              </div>
              <div className="ml-7">
                <p className="text-amber-200 font-medium">Saturday - Sunday</p>
                <p className="text-amber-300 text-sm">7:00 AM - 10:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-amber-800 mt-8 pt-8 text-center">
          <p className="text-amber-300 text-sm">
            © 2024 Sweet Dreams Bakery. All rights reserved. Made with ❤️ and lots of flour.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;