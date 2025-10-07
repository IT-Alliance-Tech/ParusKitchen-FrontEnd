import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, Phone, Mail, MapPin, Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <ChefHat className="h-8 w-8 text-beige-300" />
              <span className="font-poppins font-bold text-xl">Paru's Kitchen</span>
            </div>
            <p className="font-lato text-beige-100 text-sm leading-relaxed">
              Fresh, homemade meals delivered daily in Bangalore. Cooked with love by experienced mothers 
              who understand the importance of healthy, hygienic food.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-poppins font-semibold text-lg">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: 'How It Works', href: '/how-it-works' },
                { name: 'Menu', href: '/menu' },
                { name: 'Subscription Plans', href: '/subscription' },
                { name: 'About Us', href: '/about' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="font-lato text-beige-100 hover:text-beige-300 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-poppins font-semibold text-lg">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-beige-300" />
                <span className="font-lato text-beige-100">+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-beige-300" />
                <span className="font-lato text-beige-100">hello@paruskitchen.com</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-beige-300 mt-0.5" />
                <span className="font-lato text-beige-100 text-sm">
                  Koramangala, Bangalore<br />Karnataka 560034
                </span>
              </li>
            </ul>
          </div>

          {/* Service Hours */}
          <div className="space-y-4">
            <h3 className="font-poppins font-semibold text-lg">Service Hours</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-beige-300" />
                <span className="font-lato text-beige-100 text-sm">Mon - Sat: 7:00 AM - 9:00 PM</span>
              </li>
              <li className="flex items-center space-x-2 ml-6">
                <span className="font-lato text-beige-100 text-sm">Sunday: 8:00 AM - 6:00 PM</span>
              </li>
            </ul>
            <div className="pt-4">
              <Link
                to="/subscription"
                className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-poppins font-medium text-sm transition-colors duration-200"
              >
                Start Your Subscription
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-700 mt-8 pt-8 text-center">
          <p className="font-lato text-beige-100 text-sm">
            © 2025 Paru's Kitchen. All rights reserved. Made with ❤️ in Bangalore.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
