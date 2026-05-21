import React, {
    createContext,
    useEffect,
    useState,
  } from "react";
  
  export const CartContext = createContext();
  
  
  const CartProvider = ({ children }) => {
  
    const [cartItems, setCartItems] =
      useState(() => {
  
        const savedCart =
          localStorage.getItem("cartItems");
  
        return savedCart
          ? JSON.parse(savedCart)
          : [];
      });
  
    useEffect(() => {
  
      localStorage.setItem(
        "cartItems",
        JSON.stringify(cartItems)
      );
  
    }, [cartItems]);
  
    // ADD TO CART
    const addToCart = (product) => {

        const existingProduct = cartItems.find(
          (item) => item.id === product.id
        );
      
        if (existingProduct) {
      
          const updatedCart = cartItems.map(
            (item) =>
              item.id === product.id
                ? {
                    ...item,
                    quantity: item.quantity + 1,
                  }
                : item
          );
      
          setCartItems(updatedCart);
      
        } else {
      
          setCartItems([
            ...cartItems,
            {
              ...product,
              quantity: 1,
            },
          ]);
      
        }
      };
      const increaseQuantity = (id) => {

        const updatedCart = cartItems.map(
          (item) =>
            item.id === id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item
        );
      
        setCartItems(updatedCart);
      };
      
      const decreaseQuantity = (id) => {
      
        const updatedCart = cartItems.map(
          (item) =>
            item.id === id
              ? {
                  ...item,
                  quantity:
                    item.quantity > 1
                      ? item.quantity - 1
                      : 1,
                }
              : item
        );
      
        setCartItems(updatedCart);
      };
  
    // REMOVE
    const removeFromCart = (id) => {
  
      const updatedCart = cartItems.filter(
        (item) => item.id !== id
      );
  
      setCartItems(updatedCart);
    };
  
    return (
      <CartContext.Provider
        value={{
            cartItems,
            addToCart,
            setCartItems,
            removeFromCart,
            increaseQuantity,
            decreaseQuantity,
        }}
      >
        {children}
      </CartContext.Provider>
    );
  };
  
  export default CartProvider;