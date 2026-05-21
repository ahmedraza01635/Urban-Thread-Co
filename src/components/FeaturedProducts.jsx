import React, {
  useContext,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import {
  Heart,
} from "lucide-react";

import {
  WishlistContext,
} from "../context/WishlistContext";

import {
  ProductContext,
} from "../context/ProductContext";

const FeaturedProducts = () => {

  const [search, setSearch] =
    useState("");

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("");

  const {
    wishlistItems,
    toggleWishlist,
  } =
    useContext(
      WishlistContext
    );

  const {
    products,
  } =
    useContext(
      ProductContext
    );

  const filteredProducts =
    products.filter(
      (product) => {

        const matchesSearch =
          product.title
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            );

        const matchesCategory =

          selectedCategory === ""

            ?

            true

            :

            product.category ===
            selectedCategory;

        return (
          matchesSearch &&
          matchesCategory
        );

      }
    );

  return (

    <section className="py-20 bg-white">

      <div className="container mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-14">

          <p className="text-pink-500 uppercase tracking-[4px] text-sm">

            Trending Products

          </p>

          <h2 className="text-4xl font-bold mt-3">

            Featured Collection

          </h2>

        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-5 mb-10">

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e)=>
              setSearch(
                e.target.value
              )
            }
            className="
            flex-1
            border
            rounded-2xl
            px-5
            py-4
            "
          />

          <select
            value={
              selectedCategory
            }
            onChange={(e)=>
              setSelectedCategory(
                e.target.value
              )
            }
            className="
            border
            rounded-2xl
            px-5
            py-4
            "
          >

            <option value="">
              All Categories
            </option>

            {
              [
                ...new Set(
                  products.map(
                    p =>
                      p.category
                  )
                ),
              ].map(
                (
                  category
                ) => (

                  <option
                    key={
                      category
                    }
                    value={
                      category
                    }
                  >

                    {
                      category
                    }

                  </option>

                )
              )
            }

          </select>

        </div>

        {/* Grid */}
        <div
          className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-8
          "
        >

          {
            filteredProducts.map(
              (
                product
              ) => (

                <Link
                  key={
                    product.id
                  }
                  to={`/product/${product.id}`}
                  className="
                  relative
                  bg-white
                  rounded-3xl
                  overflow-hidden
                  shadow-md
                  hover:shadow-2xl
                  transition
                  "
                >

                  {/* Wishlist */}
                  <button

                    onClick={(
                      e
                    ) => {

                      e.preventDefault();

                      toggleWishlist(
                        product
                      );

                    }}

                    className="
                    absolute
                    top-5
                    right-5
                    z-10
                    bg-white
                    rounded-full
                    w-12
                    h-12
                    flex
                    items-center
                    justify-center
                    "
                  >

                    <Heart

                      size={22}

                      fill={
                        wishlistItems.find(
                          (
                            item
                          )=>

                            item.id ===
                            product.id
                        )

                          ?

                          "red"

                          :

                          "none"
                      }

                    />

                  </button>

                  {/* IMAGE */}

                  <img
                    src={
                      product.image
                    }
                    alt={
                      product.title
                    }
                    className="
                    h-[350px]
                    w-full
                    object-cover
                    hover:scale-105
                    transition
                    "
                  />

                  {/* INFO */}

                  <div className="p-5">

                    <h3 className="text-xl font-semibold">

                      {
                        product.title
                      }

                    </h3>

                    <p className="mt-2 text-gray-500">

                      {
                        product.category
                      }

                    </p>

                    <div className="flex justify-between items-center mt-5">

                      <span className="text-xl font-bold">

                        {
                          product.price
                        }

                      </span>

                      <button
                        className="
                        bg-black
                        text-white
                        px-4
                        py-2
                        rounded-full
                        "
                      >

                        View

                      </button>

                    </div>

                  </div>

                </Link>

              )
            )
          }

        </div>

      </div>

    </section>

  );

};

export default FeaturedProducts;