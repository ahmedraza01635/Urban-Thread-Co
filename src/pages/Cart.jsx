import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const Cart = () => {

    const {
        cartItems,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
    } = useContext(CartContext);

    // TOTAL PRICE
    const totalPrice = cartItems.reduce(
        (total, item) =>
            total +
            Number(
                item.price.replace("$", "")
            ) *
            item.quantity,
        0
    );

    return (
        <section className="min-h-screen bg-gray-100 py-16">

            <div className="container mx-auto px-6">

                <h1 className="text-5xl font-bold mb-12">
                    Shopping Cart
                </h1>

                {cartItems.length === 0 ? (

                    <div className="bg-white p-10 rounded-3xl shadow-md text-center">

                        <h2 className="text-3xl font-bold">
                            Your cart is empty
                        </h2>

                    </div>

                ) : (

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                        {/* CART ITEMS */}
                        <div className="lg:col-span-2 space-y-6">

                            {cartItems.map((item) => (

                                <div
                                    key={item.id}
                                    className="bg-white p-5 rounded-3xl shadow-md flex items-center gap-5"
                                >

                                    {/* Image */}
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-28 h-28 rounded-2xl object-cover"
                                    />

                                    {/* Info */}
                                    <div className="flex-1">

                                        <h2 className="text-2xl font-bold">
                                            {item.title}
                                        </h2>

                                        <p className="text-gray-500 mt-2">
                                            ${item.price}
                                        </p>

                                        {/* Quantity */}
                                        <div className="flex items-center gap-3 mt-4">

                                            <button
                                                onClick={() =>
                                                    decreaseQuantity(item.id)
                                                }
                                                className="bg-gray-200 w-10 h-10 rounded-full"
                                            >
                                                -
                                            </button>

                                            <span className="font-bold text-lg">
                                                {item.quantity}
                                            </span>

                                            <button
                                                onClick={() =>
                                                    increaseQuantity(item.id)
                                                }
                                                className="bg-gray-200 w-10 h-10 rounded-full"
                                            >
                                                +
                                            </button>

                                        </div>

                                    </div>

                                    {/* Remove */}
                                    <button
                                        onClick={() =>
                                            removeFromCart(item.id)
                                        }
                                        className="bg-red-500 text-white px-5 py-3 rounded-xl hover:bg-red-600 transition"
                                    >
                                        Remove
                                    </button>

                                </div>

                            ))}

                        </div>

                        {/* SUMMARY */}
                        <div className="bg-white p-8 rounded-3xl shadow-md h-fit">

                            <h2 className="text-3xl font-bold mb-8">
                                Order Summary
                            </h2>

                            <div className="flex items-center justify-between mb-5">

                                <span className="text-gray-500">
                                    Total Items
                                </span>

                                <span className="font-bold">
                                    {cartItems.length}
                                </span>

                            </div>

                            <div className="flex items-center justify-between mb-8">

                                <span className="text-gray-500">
                                    Total Price
                                </span>

                                <span className="font-bold text-2xl">
                                    ${totalPrice}
                                </span>

                            </div>

                            <Link
                                to="/checkout"
                                className="block w-full bg-black text-white py-4 rounded-2xl hover:bg-gray-800 transition text-center"
                            >
                                Proceed To Checkout
                            </Link>

                        </div>

                    </div>

                )}

            </div>

        </section>
    );
};

export default Cart;