import { GlobalContext } from "../context/GlobalContext";
import { useContext } from "react";
import Badge from "@mui/joy/Badge";
import Typography from "@mui/joy/Typography";
import { Link } from "react-router-dom";


function Navbar() {
    const {getTotalItems}=useContext(GlobalContext)
    const totalItems=getTotalItems()
  return (
    <nav className="flex justify-between items-center max-w-[1260px] w-full fixed top-5 z-20">
    <Link to='/'>
      <h1 className="text-4xl mb-10 cursor-pointer">All Products</h1>
    </Link>
    <Link to='cart'>
      <Badge  sx={{ cursor: "pointer" }}>
        <Typography  fontSize="xl">
          🛒 <span className="text-lg">{totalItems} items</span>
        </Typography>
      </Badge>
    </Link>
  </nav>
  )
}

export default Navbar