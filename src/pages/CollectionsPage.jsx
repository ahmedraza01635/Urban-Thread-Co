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
    
    const CollectionsPage = () => {
    
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
    
    <section className="py-20 min-h-screen bg-[#faf7f3]">
    
    <div className="container mx-auto px-6">
    
    <div className="text-center mb-16">
    
    <p className="uppercase tracking-[5px] text-pink-500 text-sm">
    
    Fashion Brands
    
    </p>
    
    <h1 className="text-5xl font-bold mt-4">
    
    All Collections
    
    </h1>
    
    </div>
    
    <div
    className="
    grid
    grid-cols-2
    md:grid-cols-3
    lg:grid-cols-4
    gap-10
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
    bg-white
    rounded-[40px]
    overflow-hidden
    shadow-lg
    hover:shadow-2xl
    transition
    "
    
    >
    
    <div
    className="
    overflow-hidden
    h-[320px]
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
    
    </div>
    
    <div className="p-6 text-center">
    
    <h2 className="text-2xl font-bold">
    
    {item.name}
    
    </h2>
    
    <p className="text-gray-500 mt-2">
    
    Luxury Women Wear
    
    </p>
    
    </div>
    
    </Link>
    
    )
    
    )
    
    }
    
    </div>
    
    </div>
    
    </section>
    
    );
    
    };
    
    export default CollectionsPage;