import React, {
    createContext,
    useEffect,
    useState,
  } from "react";
  
  export const WishlistContext =
    createContext();
  
  const WishlistProvider = ({
    children,
  }) => {
  
    const [wishlistItems, setWishlistItems] =
      useState(() => {
  
        const savedWishlist =
          localStorage.getItem(
            "wishlistItems"
          );
  
        return savedWishlist
          ? JSON.parse(savedWishlist)
          : [];
      });
  
    useEffect(() => {
  
      localStorage.setItem(
        "wishlistItems",
        JSON.stringify(wishlistItems)
      );
  
    }, [wishlistItems]);
  
    // ADD / REMOVE
    const toggleWishlist = (product) => {
  
      const exists = wishlistItems.find(
        (item) => item.id === product.id
      );
  
      if (exists) {
  
        const filtered =
          wishlistItems.filter(
            (item) =>
              item.id !== product.id
          );
  
        setWishlistItems(filtered);
  
      } else {
  
        setWishlistItems([
          ...wishlistItems,
          product,
        ]);
  
      }
    };
  
    return (
      <WishlistContext.Provider
        value={{
          wishlistItems,
          toggleWishlist,
        }}
      >
        {children}
      </WishlistContext.Provider>
    );
  };
  
  export default WishlistProvider;