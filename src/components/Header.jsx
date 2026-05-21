// src/components/Header.jsx

import React, {
  useContext,
  useState,
} from "react";

import { Link, useNavigate } from "react-router-dom";

import {
  ShoppingCart,
  Menu,
  User,
  Heart,
  X,
} from "lucide-react";
import {
  AuthContext
}
  from "../context/AuthContext";

import { CartContext } from "../context/CartContext";
import toast
  from "react-hot-toast";

const Header = () => {

  const navigate = useNavigate();

  const {
    user,
    logout
  }
    =
    useContext(
      AuthContext
    );

  const handleLogout = async () => {

    try {

      await logout();

      toast.success(
        "Logged Out"
      );

      navigate("/");

    }

    catch (err) {

      console.log(err);

    }

  };

  const [mobileMenu, setMobileMenu] =
    useState(false);

  const { cartItems } =
    useContext(CartContext);

  return (

    <header className="bg-white shadow-md sticky top-0 z-50">

      <div className="container mx-auto flex items-center justify-between px-6 py-4">

        {/* LOGO */}
        <Link to="/">

          <div >
            <img src="src/assets/ChatGPT Image May 19, 2026, 10_53_52 PM-no-bg.png" alt="" className="h-16" />
          </div>

        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center gap-8">

          <Link
            to="/"
            className="text-gray-600 hover:text-black transition font-medium"
          >
            Home
          </Link>

          <Link
            to="/shop"
            className="text-gray-600 hover:text-black transition font-medium"
          >
            Shop
          </Link>

          <Link
            to="/about"
            className="text-gray-600 hover:text-black transition font-medium"
          >
            About
          </Link>

          <Link
            to="/contact"
            className="text-gray-600 hover:text-black transition font-medium"
          >
            Contact
          </Link>

        </nav>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">

          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="relative p-2 rounded-full hover:bg-gray-100 transition"
          >

            <Heart size={24} />

          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative p-2 rounded-full hover:bg-gray-100 transition"
          >

            <ShoppingCart size={24} />

            <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {cartItems.length}
            </span>

          </Link>

          {/* Profile */}

          <Link

            to={
              user
                ?
                "/profile"
                :
                "/login"
            }

            className="
hidden
md:flex
p-2
rounded-full
hover:bg-gray-100
transition
"

          >

            <User size={24} />

          </Link>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() =>
              setMobileMenu(!mobileMenu)
            }
            className="lg:hidden p-2"
          >

            {
              mobileMenu
                ? <X size={28} />
                : <Menu size={28} />
            }

          </button>

        </div>

      </div>

      {/* MOBILE MENU */}
      {
        mobileMenu && (

          <div className="lg:hidden bg-white border-t border-gray-200 px-6 py-6 shadow-md">

            <nav className="flex flex-col gap-5">

              <Link
                to="/"
                onClick={() =>
                  setMobileMenu(false)
                }
                className="text-gray-700 hover:text-black transition font-medium"
              >
                Home
              </Link>

              <Link
                to="/shop"
                onClick={() =>
                  setMobileMenu(false)
                }
                className="text-gray-700 hover:text-black transition font-medium"
              >
                Shop
              </Link>

              <Link
                to="/about"
                onClick={() =>
                  setMobileMenu(false)
                }
                className="text-gray-700 hover:text-black transition font-medium"
              >
                About
              </Link>

              <Link
                to="/contact"
                onClick={() =>
                  setMobileMenu(false)
                }
                className="text-gray-700 hover:text-black transition font-medium"
              >
                Contact
              </Link>

              <Link
                to="/wishlist"
                onClick={() =>
                  setMobileMenu(false)
                }
                className="text-gray-700 hover:text-black transition font-medium"
              >
                Wishlist
              </Link>

              <Link
                to="/cart"
                onClick={() =>
                  setMobileMenu(false)
                }
                className="text-gray-700 hover:text-black transition font-medium"
              >
                Cart
              </Link>
              {

                user

                  ?

                  <>

                    <Link
                      to="/profile"
                      onClick={() =>
                        setMobileMenu(false)
                      }
                      className="
text-gray-700
hover:text-black
font-medium
"
                    >

                      Profile

                    </Link>

                    <button

                      onClick={() => {

                        handleLogout();

                        setMobileMenu(false);

                      }}

                      className="
text-left
text-red-500
font-medium
"

                    >

                      Logout

                    </button>

                  </>

                  :

                  <Link

                    to="/login"

                    onClick={() =>
                      setMobileMenu(false)
                    }

                    className="
text-gray-700
hover:text-black
font-medium
"

                  >

                    Login

                  </Link>

              }

            </nav>

          </div>

        )
      }

    </header>
  );
};

export default Header;