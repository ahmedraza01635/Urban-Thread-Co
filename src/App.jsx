// src/App.jsx

import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProductDetails from "./pages/ProductDetails";

import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import AdminProducts from "./admin/AdminProducts";
import AddProduct from "./admin/AddProduct";
import EditProduct from "./admin/EditProduct";
import AdminLogin from "./admin/AdminLogin";
import ProtectedRoute from "./admin/ProtectedRoute";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import AdminOrders from "./admin/AdminOrders";
import Wishlist from "./pages/Wishlist";
import Signup
  from "./pages/Signup";
import Login from "./pages/Login";
import Profile
  from "./pages/Profile";
import AdminCategories
  from "./admin/AdminCategories";


function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* WEBSITE ROUTES */}
        <Route
          path="/"
          element={
            <>
              <Header />
              <Home />
              <Footer />
            </>
          }
        />
        <Route
          path="/wishlist"
          element={
            <>
              <Header />
              <Wishlist />
              <Footer />
            </>
          }
        />
        <Route
          path="/cart"
          element={
            <>
              <Header />
              <Cart />
              <Footer />
            </>
          }
        />
       
        <Route
          path="/signup"
          element={<Signup />}
        />
        <Route
          path="/checkout"
          element={
            <>
              <Header />
              <Checkout />
              <Footer />
            </>
          }
        />

        <Route
          path="/shop"
          element={
            <>
              <Header />
              <Shop />
              <Footer />
            </>
          }
        />

        <Route
          path="/about"
          element={
            <>
              <Header />
              <About />
              <Footer />
            </>
          }
        />
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/contact"
          element={
            <>
              <Header />
              <Contact />
              <Footer />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <Profile />
          }
        />

        <Route
          path="/product/:id"
          element={
            <>
              <Header />
              <ProductDetails />
              <Footer />
            </>
          }
        />

        {/* ADMIN ROUTES */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >


          <Route
            index
            element={<AdminDashboard />}
          />

          <Route
            path="products"
            element={<AdminProducts />}
          />

          <Route
            path="add-product"
            element={<AddProduct />}
          />
          <Route
            path="edit-product/:id"
            element={<EditProduct />}
          />
          <Route
            path="orders"
            element={<AdminOrders />}
          />
          <Route
          path="categories"
          element={
            <AdminCategories />
          }
        />


        </Route>
        <Route
          path="/admin-login"
          element={<AdminLogin />}
        />
         

      </Routes>

    </BrowserRouter>
  );
}

export default App;