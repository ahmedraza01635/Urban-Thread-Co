import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // TEMP ADMIN LOGIN
    if (
      email === "admin@gmail.com" &&
      password === "123456"
    ) {

      localStorage.setItem(
        "adminAuth",
        "true"
      );

      navigate("/admin");

    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={handleLogin}
        className="bg-white p-10 rounded-3xl shadow-lg w-full max-w-md"
      >

        <h1 className="text-4xl font-bold mb-8 text-center">
          Admin Login
        </h1>

        {/* Email */}
        <div className="mb-6">

          <label className="block mb-2 font-semibold">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full border border-gray-300 rounded-xl px-4 py-3"
          />

        </div>

        {/* Password */}
        <div className="mb-8">

          <label className="block mb-2 font-semibold">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full border border-gray-300 rounded-xl px-4 py-3"
          />

        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-4 rounded-xl hover:bg-gray-800 transition"
        >
          Login
        </button>

      </form>

    </div>
  );
};

export default AdminLogin;