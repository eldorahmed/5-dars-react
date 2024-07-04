import { Link, useNavigate, NavLink } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import toast from "react-hot-toast";
import { logo } from "../assets";
function Navbar() {
  const signOutProfile = async () => {
    await signOut(auth);
    toast.success("See you soon!");
  };
  const { user, getTotalAmount, getTotalItems } = useGlobalContext();
  const totalAmount = getTotalAmount();
  const totalItems = getTotalItems();

  return (
    <div className="container  px-10 max-w-[1380px] sticky top-0 z-20 mx-auto">
      <div className="  navbar bg-base-100 ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <NavLink className='font-semibold' to="/">Home</NavLink>
              </li>
              <li>
                <NavLink className='font-semibold' to="/about">About</NavLink>
              </li>
              <li>
                <NavLink className='font-semibold' to="/contact">Contact</NavLink>
              </li>
            </ul>
          </div>
          <Link to="/" className="  hover:scale-105">
            <img className="w-24 cursor-pointer" src={logo} alt="LOGO" />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link className='font-semibold' to="/">Home </Link>
            </li>
            <li>
              <Link className='font-semibold' to="/about">About</Link>
            </li>
            <li>
              <Link className='font-semibold' to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <p className="font-medium">{user.displayName}</p>
          <div className="dropdown dropdown-end mr-2">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar cursor-pointer"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={
                    user.photoURL
                      ? user.photoURL
                      : "https://freight.cargo.site/t/original/i/a80d0a3b47187f1b4614528914996af4a56216840bd3d903e85b2a8d348ec9c7/Artboard-2.png"
                  }
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span onClick={signOutProfile} className="badge">
                    New
                  </span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a onClick={signOutProfile}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle cursor-pointer"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#c81e1e"
                  className="size-7"
                >
                  <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                </svg>

                <span className="badge badge-lg indicator-item">
                  {totalItems}
                </span>
              </div>
            </div>
            <div
              tabIndex={0}
              className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
            >
              <div className="card-body">
                <span className="text-lg font-bold">{totalItems} Items</span>
                <span className="text-info">
                  Subtotal: {totalAmount.toFixed(2)} $
                </span>
                <div className="card-actions">
                  <Link to="/cart" className="btn-custom btn-block text-center">
                    View cart
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
