import UseFetch from "../hooks/UseFetch";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";

function Cart() {
  const { cartItems, addToCart, removeFromCart, getTotalAmount } =
    useContext(GlobalContext);
  const totalAmount = getTotalAmount();

  const { data: products } = UseFetch("https://dummyjson.com/products");
  return (
    <div className="flex flex-col items-center justify-center">
      <div>
        <h1 className="text-5xl text-center mt-20 mb-10">Your Cart Items</h1>
      </div>
      {products &&
        products.map((product) => {
          if (cartItems[product.id] !== 0) {
            return <CartItem data={product} />;
          }
        })}
      {totalAmount > 0 ? (
        <div>
          <p className="text-2xl text-left mb-4 ">
            Subtotal: $ {totalAmount.toFixed(2)}
          </p>
          <div>
            <button className="btn btn-accent mr-1">Checkout</button>
            <Link to="/" className="btn btn-success">
              Continue Shopping
            </Link>
          </div>
        </div>
      ) : (
        <h1 className="text-6xl text-red-700 mt-10"> Cart is Empty!</h1>
      )}
    </div>
  );
}

export default Cart;
