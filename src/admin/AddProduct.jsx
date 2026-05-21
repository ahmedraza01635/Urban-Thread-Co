import React, {
  useContext,
  useState,
  useEffect
} from "react";

import {
  ProductContext,
} from "../context/ProductContext";

import {
  collection,
  addDoc,
  getDocs
} from "firebase/firestore";

import {
  db,
} from "../firebase";

import toast from "react-hot-toast";

const AddProduct = () => {

  const [
    categories,
    setCategories
    ]=
    useState([]);
    useEffect(() => {

      const fetchCategories =
      async()=>{
      
      try{
      
      const snap =
      await getDocs(
      collection(
      db,
      "categories"
      )
      );
      
      setCategories(
      
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
      
      fetchCategories();
      
      },[]);

  const {
    setProducts,
  } =
    useContext(
      ProductContext
    );

  const [title, setTitle] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [images, setImages] =
    useState([]);

  const [
    description,
    setDescription,
  ] =
    useState("");

  const [
    category,
    setCategory,
  ] =
    useState("");

  // FIX
  const [
    stock,
    setStock,
  ] =
    useState(10);
    

  const uploadImage =
    async (
      file
    ) => {

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
            method:
              "POST",

            body:
              data,
          }

        );

      const result =
        await res.json();

      return result.secure_url;

    };

  const handleSubmit =
    async (
      e
    ) => {

      e.preventDefault();

      if (
        !title ||
        !price ||
        !category ||
        !images.length
      ) {

        toast.error(
          "Fill all fields"
        );

        return;

      }

      const newProduct = {

        title,

        price,

        image:
          images[0],

        images,

        category,

        description,

        stock:
          Number(
            stock
          ),

        reviews:
          [],

      };

      try {

        const docRef =
          await addDoc(

            collection(
              db,
              "products"
            ),

            newProduct

          );

        setProducts(
          (
            prev
          ) => [

            ...prev,

            {
              id:
                docRef.id,

              ...newProduct,
            },

          ]
        );

        toast.success(
          "Product Added"
        );

        setTitle("");

        setPrice("");

        setImages([]);

        setDescription("");

        setCategory("");

        setStock(10);

      }

      catch (
        err
      ) {

        console.log(
          err
        );

        toast.error(
          "Add Failed"
        );

      }

    };

  return (

<div>

<h1 className="text-4xl font-bold mb-10">
Add Product
</h1>

<form
onSubmit={handleSubmit}
className="
bg-white
p-8
rounded-3xl
shadow-md
max-w-3xl
"
>

<input
type="text"
placeholder="Title"
value={title}
onChange={(e)=>
setTitle(
e.target.value
)
}
className="w-full border p-4 rounded-xl mb-5"
/>

<input
type="text"
placeholder="Price"
value={price}
onChange={(e)=>
setPrice(
e.target.value
)
}
className="w-full border p-4 rounded-xl mb-5"
/>

<select
value={category}
onChange={(e)=>
setCategory(
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
>

<option value="">
Select Category
</option>

{

categories.map(
(cat)=>(

<option
key={cat.id}
value={cat.name}
>

{cat.name}

</option>

)

)

}

</select>

<input
type="number"
value={stock}
onChange={(e)=>
setStock(
e.target.value
)
}
placeholder="Stock"
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

multiple

accept="image/*"

onChange={async (e)=>{

const files =
Array.from(
e.target.files
);

const loading =
toast.loading(
"Uploading..."
);

const urls =
await Promise.all(
files.map(
uploadImage
)
);

toast.dismiss(
loading
);

setImages(
urls
);

}}

className="
w-full
border
p-4
rounded-xl
mb-5
"
/>

<textarea

rows="5"

value={description}

onChange={(e)=>

setDescription(
e.target.value
)

}

placeholder="Description"

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

Add Product

</button>

</form>

</div>

);

};

export default AddProduct;