import React,{
    useEffect,
    useState
    }
    from "react";
    
    import {
    Link
    }
    from "react-router-dom";
    
    import {
    collection,
    getDocs
    }
    from "firebase/firestore";
    
    import {
    db
    }
    from "../firebase";
    
    const Collections = () => {
    
    const [
    brands,
    setBrands
    ] =
    useState([]);
    
    useEffect(()=>{
    
    const fetchBrands =
    async()=>{
    
    try{
    
    const snap =
    await getDocs(
    
    collection(
    db,
    "brands"
    )
    
    );
    
    setBrands(
    
    snap.docs.map(
    (doc)=>({
    
    id:
    doc.id,
    
    ...doc.data()
    
    })
    )
    
    );
    
    }
    
    catch(err){
    
    console.log(err);
    
    }
    
    };
    
    fetchBrands();
    
    },[]);
    
    return (
    
    <section className="py-20 bg-white overflow-hidden">
    
    <div className="container mx-auto px-6">
    
    {/* HEADING */}
    
    <div className="text-center mb-14">
    
    <p className="uppercase tracking-[4px] text-pink-500 text-sm">
    
    Shop By Brands
    
    </p>
    
    <h2 className="text-4xl lg:text-5xl font-bold mt-3">
    
    Luxury Fashion Collections
    
    </h2>
    
    </div>
    
    {/* AUTO SLIDER */}
    
    <div
    className="
    flex
    gap-8
    overflow-x-auto
    scroll-smooth
    no-scrollbar
    pb-5
    "
    >
    
    {
    
    brands.map(
    (item)=>(
    
    <Link
    
    to={`/collections/${item.name}`}
    
    key={item.id}
    
    className="
    group
    min-w-[180px]
    text-center
    flex-shrink-0
    "
    
    >
    
    <div
    className="
    relative
    overflow-hidden
    rounded-full
    w-[180px]
    h-[180px]
    shadow-xl
    mx-auto
    border-4
    border-white
    "
    >
    
    <img
    src={item.image}
    alt={item.name}
    className="
    w-full
    h-full
    object-cover
    group-hover:scale-110
    transition
    duration-500
    "
    />
    
    <div
    className="
    absolute
    inset-0
    bg-black/20
    "
    />
    
    </div>
    
    <h3
    className="
    mt-5
    text-xl
    font-semibold
    "
    >
    
    {item.name}
    
    </h3>
    
    </Link>
    
    )
    
    )
    
    }
    
    </div>
    
    {/* BUTTON */}
    
    <div className="text-center mt-14">
    
    <Link
    to="/collections"
    className="
    inline-block
    bg-black
    text-white
    px-10
    py-4
    rounded-full
    hover:scale-105
    transition
    "
    >
    
    View More
    
    </Link>
    
    </div>
    
    </div>
    
    </section>
    
    );
    
    };
    
    export default Collections;