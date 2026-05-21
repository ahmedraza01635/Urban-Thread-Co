import React, {
    useContext
    } from "react";
    
    import {
    AuthContext
    }
    from "../context/AuthContext";
    
    import {
    OrderContext
    }
    from "../context/OrderContext";
    
    import {
    useNavigate
    }
    from "react-router-dom";
    
    import toast
    from "react-hot-toast";
    
    const Profile = () => {
    
    const {
    user,
    logout
    }
    =
    useContext(
    AuthContext
    );
    
    const {
    orders
    }
    =
    useContext(
    OrderContext
    );
    
    const navigate =
    useNavigate();
    
    const handleLogout =
    async()=>{
    
    try{
    
    await logout();
    
    toast.success(
    "Logged Out"
    );
    
    navigate("/");
    
    }
    
    catch(err){
    
    console.log(err);
    
    }
    
    };
    
    const userOrders =
    
    orders.filter(
    
    (order)=>
    
    order.customer?.email
    
    ===
    
    user?.email
    
    );
    
    return (
    
    <section
    className="
    min-h-screen
    bg-gray-100
    py-16
    "
    >
    
    <div
    className="
    container
    mx-auto
    px-6
    "
    >
    
    <div
    className="
    bg-white
    rounded-3xl
    shadow-md
    p-10
    mb-10
    "
    >
    
    <div
    className="
    flex
    items-center
    gap-6
    "
    >
    
    <div
    className="
    w-24
    h-24
    rounded-full
    bg-black
    text-white
    flex
    items-center
    justify-center
    text-3xl
    font-bold
    "
    >
    
    {
    
    user?.email?.[0]
    ?.toUpperCase()
    
    }
    
    </div>
    
    <div>
    
    <h1
    className="
    text-4xl
    font-bold
    "
    >
    
    {
    
    user?.displayName
    
    ||
    
    "User"
    
    }
    
    </h1>
    
    <p
    className="
    text-gray-500
    mt-2
    "
    >
    
    {
    
    user?.email
    
    }
    
    </p>
    
    </div>
    
    </div>
    
    <button
    
    onClick={
    handleLogout
    }
    
    className="
    mt-8
    bg-red-500
    text-white
    px-6
    py-3
    rounded-xl
    "
    
    >
    
    Logout
    
    </button>
    
    </div>
    
    {/* ORDERS */}
    
    <div>
    
    <h2
    className="
    text-3xl
    font-bold
    mb-8
    "
    >
    
    My Orders
    
    </h2>
    
    {
    
    userOrders.length
    
    ===
    
    0
    
    ?
    
    (
    
    <div
    className="
    bg-white
    p-10
    rounded-3xl
    text-center
    "
    >
    
    No Orders Yet
    
    </div>
    
    )
    
    :
    
    (
    
    <div
    className="
    space-y-6
    "
    >
    
    {
    
    userOrders.map(
    
    (order)=>(
    
    <div
    
    key={
    order.id
    }
    
    className="
    bg-white
    p-8
    rounded-3xl
    shadow
    "
    
    >
    
    <div
    className="
    flex
    justify-between
    mb-6
    "
    >
    
    <h3
    className="
    font-bold
    "
    >
    
    Order #
    
    {
    order.id
    .slice(
    0,
    8
    )
    }
    
    </h3>
    
    <span
    className="
    font-semibold
    "
    >
    
    {
    order.status
    }
    
    </span>
    
    </div>
    
    {
    
    order.items.map(
    
    (item)=>(
    
    <div
    
    key={
    item.id
    }
    
    className="
    flex
    items-center
    gap-4
    mb-4
    "
    
    >
    
    <img
    
    src={
    item.image
    }
    
    alt=""
    
    className="
    w-20
    h-20
    rounded-xl
    object-cover
    "
    />
    
    <div>
    
    <h4>
    
    {
    item.title
    }
    
    </h4>
    
    <p>
    
    Qty:
    {
    item.quantity
    }
    
    </p>
    
    </div>
    
    </div>
    
    )
    
    )
    
    }
    
    <div
    className="
    font-bold
    mt-5
    "
    >
    
    Total:
    
    $
    
    {
    order.total
    }
    
    </div>
    
    </div>
    
    )
    
    )
    
    }
    
    </div>
    
    )
    
    }
    
    </div>
    
    </div>
    
    </section>
    
    );
    
    };
    
    export default Profile;