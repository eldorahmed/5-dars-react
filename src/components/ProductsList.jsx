import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Chip from "@mui/joy/Chip";
import Typography from "@mui/joy/Typography";
import { NavLink } from "react-router-dom";
import { useContext,useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
// import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

export default function ProductsList({ products ,visibleProducts }) {
  const { cartItems, addToCart } = useContext(GlobalContext);


  return (
    <div className=" container mx-auto px-2 sm:px-10 flex flex-wrap gap-8  justify-center max-w-[1380px] ">
      {products.slice(0, visibleProducts).map((product) => {
        const cartItemAmount = cartItems[product.id];
        return (
          <div
            key={product.id}
            className="inline-block hover:scale-[1.01] hover:shadow-xl transition"
          >
            <Card sx={{ width: 320, maxWidth: "100%", boxShadow: "lg" }}>
              <CardOverflow>
                <AspectRatio objectFit="contain" sx={{ minWidth: 200 }}>
                  <NavLink to={`productDetails/${product.id}`}>
                    <img
                      className=""
                      src={product.thumbnail}
                      loading=""
                      alt=""
                    />
                  </NavLink>
                </AspectRatio>
              </CardOverflow>
              <CardContent>
                <Typography sx={{ fontSize: 16, height: 32 }} level="body-xs">
                  {product.title}
                </Typography>

                <Typography
                  level="title-lg"
                  sx={{ mt: 1, fontWeight: "xl" }}
                  endDecorator={
                    <Chip
                      component="span"
                      size="sm"
                      variant="soft"
                      color="success"
                    >
                      {product.discountPercentage} % OFF
                    </Chip>
                  }
                >
                  {product.price} $
                </Typography>
                <Typography level="body-sm">
                  (Only <b>{product.stock}</b> left in stock!)
                </Typography>
              </CardContent>
              <CardOverflow>
                <Button
                  onClick={() => addToCart(product.id)}
                  variant="solid"
                  color="danger"
                  size="lg"
                >
                  Add to cart {cartItemAmount > 0 && <> ({cartItemAmount})</>}
                </Button>
              </CardOverflow>
            </Card>
          </div>
        );
      })}
    </div>
  );
}
