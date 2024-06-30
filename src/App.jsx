import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import RootLayout from "./layouts/RootLayout";
import ProductDetails from "./components/ProductDetails";
import ErrorPage from "../ErrorPage";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Login from "./components/Login";
import Cart from "./components/Cart";

function App() {
  const user = true;
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
        { path: "cart", element: <Cart /> },
      ],
    },
    {
      path: "login",
      element: <Login />,
    },
  ]);

  return <RouterProvider router={routes} />;
}

export default App;
