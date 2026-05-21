import React,{
    useEffect,
    useState
    }
    from "react";
    
    import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc
    }
    from "firebase/firestore";
    
    import { db }
    from "../firebase";
    
    import toast
    from "react-hot-toast";
    
    const AdminCategories=()=>{
    
    const[
    categories,
    setCategories
    ]=useState([]);
    
    const[
    name,
    setName
    ]=useState("");
    
    const fetchCategories=
    async()=>{
    
    const snap=
    await getDocs(
    collection(
    db,
    "categories"
    )
    );
    
    setCategories(
    
    snap.docs.map(
    (doc)=>({
    id:doc.id,
    ...doc.data()
    })
    )
    
    );
    
    };
    
    useEffect(()=>{
    
    fetchCategories();
    
    },[]);
    
    const addCategory=
    async()=>{
    
    if(!name){
    
    toast.error(
    "Enter category"
    );
    
    return;
    
    }
    
    const ref=
    
    await addDoc(
    
    collection(
    db,
    "categories"
    ),
    
    {
    name
    }
    
    );
    
    setCategories([
    ...categories,
    {
    id:ref.id,
    name
    }
    ]);
    
    setName("");
    
    toast.success(
    "Category Added"
    );
    
    };
    
    const remove=
    async(id)=>{
    
    await deleteDoc(
    
    doc(
    db,
    "categories",
    id
    )
    
    );
    
    setCategories(
    
    categories.filter(
    (c)=>
    c.id!==id
    )
    
    );
    
    toast.success(
    "Deleted"
    );
    
    };
    
    return(
    
    <div>
    
    <h1
    className="
    text-4xl
    font-bold
    mb-10
    "
    >
    
    Categories
    
    </h1>
    
    <div
    className="
    bg-white
    p-8
    rounded-3xl
    "
    >
    
    <div
    className="
    flex
    gap-4
    mb-8
    "
    >
    
    <input
    
    value={name}
    
    onChange={
    (e)=>
    setName(
    e.target.value
    )
    }
    
    placeholder="
    Category Name
    "
    
    className="
    flex-1
    border
    px-5
    py-3
    rounded-xl
    "
    />
    
    <button
    
    onClick={
    addCategory
    }
    
    className="
    bg-black
    text-white
    px-6
    rounded-xl
    "
    
    >
    
    Add
    
    </button>
    
    </div>
    
    <div
    className="
    space-y-4
    "
    >
    
    {
    
    categories.map(
    (cat)=>(
    
    <div
    
    key={
    cat.id
    }
    
    className="
    flex
    justify-between
    border
    p-5
    rounded-xl
    "
    
    >
    
    <span>
    
    {
    cat.name
    }
    
    </span>
    
    <button
    
    onClick={()=>
    
    remove(
    cat.id
    )
    
    }
    
    className="
    text-red-500
    "
    
    >
    
    Delete
    
    </button>
    
    </div>
    
    )
    
    )
    
    }
    
    </div>
    
    </div>
    
    </div>
    
    );
    
    };
    
    export default AdminCategories;