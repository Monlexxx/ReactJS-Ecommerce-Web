import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "./pages/Root";
import Home from "./pages/HomePage";
import Shop from "./pages/ShopPage";
import Cart from "./pages/CartPage";
import Checkout from "./pages/CheckoutPage";
import Login from "./pages/LoginPage";
import Detail from "./pages/DetailPage";
import Register from "./pages/RegisterPage";

// Dùng thư viện react-router-dom để tạo các đường dẫn
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    // Dùng đường dẫn tương đối để điều hướng
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "shop",
        element: <Shop />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "detail/:productId",
        element: <Detail />,
      },
    ],
  },
]);

// Truyền router được tạo bởi createBrowserRouter, sử dụng RouterProvider
function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
