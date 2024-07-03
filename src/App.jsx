import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import RootLayout from "./layouts/RootLayout";
import ProductDetails from "./components/ProductDetails";
import ErrorPage from "../ErrorPage";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Login from "./components/Login";
import Cart from "./components/Cart";
import Register from "./components/Register";
import { action as LoginAction } from "./components/Login";
import { action as RegisterAction } from "./components/Register";
import { useGlobalContext } from "./context/GlobalContext";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";
import Contact from "./pages/Contact";
import About from "./pages/About";

function App() {
  const{user,dispatch,isAuthReady}=useGlobalContext()
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes user={user}>
          <RootLayout />
        </ProtectedRoutes>
      ),

      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "productDetails/:id",
          element: <ProductDetails />,
        },
        { path: "cart", 
        element: <Cart /> 
      },
        { path: "about", 
        element: <About /> 
      },
        { path: "contact", 
        element: <Contact /> 
      },
      ],
    },
    {
      path: "login",
      element: user ? <Navigate to='/'/> : <Login />,
      action: LoginAction,

    },
    {
      path: "register",
      element: user ? <Navigate to='/'/> :  <Register />,
      action:RegisterAction,
    },
  ]);


  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      dispatch({type:"LOG_IN",payload:user})
      dispatch({type:"IS_AUTH_READY"})
    })
    },[])

  return <> {isAuthReady && <RouterProvider router={routes} /> }</> ;
  
}



export default App;
