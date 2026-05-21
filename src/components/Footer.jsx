// src/components/Footer.jsx

import React from "react";
import {  } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="container mx-auto px-6">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-gray-800">

          {/* Brand */}
          <div>
            <h2 className="text-3xl font-bold mb-4">
              MyStore
            </h2>

            <p className="text-gray-400 leading-7">
              Discover elegant women’s fashion collections designed for
              modern style and everyday confidence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition">
                  Home
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white transition">
                  Shop
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white transition">
                  New Arrivals
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="text-xl font-semibold mb-5">
              Support
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition">
                  FAQs
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white transition">
                  Shipping
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white transition">
                  Returns
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white transition">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-semibold mb-5">
              Stay Updated
            </h3>

            <p className="text-gray-400 mb-4">
              Subscribe for latest fashion trends and exclusive offers.
            </p>

            <div className="flex items-center bg-white rounded-full overflow-hidden">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 text-black outline-none"
              />

            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 gap-6">

          <p className="text-gray-500 text-sm">
            © 2026 MyStore. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            
            <a
              href="#"
              className="bg-white/10 p-3 rounded-full hover:bg-pink-500 transition"
            >
             
            </a>

            <a
              href="#"
              className="bg-white/10 p-3 rounded-full hover:bg-pink-500 transition"
            >
            
            </a>

            <a
              href="#"
              className="bg-white/10 p-3 rounded-full hover:bg-pink-500 transition"
            >
           
            </a>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;