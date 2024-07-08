import { createContext, useState, useContext, useReducer } from "react";
import UseFetch from "../hooks/UseFetch";

export const GlobalContext = createContext();
export const useGlobalContext=()=>{
  return useContext(GlobalContext)
}

const getDefaultCarts = () => {
  let cart = {};
  for (let i = 1; i < 31; i++) {
    cart[i] = 0;
  }
  return cart;
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "LOG_IN":
      return { ...state, user: payload };
    case "LOG_OUT":
      return { ...state, user: null };
    case "IS_AUTH_READY":
      return { ...state, isAuthReady: true };
      default:
        return state
  }
};

export const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    user: null,
    isAuthReady: false,
  });

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
  const deleteFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: 0 }));
  };
  const updateCart = (newAmount, itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
  };
  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    updateCart,
    getTotalAmount,
    getTotalItems,
    deleteFromCart,
  };
  console.log(cartItems);
  return (
    <GlobalContext.Provider value={{...contextValue,...state,dispatch}}>
      {children}
    </GlobalContext.Provider>
  );
};
