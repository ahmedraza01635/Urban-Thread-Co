// src/components/Hero.jsx

import React from "react";

const Hero = () => {
  return (
    <section className="bg-[#fdf6f2]">
      <div className="container mx-auto px-6 py-16 md:py-24 flex flex-col-reverse md:flex-row items-center gap-12">

        {/* Left Content */}
        <div className="flex-1 text-center md:text-left">
          <p className="uppercase tracking-[4px] text-sm text-pink-500 mb-4">
            New Fashion Collection
          </p>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-gray-900">
            Discover Your <br />
            Perfect Style
          </h1>

          <p className="text-gray-600 mt-6 max-w-lg">
            Explore trendy women’s fashion including dresses, tops,
            handbags, accessories, and more designed for modern elegance.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            
            <button className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition">
              Shop Now
            </button>

            <button className="border border-black px-8 py-3 rounded-full hover:bg-black hover:text-white transition">
              View Collection
            </button>

          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1200&auto=format&fit=crop"
            alt="Women's Fashion"
            className="w-full max-w-lg rounded-[30px] shadow-2xl object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;