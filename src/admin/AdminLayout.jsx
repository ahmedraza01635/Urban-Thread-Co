import React from "react";
import { Link, Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex  bg-gray-100">

      {/* Sidebar */}
      <aside className="w-[260px] bg-black text-white p-6">

        <h1 className="text-3xl font-bold mb-10">
          Admin Panel
        </h1>

        <nav className="flex flex-col gap-4">

          <Link
            to="/admin"
            className="hover:bg-white hover:text-black px-4 py-3 rounded-xl transition"
          >
            Dashboard
          </Link>

          <Link
            to="/admin/products"
            className="hover:bg-white hover:text-black px-4 py-3 rounded-xl transition"
          >
            Products
          </Link>

          <Link
            to="/admin/add-product"
            className="hover:bg-white hover:text-black px-4 py-3 rounded-xl transition"
          >
            Add Product
          </Link>

          <Link to="/admin/orders"
            className="hover:bg-white hover:text-black px-4 py-3 rounded-xl transition" >

            Orders
          </Link>
          <Link
            to="/admin/categories"
            className="hover:bg-white hover:text-black px-4 py-3 rounded-xl transition"
          >

            Categories

          </Link>

        </nav>

      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>

    </div>
  );
};

export default AdminLayout;