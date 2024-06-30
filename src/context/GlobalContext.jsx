import { createContext, useState } from "react";
import UseFetch from "../hooks/UseFetch";

export const GlobalContext = createContext();

const getDefaultCarts = () => {
  let cart = {};
  for (let i = 1; i < 31; i++) {
    cart[i] = 0;
  }
  return cart;
};

export const GlobalContextProvider = ({ children }) => {
  const { data: products } = UseFetch("https://dummyjson.com/products");

  const [cartItems, setCartItems] = useState(getDefaultCarts());

  const getTotalAmount = () => {
    let totalAmount = 0;
    for (let item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = products.find((product) => product.id == item);
        totalAmount += cartItems[item] * itemInfo.price;
      }
    }
    return totalAmount;
  };
  const getTotalItems = () => {
    let totalItems = 0;
    for (let item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = products.find((product) => product.id == item);
        totalItems += cartItems[item];
      }
    }
    return totalItems;
  };
  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };
  const updateCart = (newAmount, itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
  };
  const contextValue = { cartItems, addToCart, removeFromCart, updateCart,getTotalAmount,getTotalItems };
  console.log(cartItems);
  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};
