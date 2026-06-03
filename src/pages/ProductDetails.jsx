import React, { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import { CartContext } from "../context/CartContext";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const { products, setProducts } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);
  const { id } = useParams();

  const product = products.find((item) => item.id === id);

  const [mainImage, setMainImage] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const [reviewName, setReviewName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);

  // set image + color when product loads
  useEffect(() => {
    if (product) {
      setMainImage(product.image);
      if (product.colors?.length) {
        setSelectedColor(product.colors[0]);
      }
    }
  }, [product]);

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

  const addReview = () => {
    if (!reviewName || !reviewText) {
      toast.error("Fill all fields");
      return;
    }

    const newReview = {
      id: Date.now(),
      name: reviewName,
      text: reviewText,
      rating,
    };

    const updatedProducts = products.map((item) =>
      item.id === product.id
        ? {
            ...item,
            reviews: [...(item.reviews || []), newReview],
          }
        : item
    );

    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));

    toast.success("Review Added");

    setReviewName("");
    setReviewText("");
    setRating(5);
  };

  const averageRating = product?.reviews?.length
    ? (
        product.reviews.reduce((sum, r) => sum + r.rating, 0) /
        product.reviews.length
      ).toFixed(1)
    : 0;

  const relatedProducts = products.filter(
    (item) => item?.category === product?.category && item.id !== product.id
  );

  return (
    <section className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">

          {/* IMAGE */}
          <div>
            <img
              src={mainImage}
              alt={product.title}
              className="w-full rounded-3xl shadow-lg"
            />

            <div className="flex gap-4 mt-5 flex-wrap">
              {(product.images || []).map((img, index) => (
                <img
                  key={index}
                  src={img}
                  onClick={() => setMainImage(img)}
                  className={`w-24 h-24 object-cover rounded-2xl cursor-pointer border-4 ${
                    mainImage === img ? "border-black" : "border-transparent"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* INFO */}
          <div>
            <h1 className="text-5xl font-bold">{product.title}</h1>

            <p className="text-3xl font-semibold mt-5">{product.price}</p>

            {/* COLORS */}
            <div className="mt-6">
              <h3 className="font-bold mb-3">Color</h3>
              <div className="flex gap-3 flex-wrap">
                {product.colors?.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-full border ${
                      selectedColor === color
                        ? "bg-black text-white"
                        : "bg-white"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <p className="mt-8 text-gray-600 leading-8 text-lg border-t pt-6">
              {product.description || "No description available"}
            </p>

            <p className="mt-4 text-lg font-medium">
              Stock:
              <span
                className={`ml-2 ${
                  (product.stock ?? 0) > 0
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {product.stock ?? 0}
              </span>
            </p>

            <p className="mt-3 text-yellow-500 font-bold">
              ⭐ {averageRating}/5 ({product.reviews?.length || 0} Reviews)
            </p>

            <button
              onClick={() => addToCart({ ...product, selectedColor })}
              disabled={(product.stock ?? 0) <= 0}
              className={`mt-8 px-8 py-4 rounded-full ${
                (product.stock ?? 0) <= 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              {(product.stock ?? 0) <= 0 ? "Out Of Stock" : "Add To Cart"}
            </button>
          </div>
        </div>

        {/* RELATED */}
        <div className="mt-24">
          <h2 className="text-4xl font-bold mb-10">Related Products</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((item) => (
              <Link
                to={`/product/${item.id}`}
                key={item.id}
                className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl"
              >
                <img
                  src={item.image}
                  className="h-[320px] w-full object-cover"
                />
                <div className="p-5">
                  <h3 className="text-2xl font-bold">{item.title}</h3>
                  <p className="mt-3 font-semibold">{item.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* REVIEWS */}
        <div className="mt-20">
          <h2 className="text-4xl font-bold mb-10">Customer Reviews</h2>

          {/* ADD REVIEW */}
          <div className="bg-gray-100 p-8 rounded-3xl mb-12">
            <input
              value={reviewName}
              onChange={(e) => setReviewName(e.target.value)}
              placeholder="Your Name"
              className="w-full border p-3 mb-5"
            />

            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Write review..."
              className="w-full border p-3 mb-5"
            />

            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full border p-3 mb-5"
            >
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>

            <button
              onClick={addReview}
              className="bg-black text-white px-8 py-4 rounded-2xl"
            >
              Submit Review
            </button>
          </div>

          {/* LIST */}
          <div className="space-y-6">
            {(product.reviews || []).map((review) => (
              <div key={review.id} className="bg-white p-6 shadow-md rounded-3xl">
                <h3 className="font-bold text-xl">{review.name}</h3>
                <p className="text-yellow-500">⭐ {review.rating}/5</p>
                <p className="text-gray-600 mt-2">{review.text}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProductDetails;
