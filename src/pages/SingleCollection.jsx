import React,{
    useContext
    }
    from "react";
    
    import {
    useParams,
    Link
    }
    from "react-router-dom";
    
    import {
    ProductContext
    }
    from "../context/ProductContext";
    
    const SingleCollection = () => {
    
    const {
    products
    }
    =
    useContext(
    ProductContext
    );
    
    const {
    name
    }
    =
    useParams();
    
    const filteredProducts =
    
    products.filter(
    (item)=>
    
    item.brand === name
    );
    
    return (
    
    <section className="py-20 min-h-screen bg-white">
    
    <div className="container mx-auto px-6">
    
    {/* HEADING */}
    
    <div className="text-center mb-16">
    
    <p className="uppercase tracking-[5px] text-pink-500 text-sm">
    
    Brand Collection
    
    </p>
    
    <h1 className="text-5xl font-bold mt-4">
    
    {name}
    
    </h1>
    
    </div>
    
    {/* PRODUCTS */}
    
    <div
    className="
    grid
    grid-cols-1
    sm:grid-cols-2
    lg:grid-cols-4
    gap-8
    "
    >
    
    {
    
    filteredProducts.length > 0
    
    ?
    
    filteredProducts.map(
    (product)=>(
    
    <Link
    
    to={`/product/${product.id}`}
    
    key={product.id}
    
    className="
    bg-white
    rounded-3xl
    overflow-hidden
    shadow-md
    hover:shadow-2xl
    transition
    "
    
    >
    
    <img
    src={product.image}
    alt={product.title}
    className="
    h-[350px]
    w-full
    object-cover
    "
    />
    
    <div className="p-5">
    
    <h2 className="text-2xl font-bold">
    
    {product.title}
    
    </h2>
    
    <p className="text-gray-500 mt-2">
    
    {product.brand}
    
    </p>
    
    <p className="text-xl font-bold mt-4">
    
    {product.price}
    
    </p>
    
    </div>
    
    </Link>
    
    )
    
    )
    
    :
    
    (
    
    <div
    className="
    col-span-full
    text-center
    py-20
    "
    >
    
    <h2
    className="
    text-4xl
    font-bold
    mb-4
    "
    >
    
    No Products Found
    
    </h2>
    
    <p className="text-gray-500">
    
    No products in this collection
    
    </p>
    
    </div>
    
    )
    
    }
    
    </div>
    
    </div>
    
    </section>
    
    );
    
    };
    
    export default SingleCollection;