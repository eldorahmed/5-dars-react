import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { FaTrashAlt } from "react-icons/fa";

function CartItem({ data: product }) {
  const { cartItems, addToCart, removeFromCart, updateCart, deleteFromCart } =
    useContext(GlobalContext);
  return (
    <div className=" max-w-[550px] w-full flex items-center gap-4 justify-start border-2  rounded-3xl mb-4 shadow-lg">
      <img className="w-36" src={product.thumbnail} alt="" />

      <div>
        <h5 className="mb-4">
          <b>{product.title}</b>
        </h5>
        <p className="text-left text-xl">
          $ {(Number(product.price) * cartItems[product.id]).toFixed(2)}
        </p>
        <div className="text-left mt-4">
          <button
            onClick={() => removeFromCart(product.id)}
            className="bg-red-700 rounded-lg px-2 text-white active:scale-90 transition focus:outline-none"
          >
            {" "}
            -{" "}
          </button>
          <input
            className="border-2 w-12 rounded-lg text-center"
            onChange={(e) => updateCart(Number(e.target.value), product.id)}
            value={cartItems[product.id]}
          />
          <button
            onClick={() => addToCart(product.id)}
            className="bg-red-700 px-2 rounded-lg text-white active:scale-90 transition focus:outline-none"
          >
            {" "}
            +{" "}
          </button>
        </div>
      </div>
      <button
        onClick={() => {
          deleteFromCart(product.id);
        }}
        className="btn ml-auto mr-5"
      >
        {" "}
        <FaTrashAlt className="w-6 h-6" />
      </button>
    </div>
  );
}

export default CartItem;
