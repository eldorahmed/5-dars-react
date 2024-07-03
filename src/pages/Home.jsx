import { useEffect, useState,useContext } from "react";
import ProductsList from "../components/ProductsList";
import Overlay from "../components/Overlay";
import { GlobalContext } from "../context/GlobalContext";
import UseFetch from "../hooks/UseFetch";


function Home() {
  const [visibleProducts, setVisibleProducts] = useState(6);
  const handleSeeMore = () => {
    setVisibleProducts(prevVisibleProducts => prevVisibleProducts + 6);
  };
  const handleSeeLess=()=>{
    setVisibleProducts(6)
  }

  const{data:products,isPending,error}=UseFetch('https://dummyjson.com/products')
  return (
    <div>
      {isPending && <Overlay />}
      {products && <ProductsList products={products} visibleProducts={visibleProducts} />}
      <div className="text-center"><button onClick={visibleProducts==30 ? handleSeeLess : handleSeeMore} className="btn bg-slate-300 mt-5  mb-10">
        {visibleProducts==30? "This is the end !See Less" : "See More"}</button></div>
    </div>
  );
}

export default Home;
