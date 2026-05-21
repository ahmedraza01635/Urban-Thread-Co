import React, {
  useContext,
  useState,
  useEffect,
} from "react";

import { Link } from "react-router-dom";

import { ProductContext }
from "../context/ProductContext";

const Shop = () => {

  const { products } =
    useContext(ProductContext);

  const [search, setSearch] =
    useState("");

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("All");

  const [sortBy,
    setSortBy] =
    useState("latest");

  const [
    currentPage,
    setCurrentPage,
  ] = useState(1);

  useEffect(() => {

    window.scrollTo({
    
    top: 0,
    
    behavior: "smooth",
    
    });
    
    }, [currentPage]);

  const productsPerPage = 8;

  // Categories
  const categories = [

    "All",

    ...new Set(
      products
        .map(
          (item) =>
            item.category
        )
        .filter(Boolean)
    ),

  ];

  // Filter
  const filteredProducts =
    products.filter(
      (product) => {

        const matchesSearch =

          product.title
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            );

        const matchesCategory =

          selectedCategory ===
            "All"
          ||

          product.category ===
            selectedCategory;

        return (
          matchesSearch &&
          matchesCategory
        );

      }
    );

  // Sort
  const sortedProducts =
    [...filteredProducts];

  if (
    sortBy === "low"
  ) {

    sortedProducts.sort(
      (a, b) =>
        Number(a.price) -
        Number(b.price)
    );

  }

  if (
    sortBy === "high"
  ) {

    sortedProducts.sort(
      (a, b) =>
        Number(b.price) -
        Number(a.price)
    );

  }

  if (
    sortBy ===
    "latest"
  ) {

    sortedProducts.reverse();

  }

  // Reset page
  useEffect(() => {

    setCurrentPage(1);

  }, [
    search,
    selectedCategory,
    sortBy,
  ]);

  // Pagination
  const totalPages =
    Math.ceil(
      sortedProducts.length /
      productsPerPage
    );

  const currentProducts =

    sortedProducts.slice(

      (
        currentPage - 1
      ) *
      productsPerPage,

      currentPage *
      productsPerPage

    );

  return (

<section className="py-20 min-h-screen">

<div className="container mx-auto px-6">

<div className="text-center mb-12">

<h1 className="text-5xl font-bold">

Shop

</h1>

</div>

{/* Filters */}

<div className="flex flex-col md:flex-row gap-4 mb-10">

<input

type="text"

placeholder="Search"

value={search}

onChange={(e)=>

setSearch(
e.target.value
)

}

className="
border
rounded-xl
px-5
py-3
w-full
"

/>

<select

value={
selectedCategory
}

onChange={(e)=>

setSelectedCategory(
e.target.value
)

}

className="
border
rounded-xl
px-5
py-3
"

>

{

categories.map(
(cat)=>(

<option
key={cat}
value={cat}
>

{cat}

</option>

)

)

}

</select>

<select

value={sortBy}

onChange={(e)=>

setSortBy(
e.target.value
)

}

className="
border
rounded-xl
px-5
py-3
"

>

<option value="latest">
Latest
</option>

<option value="low">
Price ↑
</option>

<option value="high">
Price ↓
</option>

</select>

</div>

{/* Products */}

<div className="
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-4
gap-8
">

{

currentProducts.length >
0

?

currentProducts.map(
(product)=>(

<Link

to={`/product/${product.id}`}

key={product.id}

className="
bg-white
rounded-3xl
overflow-hidden
shadow-md
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

<h2 className="font-bold text-xl">

{product.title}

</h2>

<p className="text-gray-500">

{product.category}

</p>

<p className="text-2xl font-bold">

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

<p
className="
text-gray-500
"
>

Try another search
or category

</p>

</div>

)

}

</div>

{/* Pagination */}

{

totalPages > 1 && (

<div
className="
flex
justify-center
gap-3
mt-14
"
>

<button

disabled={
currentPage===1
}

onClick={()=>

setCurrentPage(
prev=>
prev-1
)

}

className="
bg-black
text-white
px-6
py-3
rounded-xl
"

>

Prev

</button>

<span
className="
font-bold
text-xl
"
>

{currentPage}

/

{totalPages}

</span>

<button

disabled={
currentPage===
totalPages
}

onClick={()=>

setCurrentPage(
prev=>
prev+1
)

}

className="
bg-black
text-white
px-6
py-3
rounded-xl
"

>

Next

</button>

</div>

)

}

</div>

</section>

);

};

export default Shop;