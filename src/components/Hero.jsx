// src/components/Hero.jsx

import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (

<section className="overflow-hidden bg-[#faf7f3]">

<div
className="
container
mx-auto
grid
grid-cols-1
lg:grid-cols-2
items-center
min-h-[85vh]
"
>

{/* LEFT */}

<div
className="
px-6
sm:px-10
lg:px-20
py-14
lg:py-0
order-2
lg:order-1
"
>

<p
className="
uppercase
tracking-[4px]
text-pink-500
text-xs
sm:text-sm
mb-5
"
>

Urban Thread Co

</p>

<h1
className="
text-4xl
sm:text-5xl
lg:text-7xl
font-bold
leading-tight
"
>

Pakistan's

<span className="block text-pink-500">

Women's Fashion

</span>

Destination

</h1>

<p
className="
mt-6
text-gray-600
text-base
sm:text-lg
max-w-xl
"
>

Explore premium women’s clothing from
multiple brands — elegant suits, casual wear,
new arrivals and everyday fashion delivered
across Pakistan.

</p>

<div
className="
flex
flex-col
sm:flex-row
gap-4
mt-8
"
>

<Link to="/shop">

<button
className="
w-full
sm:w-auto
bg-black
text-white
px-8
py-4
rounded-full
hover:scale-105
transition
"
>

Shop Collection

</button>

</Link>

<Link to="/shop">

<button
className="
w-full
sm:w-auto
border
border-black
px-8
py-4
rounded-full
hover:bg-white
transition
"
>

Browse Brands

</button>

</Link>

</div>

</div>

{/* RIGHT */}

<div
className="
relative
h-[400px]
sm:h-[550px]
lg:h-full
order-1
lg:order-2
"
>

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
bottom-5
left-5
sm:bottom-10
sm:left-10
bg-white/90
backdrop-blur
rounded-3xl
shadow-xl
px-5
py-4
"
>

<p
className="
text-xs
text-gray-500
"
>

NEW ARRIVALS

</p>

<h3
className="
text-lg
sm:text-2xl
font-bold
"
>

Multi-Brand Collection

</h3>

</div>

</div>

</div>

</section>

  );
};

export default Hero;
