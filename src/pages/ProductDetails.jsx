import React, {
  useContext,
  useState,
  useEffect,
} from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import toast from "react-hot-toast";


const ProductDetails = () => {




  const [mainImage, setMainImage] =
    useState("");



  const [reviewName, setReviewName] =
    useState("");

  const [reviewText, setReviewText] =
    useState("");

  const [rating, setRating] =
    useState(5);
  const { products, setProducts } =
    useContext(ProductContext);
  const { addToCart } = useContext(CartContext);


  const { id } = useParams();

  const product =
    products.find(
      (item) => item.id === id
    );
  useEffect(() => {

    if (product) {
      setMainImage(product.image);
    }

  }, [product]);
  const addReview = () => {

    if (
      !reviewName ||
      !reviewText
    ) {

      toast.error(
        "Fill all fields"
      );

      return;

    }

    const newReview = {

      id:
        Date.now(),

      name:
        reviewName,

      text:
        reviewText,

      rating,

    };

    const updatedProducts =

      products.map(
        (item) =>

          item.id ===
            product.id

            ?

            {

              ...item,

              reviews: [

                ...(item.reviews || []),

                newReview,

              ],

            }

            :

            item

      );

    setProducts(
      updatedProducts
    );

    // local save
    localStorage.setItem(

      "products",

      JSON.stringify(
        updatedProducts
      )

    );

    toast.success(
      "Review Added"
    );

    setReviewName("");

    setReviewText("");

    setRating(5);

  };
  const averageRating =

    product?.reviews
      ?.length

      ?

      (

        product.reviews.reduce(

          (sum, r) =>

            sum +
            r.rating,

          0

        )

        /

        product.reviews.length

      ).toFixed(1)

      :

      0;

  const relatedProducts =
    products.filter(
      (item) =>
        item?.category ===
        product?.category &&
        item.id !== product.id
    );

  if (!products.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Product Not Found
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">

          {/* Product Image */}
          <div>

            {/* Main Image */}
            <img
              src={mainImage}
              alt={product.title}
              className="w-full rounded-3xl shadow-lg"
            />

            {/* Thumbnails */}
            <div className="flex gap-4 mt-5 flex-wrap">

              {(product.images || []).map(
                (img, index) => (

                  <img
                    key={index}
                    src={img}
                    alt=""
                    onClick={() =>
                      setMainImage(img)
                    }
                    className={`w-24 h-24 object-cover rounded-2xl cursor-pointer border-4 ${mainImage === img
                      ? "border-black"
                      : "border-transparent"
                      }`}
                  />

                )
              )}

            </div>

          </div>

          {/* Product Info */}
          <div>

            <h1 className="text-5xl font-bold text-gray-900">
              {product.title}
            </h1>


            <p
              className="
text-3xl
font-semibold
mt-5
"
            >

              {product.price}

            </p>
            <p
              className="
mt-4
text-lg
font-medium
"
            >

              Stock:

              <span
                className={`

ml-2

${(product.stock ?? 0) > 0

                    ?

                    "text-green-600"

                    :

                    "text-red-500"

                  }

`}
              >

                {

                  (product.stock ?? 0)

                }

              </span>

            </p>

            <p
              className="
mt-3
text-yellow-500
font-bold
"
            >

              ⭐

              {averageRating}

              /5

              (

              {

                product.reviews
                  ?.length

                ||

                0

              }

              Reviews)

            </p>

            <button

              onClick={() =>
                addToCart(product)
              }

              disabled={
                (product.stock ?? 0) <= 0
              }

              className={`
mt-8
px-8
py-4
rounded-full
transition

${(product.stock ?? 0) <= 0

                  ?

                  "bg-gray-400 text-white cursor-not-allowed"

                  :

                  "bg-black text-white hover:bg-gray-800"

                }
`}

            >

              {
                (product.stock ?? 0) <= 0

                  ?

                  "Out Of Stock"

                  :

                  "Add To Cart"
              }

            </button>
          </div>
          {/* RELATED PRODUCTS */}
          <div className="mt-24">

            <h2 className="text-4xl font-bold mb-10">
              Related Products
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

              {relatedProducts.map((item) => (

                <Link
                  to={`/product/${item.id}`}
                  key={item.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition"
                >

                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-[320px] w-full object-cover"
                  />

                  <div className="p-5">

                    <h3 className="text-2xl font-bold">
                      {item.title}
                    </h3>

                    <p className="mt-3 font-semibold">
                      {item.price}
                    </p>

                  </div>

                </Link>

              ))}

            </div>

          </div>

          {/* REVIEWS */}
          <div className="mt-20">

            <h2 className="text-4xl font-bold mb-10">
              Customer Reviews
            </h2>


            {/* Add Review */}
            <div className="bg-gray-100 p-8 rounded-3xl mb-12">

              <input
                type="text"
                placeholder="Your Name"
                value={reviewName}
                onChange={(e) =>
                  setReviewName(e.target.value)
                }
                className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-5"
              />


              <textarea
                rows="5"
                placeholder="Write review..."
                value={reviewText}
                onChange={(e) =>
                  setReviewText(e.target.value)
                }
                className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-5"
              ></textarea>

              <select
                value={rating}
                onChange={(e) =>
                  setRating(Number(e.target.value))
                }
                className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-5"
              >

                <option value="5">
                  5 Stars
                </option>

                <option value="4">
                  4 Stars
                </option>

                <option value="3">
                  3 Stars
                </option>

                <option value="2">
                  2 Stars
                </option>

                <option value="1">
                  1 Star
                </option>

              </select>

              <button
                onClick={addReview}
                className="bg-black text-white px-8 py-4 rounded-2xl"
              >
                Submit Review
              </button>

            </div>

            {/* Reviews List */}
            <div className="space-y-6">

              {(product.reviews || []).map(
                (review) => (

                  <div
                    key={review.id}
                    className="bg-white p-6 rounded-3xl shadow-md"
                  >

                    <div className="flex items-center justify-between mb-4">

                      <h3 className="font-bold text-xl">
                        {review.name}
                      </h3>

                      <span className="text-yellow-500 font-bold">
                        ⭐ {review.rating}/5
                      </span>

                    </div>

                    <p className="text-gray-600 leading-7">
                      {review.text}
                    </p>

                  </div>

                )
              )}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default ProductDetails;