import React,{
    useState,
    useEffect
    }
    from "react";
    
    import {
    collection,
    addDoc,
    getDocs
    }
    from "firebase/firestore";
    
    import {
    db
    }
    from "../firebase";
    
    import toast from "react-hot-toast";
    
    const AdminBrands = () => {
    
    const [
    name,
    setName
    ] =
    useState("");
    
    const [
    image,
    setImage
    ] =
    useState("");
    
    const [
    brands,
    setBrands
    ] =
    useState([]);
    
    const fetchBrands =
    async()=>{
    
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
    
    };
    
    useEffect(()=>{
    
    fetchBrands();
    
    },[]);
    
    const uploadImage =
    async(file)=>{
    
    const data =
    new FormData();
    
    data.append(
    "file",
    file
    );
    
    data.append(
    "upload_preset",
    "ecommerce_upload"
    );
    
    data.append(
    "cloud_name",
    "dmxpvxrcq"
    );
    
    const res =
    await fetch(
    
    "https://api.cloudinary.com/v1_1/dmxpvxrcq/image/upload",
    
    {
    method:"POST",
    body:data
    }
    
    );
    
    const result =
    await res.json();
    
    return result.secure_url;
    
    };
    
    const handleSubmit =
    async(e)=>{
    
    e.preventDefault();
    
    if(
    !name ||
    !image
    ){
    
    toast.error(
    "Fill all fields"
    );
    
    return;
    
    }
    
    try{
    
    await addDoc(
    
    collection(
    db,
    "brands"
    ),
    
    {
    name,
    image
    }
    
    );
    
    toast.success(
    "Brand Added"
    );
    
    setName("");
    setImage("");
    
    fetchBrands();
    
    }
    
    catch(err){
    
    console.log(err);
    
    toast.error(
    "Failed"
    );
    
    }
    
    };
    
    return (
    
    <div>
    
    <h1 className="text-4xl font-bold mb-10">
    
    Brands
    
    </h1>
    
    {/* FORM */}
    
    <form
    onSubmit={handleSubmit}
    className="
    bg-white
    p-8
    rounded-3xl
    shadow-md
    max-w-2xl
    mb-14
    "
    >
    
    <input
    type="text"
    placeholder="Brand Name"
    value={name}
    onChange={(e)=>
    setName(
    e.target.value
    )
    }
    className="
    w-full
    border
    p-4
    rounded-xl
    mb-5
    "
    />
    
    <input
    type="file"
    accept="image/*"
    onChange={async(e)=>{
    
    const file =
    e.target.files[0];
    
    toast.loading(
    "Uploading..."
    );
    
    const url =
    await uploadImage(
    file
    );
    
    toast.dismiss();
    
    setImage(url);
    
    }}
    className="
    w-full
    border
    p-4
    rounded-xl
    mb-5
    "
    />
    
    <button
    type="submit"
    className="
    bg-black
    text-white
    px-8
    py-4
    rounded-xl
    "
    >
    
    Add Brand
    
    </button>
    
    </form>
    
    {/* BRANDS */}
    
    <div
    className="
    grid
    grid-cols-2
    md:grid-cols-3
    lg:grid-cols-4
    gap-8
    "
    >
    
    {
    
    brands.map(
    (item)=>(
    
    <div
    key={item.id}
    className="
    bg-white
    rounded-3xl
    overflow-hidden
    shadow-md
    "
    >
    
    <img
    src={item.image}
    alt={item.name}
    className="
    h-[250px]
    w-full
    object-cover
    "
    />
    
    <div className="p-5 text-center">
    
    <h2 className="text-2xl font-bold">
    
    {item.name}
    
    </h2>
    
    </div>
    
    </div>
    
    )
    
    )
    
    }
    
    </div>
    
    </div>
    
    );
    
    };
    
    export default AdminBrands;
