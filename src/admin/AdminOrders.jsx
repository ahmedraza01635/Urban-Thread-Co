import React,{
  useContext,
  useEffect,
  useState
  }
  from "react";
  
  import {
  OrderContext
  }
  from "../context/OrderContext";
  
  import {
  collection,
  getDocs,
  doc,
  updateDoc
  }
  from "firebase/firestore";
  
  import {
  db
  }
  from "../firebase";
  
  const AdminOrders=()=>{
  
  const {
  orders,
  setOrders
  }
  =
  useContext(
  OrderContext
  );
  
  const[
  selectedStatus,
  setSelectedStatus
  ]
  =
  useState(
  "All"
  );
  
  useEffect(()=>{
  
  const fetchOrders=
  async()=>{
  
  const snap=
  await getDocs(
  collection(
  db,
  "orders"
  )
  );
  
  const data=
  snap.docs
  .map(
  (doc)=>({
  
  id:
  doc.id,
  
  ...doc.data()
  
  })
  )
  
  .sort(
  (a,b)=>
  
  (b.createdAt||0)
  -
  (a.createdAt||0)
  
  );
  
  setOrders(
  data
  );
  
  };
  
  fetchOrders();
  
  },[]);
  
  const updateStatus=
  async(
  id,
  status
  )=>{
  
  try{
  
  await updateDoc(
  
  doc(
  db,
  "orders",
  id
  ),
  
  {
  status
  }
  
  );
  
  setOrders(
  
  orders.map(
  (o)=>
  
  o.id===id
  
  ?
  
  {
  ...o,
  status
  }
  
  :
  
  o
  
  )
  
  );
  
  }
  
  catch(err){
  
  console.log(
  err
  );
  
  }
  
  };
  
  const filteredOrders=
  
  selectedStatus==="All"
  
  ?
  
  orders
  
  :
  
  orders.filter(
  (order)=>
  
  order.status===
  selectedStatus
  );
  
  return(
  
  <div>
  
  <h1
  className="
  text-4xl
  font-bold
  mb-10
  "
  >
  
  Orders
  
  </h1>
  
  <select
  
  value={
  selectedStatus
  }
  
  onChange={(e)=>
  
  setSelectedStatus(
  e.target.value
  )
  
  }
  
  className="
  border
  px-5
  py-3
  rounded-xl
  mb-8
  "
  
  >
  
  <option value="All">
  All
  </option>
  
  <option value="Pending">
  Pending
  </option>
  
  <option value="Processing">
  Processing
  </option>
  
  <option value="Delivered">
  Delivered
  </option>
  
  <option value="Cancelled">
  Cancelled
  </option>
  
  </select>
  
  <div
  className="
  space-y-8
  "
  >
  
  {
  
  filteredOrders.map(
  (order)=>(
  
  <div
  
  key={
  order.id
  }
  
  className="
  bg-white
  p-8
  rounded-3xl
  shadow-md
  "
  
  >
  
  <div
  className="
  mb-6
  "
  >
  
  <h2
  className="
  text-2xl
  font-bold
  "
  >
  
  {
  
  order.customer?.name
  ||
  
  order.name
  
  ||
  
  "No Name"
  
  }
  
  </h2>
  
  <p>
  
  {
  
  order.customer?.email
  ||
  
  order.email
  
  }
  
  </p>
  
  <p>
  
  {
  
  order.customer?.address
  ||
  
  order.address
  
  }
  
  </p>
  
  </div>
  
  <div
  className="
  space-y-4
  "
  >
  
  {
  
  order.items?.map(
  (item)=>(
  
  <div
  
  key={
  item.id
  }
  
  className="
  flex
  gap-4
  border-b
  pb-4
  "
  
  >
  
  <img
  
  src={
  item.image
  }
  
  alt={
  item.title
  }
  
  className="
  w-20
  h-20
  rounded-xl
  object-cover
  "
  
  />
  
  <div>
  
  <h3
  className="
  font-bold
  "
  >
  
  {
  item.title
  }
  
  </h3>
  
  <p>
  
  Qty:
  {
  item.quantity
  }
  
  </p>
  
  <p>
  
  {
  item.price
  }
  
  </p>
  
  </div>
  
  </div>
  
  )
  
  )
  
  }
  
  </div>
  
  <div
  className="
  mt-6
  flex
  justify-between
  items-center
  "
  >
  
  <h2
  className="
  text-2xl
  font-bold
  "
  >
  
  Total:
  $
  
  {
  order.total
  }
  
  </h2>
  
  <select
  
  value={
  order.status
  ||
  
  "Pending"
  }
  
  onChange={(e)=>
  
  updateStatus(
  
  order.id,
  
  e.target.value
  
  )
  
  }
  
  className="
  border
  rounded-xl
  px-4
  py-2
  "
  
  >
  
  <option>
  Pending
  </option>
  
  <option>
  Processing
  </option>
  
  <option>
  Delivered
  </option>
  
  <option>
  Cancelled
  </option>
  
  </select>
  
  </div>
  
  </div>
  
  )
  
  )
  
  }
  
  </div>
  
  </div>
  
  );
  
  };
  
  export default AdminOrders;