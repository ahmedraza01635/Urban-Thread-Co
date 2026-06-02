// src/pages/Home.jsx

import React from "react";
import Hero from "../components/Hero";
import FeaturedProducts from "../components/FeaturedProducts";
import Collections from "../components/Collections";

const Home = () => {
  return (
    <>
      <Hero />
      <Collections />
      <FeaturedProducts />
    </>
  );
};

export default Home;
