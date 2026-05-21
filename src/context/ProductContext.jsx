import React, {
  createContext,
  useEffect,
  useState,
} from "react";

import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "../firebase";

export const ProductContext =
  createContext();

const ProductProvider = ({
  children,
}) => {

  const [products, setProducts] =
    useState([]);

  useEffect(() => {

    const fetchProducts =
      async () => {

        try {

          const querySnapshot =
            await getDocs(
              collection(db, "products")
            );

          const productsData =
            querySnapshot.docs.map(
              (doc) => ({
                id: doc.id,
                ...doc.data(),
              })
            );

          console.log(productsData);

          setProducts(productsData);

        } catch (error) {

          console.log(error);

        }
      };

    fetchProducts();

  }, []);

  return (

    <ProductContext.Provider
      value={{
        products,
        setProducts,
      }}
    >

      {children}

    </ProductContext.Provider>

  );
};

export default ProductProvider;