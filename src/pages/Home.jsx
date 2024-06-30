import { useEffect, useState,useContext } from "react";
import ProductsList from "../components/ProductsList";
import Overlay from "../components/Overlay";
import { GlobalContext } from "../context/GlobalContext";
import UseFetch from "../hooks/UseFetch";


function Home() {

  const{data:products,isPending,error}=UseFetch('https://dummyjson.com/products')
  return (
    <div>
      {isPending && <Overlay />}
      {products && <ProductsList products={products} />}
    </div>
  );
}

export default Home;
