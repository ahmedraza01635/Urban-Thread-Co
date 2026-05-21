import React, {
  useContext,
  useState
  } from "react";
  
  import { Link }
  from "react-router-dom";
  
  import {
  ProductContext
  }
  from "../context/ProductContext";
  
  import {
  doc,
  deleteDoc,
  } from "firebase/firestore";
  
  import {
  db
  }
  from "../firebase";
  
  const AdminProducts = () => {
  
  const {
  products,
  setProducts
  }
  =
  useContext(
  ProductContext
  );
  
  const [
  search,
  setSearch
  ]
  =
  useState("");
  
  const filteredProducts =
  
  products.filter(
  
  (product)=>
  
  product.title
  ?.toLowerCase()
  .includes(
  
  search.toLowerCase()
  
  )
  
  );
  
  const deleteProduct =
  async (id)=>{
  
  try{
  
  await deleteDoc(
  doc(
  db,
  "products",
  id
  )
  );
  
  setProducts(
  
  products.filter(
  (item)=>
  item.id!==id
  )
  
  );
  
  }
  
  catch(error){
  
  console.log(
  error
  );
  
  }
  
  };
  
  return (
  
  <div>
  
  <h1
  className="
  text-4xl
  font-bold
  mb-10
  "
  >
  
  All Products
  
  </h1>
  
  <div
  className="
  bg-white
  rounded-3xl
  shadow-md
  overflow-hidden
  "
  >
  
  <input
  
  type="text"
  
  placeholder="
  Search Product...
  "
  
  value={
  search
  }
  
  onChange={(e)=>
  
  setSearch(
  e.target.value
  )
  
  }
  
  className="
  w-full
  border-b
  px-5
  py-4
  outline-none
  "
  />
  
  <table
  className="
  w-full
  "
  >
  
  <thead
  className="
  bg-black
  text-white
  "
  >
  
  <tr>
  
  <th className="text-left p-5">
  Image
  </th>
  
  <th className="text-left p-5">
  Product
  </th>
  
  <th className="text-left p-5">
  Price
  </th>
  
  <th className="text-left p-5">
  Action
  </th>
  
  </tr>
  
  </thead>
  
  <tbody>
  
  {
  
  filteredProducts.map(
  
  (product)=>(
  
  <tr
  key={
  product.id
  }
  className="
  border-b
  "
  >
  
  <td
  className="
  p-5
  "
  >
  
  <img
  
  src={
  product.image
  }
  
  alt={
  product.title
  }
  
  className="
  w-20
  h-20
  rounded-xl
  object-cover
  "
  
  />
  
  </td>
  
  <td
  className="
  p-5
  font-semibold
  "
  >
  
  {
  product.title
  }
  
  </td>
  
  <td
  className="
  p-5
  "
  >
  
  {
  product.price
  }
  
  </td>
  
  <td
  className="
  p-5
  flex
  gap-3
  "
  >
  
  <Link
  
  to={
  `/admin/edit-product/${product.id}`
  }
  
  className="
  bg-blue-500
  text-white
  px-5
  py-2
  rounded-xl
  "
  
  >
  
  Edit
  
  </Link>
  
  <button
  
  onClick={()=>
  
  deleteProduct(
  product.id
  )
  
  }
  
  className="
  bg-red-500
  text-white
  px-5
  py-2
  rounded-xl
  "
  
  >
  
  Delete
  
  </button>
  
  </td>
  
  </tr>
  
  )
  
  )
  
  }
  
  </tbody>
  
  </table>
  
  </div>
  
  </div>
  
  );
  
  };
  
  export default AdminProducts;