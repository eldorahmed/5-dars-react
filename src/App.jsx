import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import RootLayout from './layouts/RootLayout'
import ProductDetails from './components/ProductDetails'
import ErrorPage from '../ErrorPage'


function App() {
  const routes=createBrowserRouter([
    {
      path:'/',
      element:<RootLayout/>,
      errorElement:<ErrorPage/>,
      children:[
        {
          index:true,
          element:<Home/>
        },
        {
          path:"productDetails/:id",
          element:<ProductDetails/>
        },
       
      ]
    }
  ])

  return ( <RouterProvider router={routes}/>
  )
}

export default App
