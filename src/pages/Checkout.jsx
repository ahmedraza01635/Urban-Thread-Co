import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { CartContext } from "../context/CartContext";
import { OrderContext } from "../context/OrderContext";
import { useNavigate } from "react-router-dom";
import {
  ProductContext
  }
  from "../context/ProductContext";
  import emailjs
from
"@emailjs/browser";


import {
  collection,
  addDoc,
  doc,
updateDoc
  } from "firebase/firestore";
  
  import { db }
  from "../firebase";
  emailjs.init(
    "nHrW18x3byOsyWN-A"
    );

const Checkout = () => {


  const {
    products
    }
    =
    useContext(
    ProductContext
    );

    const { orders, setOrders } =
  useContext(OrderContext);

const navigate = useNavigate();

const {
  cartItems,
  setCartItems,
  } =
  useContext(
  CartContext
  );

  const [name, setName] = useState("");
  const [email, setEmail] =
    useState("");
  const [address, setAddress] =
    useState("");

  const totalPrice = cartItems.reduce(
    (total, item) =>
      total +
      Number(
        item.price.replace("$", "")
      ) *
        item.quantity,
    0
  );

  const handleOrder = async (e) => {

    e.preventDefault();
    
    if (
    !name ||
    !email ||
    !address
    ){
    
    toast.error(
    "Fill all fields"
    );
    
    return;
    
    }
    
    for (
    const item
    of cartItems
    ){
    
    const product =
    products.find(
    (p)=>
    p.id === item.id
    );
    
    if (
    
    !product ||
    
    item.quantity >
    (product.stock || 0)
    
    ){
    
    toast.error(
    `${item.title} is out of stock`
    );
    
    return;
    
    }
    
    }
    
    try {
    
    const newOrder = {
    
    customer:{
    name,
    email,
    address,
    },
    
    items:
    cartItems,
    
    total:
    totalPrice,
    
    status:
    "Pending",
    
    createdAt:
    Date.now(),
    
    };
    
    // SAVE ORDER
    await addDoc(
    collection(
    db,
    "orders"
    ),
    newOrder
    );
    
    // UPDATE STOCK
    for (
    const cartItem
    of cartItems
    ){
    
    const product =
    products.find(
    (p)=>
    p.id === cartItem.id
    );
    
    if(product){
    
    await updateDoc(
    
    doc(
    db,
    "products",
    product.id
    ),
    
    {
    stock:
    
    Math.max(
    0,
    (product.stock || 0)
    -
    cartItem.quantity
    )
    
    }
    
    );
    
    }
    
    }
    
    // SEND EMAIL
    await emailjs.send(
    
    "service_o8lk3z4",
    
    "template_8uadbq8",
    
    {
    
    customer_name:
    name,
    
    customer_email:
    email,
    
    order_total:
    String(totalPrice),
    
    order_address:
    address,
    
    },

    
    "nHrW18x3byOsyWN-A"
    
    );
    
    setOrders([
    ...orders,
    newOrder
    ]);
    
    setCartItems([]);
    
    localStorage.setItem(
    "cart",
    JSON.stringify([])
    );
    
    toast.success(
    "Order Placed"
    );
    
    navigate("/");
    
    }
    
    catch(err){
    
    console.log(err);
    
    toast.error(
    "Order Failed"
    );
    
    }
    
    };
      
  return (
    <section className="min-h-screen bg-gray-100 py-16">

      <div className="container mx-auto px-6">

        <h1 className="text-5xl font-bold mb-12">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* FORM */}
          <form
            onSubmit={handleOrder}
            className="bg-white p-8 rounded-3xl shadow-md"
          >

            <h2 className="text-3xl font-bold mb-8">
              Shipping Details
            </h2>

            {/* Name */}
            <div className="mb-6">

              <label className="block mb-2 font-semibold">
                Full Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                className="w-full border border-gray-300 rounded-xl px-4 py-3"
                placeholder="Enter name"
              />

            </div>

            {/* Email */}
            <div className="mb-6">

              <label className="block mb-2 font-semibold">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="w-full border border-gray-300 rounded-xl px-4 py-3"
                placeholder="Enter email"
              />

            </div>

            {/* Address */}
            <div className="mb-8">

              <label className="block mb-2 font-semibold">
                Address
              </label>

              <textarea
                rows="5"
                value={address}
                onChange={(e) =>
                  setAddress(e.target.value)
                }
                className="w-full border border-gray-300 rounded-xl px-4 py-3"
                placeholder="Enter address"
              ></textarea>

            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-4 rounded-2xl hover:bg-gray-800 transition"
            >
              Place Order
            </button>

          </form>

          {/* ORDER SUMMARY */}
          <div className="bg-white p-8 rounded-3xl shadow-md h-fit">

            <h2 className="text-3xl font-bold mb-8">
              Order Summary
            </h2>

            <div className="space-y-5">

              {cartItems.map((item) => (

                <div
                  key={item.id}
                  className="flex items-center gap-4"
                >

                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 rounded-2xl object-cover"
                  />

                  <div className="flex-1">

                    <h3 className="font-bold">
                      {item.title}
                    </h3>

                    <p className="text-gray-500">
                      Qty: {item.quantity}
                    </p>

                  </div>

                  <span className="font-bold">
                    $
                    {Number(
                      item.price.replace(
                        "$",
                        ""
                      )
                    ) * item.quantity}
                  </span>

                </div>

              ))}

            </div>

            <div className="border-t mt-8 pt-8 flex items-center justify-between">

              <h3 className="text-2xl font-bold">
                Total
              </h3>

              <span className="text-3xl font-bold">
                ${totalPrice}
              </span>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Checkout;