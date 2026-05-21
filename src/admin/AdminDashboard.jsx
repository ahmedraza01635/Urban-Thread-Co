import React, {
  useContext,
} from "react";

import { ProductContext }
from "../context/ProductContext";

import { OrderContext }
from "../context/OrderContext";

const AdminDashboard = () => {

  const { products } =
    useContext(ProductContext);
    const lowStock =

products.filter(

(product)=>

(product.stock ?? 0)

<=

5

);

  const { orders } =
    useContext(OrderContext);

  // UNIQUE CATEGORIES
  const categories =
    [
      ...new Set(
        products.map(
          (item) => item.category
        )
      ),
    ];

  // TOTAL REVENUE
  const revenue =
    orders.reduce(
      (total, item) =>

        total +
        Number(item.total || 0),

      0
    );

  return (
    <div>

      {/* Heading */}
      <div className="mb-10">

        <h1 className="text-5xl font-bold text-gray-900">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-3">
          Welcome back Admin 👋
        </p>

      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">

        {/* Products */}
        <div className="bg-white p-8 rounded-3xl shadow-md">

          <h2 className="text-gray-500 text-lg">
            Total Products
          </h2>

          <h1 className="text-5xl font-bold mt-4">
            {products.length}
          </h1>

        </div>

        {/* Categories */}
        <div className="bg-white p-8 rounded-3xl shadow-md">

          <h2 className="text-gray-500 text-lg">
            Categories
          </h2>

          <h1 className="text-5xl font-bold mt-4">
            {categories.length}
          </h1>

        </div>

        {/* Orders */}
        <div className="bg-white p-8 rounded-3xl shadow-md">

          <h2 className="text-gray-500 text-lg">
            Orders
          </h2>

          <h1 className="text-5xl font-bold mt-4">
            {orders.length}
          </h1>

        </div>

        {/* Revenue */}
        <div className="bg-white p-8 rounded-3xl shadow-md">

          <h2 className="text-gray-500 text-lg">
            Revenue
          </h2>

          <h1 className="text-5xl font-bold mt-4">
            ${revenue}
          </h1>

        </div>

      </div>

      {/* Recent Products */}
      <div className="mt-14 bg-white rounded-3xl shadow-md p-8">

        <h2 className="text-3xl font-bold mb-8">
          Recent Products
        </h2>

        <div className="space-y-5">

          {products
            .slice(0, 5)
            .map((product) => (

            <div
              key={product.id}
              className="flex items-center gap-5 border-b pb-5"
            >

              <img
                src={product.image}
                alt={product.title}
                className="w-20 h-20 rounded-2xl object-cover"
              />

              <div>

                <h3 className="font-bold text-lg">
                  {product.title}
                </h3>

                <p className="text-gray-500">
                  {product.price}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>
      {/* LOW STOCK */}

<div
className="
mt-14
bg-white
rounded-3xl
shadow-md
p-8
"
>

<h2
className="
text-3xl
font-bold
mb-8
text-red-500
"
>

Low Stock Alert

</h2>

{

lowStock.length
=== 0

?

(

<p>

All Products Healthy ✅

</p>

)

:

(

<div
className="
space-y-4
"
>

{

lowStock.map(

(product)=>(

<div

key={
product.id
}

className="
flex
justify-between
border-b
pb-4
"

>

<span>

{
product.title
}

</span>

<span
className="
text-red-500
font-bold
"
>

Stock:

{
product.stock
}

</span>

</div>

)

)

}

</div>

)

}

</div>

    </div>
  );
};

export default AdminDashboard;