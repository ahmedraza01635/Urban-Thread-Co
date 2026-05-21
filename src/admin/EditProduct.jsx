import React, {
  useContext,
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebase";

import { ProductContext } from "../context/ProductContext";

const EditProduct = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const { products, setProducts } =
    useContext(ProductContext);

  // FIND PRODUCT
  const product = products.find(
    (item) => item.id === id
  );

  // STATES
  const [title, setTitle] =
    useState("");

  const [price, setPrice] =
    useState("");
  const [stock, setStock] =
    useState(0);

  const [image, setImage] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [description, setDescription] =
    useState("");

  // LOAD PRODUCT DATA
  useEffect(() => {

    if (product) {

      setTitle(product.title);

      setPrice(product.price);

      setStock(
        product.stock || 0
      );

      setImage(product.image);

      setCategory(product.category);

      setDescription(
        product.description
      );
    }

  }, [product]);

  // UPDATE PRODUCT
  const handleUpdate =
    async (e) => {

      e.preventDefault();

      try {

        await updateDoc(

          doc(
            db,
            "products",
            id
          ),

          {

            title,

            price,

            stock:
              Number(stock),

            image,

            category,

            description,

          }

        );

        const updatedProducts =

          products.map(
            (item) =>

              item.id === id

                ?

                {

                  ...item,

                  title,

                  price,

                  stock:
                    Number(stock),

                  image,

                  category,

                  description,

                }

                :

                item

          );

        setProducts(
          updatedProducts
        );

        alert(
          "Product Updated"
        );

        navigate(
          "/admin/products"
        );

      }

      catch (error) {

        console.log(error);

        alert(
          "Update Failed"
        );

      }

    };

  return (
    <div>

      <h1 className="text-4xl font-bold mb-10">
        Edit Product
      </h1>

      <form
        onSubmit={handleUpdate}
        className="bg-white p-8 rounded-3xl shadow-md max-w-3xl"
      >

        {/* Title */}
        <div className="mb-6">

          <label className="block mb-2 font-semibold">
            Product Title
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="w-full border border-gray-300 rounded-xl px-4 py-3"
          />

        </div>

        {/* Price */}
        <div className="mb-6">

          <label className="block mb-2 font-semibold">
            Product Price
          </label>

          <input
            type="text"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value)
            }
            className="w-full border border-gray-300 rounded-xl px-4 py-3"
          />

        </div>
        <div className="mb-6">

          <label className="block mb-2 font-semibold">

            Stock

          </label>

          <input

            type="number"

            value={stock}

            onChange={(e) =>

              setStock(
                Number(
                e.target.value
                )
                )

            }

            className="
w-full
border
border-gray-300
rounded-xl
px-4
py-3
"

            placeholder="
Enter Stock
"

          />

        </div>

        {/* Category */}
        <div className="mb-6">

          <label className="block mb-2 font-semibold">
            Category
          </label>

          <input
            type="text"
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="w-full border border-gray-300 rounded-xl px-4 py-3"
          />

        </div>

        {/* Description */}
        <div className="mb-6">

          <label className="block mb-2 font-semibold">
            Description
          </label>

          <textarea
            rows="5"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            className="w-full border border-gray-300 rounded-xl px-4 py-3"
          ></textarea>

        </div>

        {/* Image URL */}
        <div className="mb-8">

          <label className="block mb-2 font-semibold">
            Product Image URL
          </label>

          <input
            type="text"
            value={image}
            onChange={(e) =>
              setImage(e.target.value)
            }
            className="w-full border border-gray-300 rounded-xl px-4 py-3"
          />

        </div>

        <button
          type="submit"
          className="bg-black text-white px-8 py-4 rounded-xl"
        >
          Update Product
        </button>

      </form>

    </div>
  );
};

export default EditProduct;