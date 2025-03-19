// // //
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Menu from "./components/features/menu/Menu";
import Cart from "./components/features/cart/Cart";
import CreateOrder from "./components/features/order/CreateOrder";
import Order from "./components/features/order/Order";
import AppLayout from "./pages/AppLayout";
import menuLoader from "./components/features/menu/menuLoader";
import orderLoader from "./components/features/order/orderLoader";
import Error from "./pages/Error";
import createOrderAction from "./components/features/order/createOrderAction";
import UpdateOrderAction from "./components/features/order/UpdateOrderAction";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,

    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
        action: createOrderAction,
      },
      {
        path: "/order/:orderId",
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
        action: UpdateOrderAction,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
