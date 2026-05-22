// src/components/Hero.jsx

import React from "react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden">

<div className="grid lg:grid-cols-2 min-h-[85vh]">

{/* LEFT */}

<div className="flex flex-col justify-center px-8 lg:px-20 py-20 bg-[#faf7f3]">

<p className="uppercase tracking-[6px] text-pink-500 text-sm mb-4">

Urban Thread Co

</p>

<h1 className="text-5xl lg:text-7xl font-bold leading-tight">

Wear Your

<span className="block text-pink-500">

Style

</span>

Every Day

</h1>

<p className="mt-8 text-gray-600 text-lg max-w-xl">

Discover premium women fashion —
modern silhouettes, timeless essentials
and everyday elegance.

</p>

<div className="flex gap-5 mt-10">

<button
className="
bg-black
text-white
px-8
py-4
rounded-full
hover:scale-105
transition
"
>

Shop Now

</button>

<button
className="
border
px-8
py-4
rounded-full
hover:bg-white
transition
"
>

New Collection

</button>

</div>

</div>

{/* RIGHT */}

<div className="relative">

<img

src="/hero.jpg"

alt="Women Fashion"

className="
w-full
h-full
object-cover
"

/>

<div
className="
absolute
bottom-10
left-10
bg-white/90
backdrop-blur
p-6
rounded-3xl
shadow-xl
"
>

<p className="text-sm text-gray-500">

NEW ARRIVALS

</p>

<h3 className="text-2xl font-bold">

Summer Collection

</h3>

</div>

</div>

</div>

</section>
  );
};

export default Hero;
