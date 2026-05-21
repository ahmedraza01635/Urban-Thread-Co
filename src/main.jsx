import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";

import ProductProvider from "./context/ProductContext";
import CartProvider from "./context/CartContext";
import OrderProvider from "./context/OrderContext";
import WishlistProvider from "./context/WishlistContext";

import 
AuthProvider

from "./context/AuthContext";

import {
Toaster
}
from "react-hot-toast";

ReactDOM.createRoot(
document.getElementById("root")
).render(

<React.StrictMode>

<AuthProvider>

<ProductProvider>

<CartProvider>

<OrderProvider>

<WishlistProvider>

<App />

<Toaster
position="top-right"
/>

</WishlistProvider>

</OrderProvider>

</CartProvider>

</ProductProvider>

</AuthProvider>

</React.StrictMode>

);