import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Overlay from "./Overlay";
import { useGlobalContext } from "../context/GlobalContext";
function ProductDetails() {
  const { addToCart, cartItems } = useGlobalContext();
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [isPending, setIsPending] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      setIsPending(true);
      const req = await fetch("https://dummyjson.com/product/" + id);
      const data = await req.json();
      setProduct(data);
      setTimeout(() => {
        setIsPending(false);
      }, 1000);
      product && setThumbnail(product.thumbnail);
    };
    fetchData();
  }, []);
  console.log(product);
  console.log(thumbnail);
  const cartItemAmount = product&& cartItems[product.id];

  return (
      
    <div className="container mx-auto mt-32 max-w-[1380px]">
      {isPending && <Overlay />}
      {product && (
        
        <>
          <div className="hero min-h-[50%]">
            <div className="hero-content flex-col lg:flex-row">
              <div className="flex flex-col items-center rounded-lg  shadow-md">
                <img
                  src={thumbnail == null ? product.images[0] : thumbnail}
                  alt=""
                  className="max-w-sm w-full max-h-[350px]"
                />
                <div className="flex items-center gap-2 mb-4">
                  <img
                    onMouseOver={() => setThumbnail(product.images[0])}
                    className="border cursor-pointer max-w-sm "
                    width={35}
                    src={product.images[0]}
                    alt=""
                  />
                  <img
                    onMouseOver={() => setThumbnail(product.images[1])}
                    className="border cursor-pointer max-w-sm "
                    width={35}
                    src={
                      product.images.length == 1
                        ? product.images[0]
                        : product.images[1]
                    }
                    alt=""
                  />
                  <img
                    onMouseOver={() => setThumbnail(product.images[2])}
                    className="border cursor-pointer max-w-sm "
                    width={35}
                    src={
                      product.images.length == 1
                        ? product.images[0]
                        : product.images[2]
                    }
                    alt=""
                  />
                </div>
              </div>
              <div className="flex flex-col gap-24">
                <div>
                  <h2 className="btn self-center ">{product.category}</h2>
                  <h2 className="btn btn-warning self-center  ml-2">
                    {product.discountPercentage} %
                  </h2>
                </div>
                <h2 className="text-xl font-semibold">{product.title}</h2>
                <div className="flex items-center gap-8">
                  <p className="text-2xl font-bold">{product.price} $</p>
                  <button
                    onClick={() => addToCart(product.id)}
                    className="btn-custom"
                  >
                    Add to Cart {cartItemAmount > 0 && <> ({cartItemAmount})</>}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <p className="max-w-[500px] w-full text-center mx-auto mb-10">
            {product.description}
          </p>
        </>
      )}
      <div className="flex justify-center">
        <Link className="btn self-center" to="/">
          All Products
        </Link>
      </div>
    </div>
  );
}

export default ProductDetails;
