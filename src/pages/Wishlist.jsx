import React, { useContext } from "react";

import { WishlistContext } from "../context/WishlistContext";

const Wishlist = () => {

  const { wishlistItems } =
    useContext(WishlistContext);

  return (
    <section className="min-h-screen bg-gray-100 py-16">

      <div className="container mx-auto px-6">

        <h1 className="text-5xl font-bold mb-12">
          Wishlist
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {wishlistItems.map((item) => (

            <div
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden shadow-md"
            >

              <img
                src={item.image}
                alt={item.title}
                className="h-[350px] w-full object-cover"
              />

              <div className="p-5">

                <h2 className="text-2xl font-bold">
                  {item.title}
                </h2>

                <p className="mt-3 font-semibold">
                  {item.price}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default Wishlist;