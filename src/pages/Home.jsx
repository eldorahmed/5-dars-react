import { useEffect, useState } from "react";
import ProductsList from "../components/ProductsList";
import Overlay from "../components/Overlay";
import Badge from "@mui/joy/Badge";
import Typography from "@mui/joy/Typography";

function Home() {
  const [products, setProducts] = useState();
  const [isPending, setIsPending] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsPending(true);
      const req = await fetch("https://dummyjson.com/products");
      const data = await req.json();
      setProducts(data.products);
      setIsPending(false);
    };
    fetchData();
  }, []);
  console.log(products);
  return (
    <div>
      <nav className="flex justify-between items-center">
        <h1 className="text-4xl mb-10 cursor-pointer">All Products</h1>
        <Badge sx={{ cursor: "pointer" }}>
          <Typography fontSize="xl">
            🛒 <span className="text-sm">0 items</span>
          </Typography>
        </Badge>
      </nav>
      {isPending && <Overlay />}
      {products && <ProductsList products={products} />}
    </div>
  );
}

export default Home;
