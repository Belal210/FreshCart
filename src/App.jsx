import { ToastContainer } from "react-toastify";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import Signup from "./Pages/Signup/Signup";
import Layout from "./Components/Layout/Layout";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Brands from "./Pages/Brands/Brands";
import Cart from "./Pages/Cart/Cart";
import WishList from "./Pages/WishList/WishList";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Orders from "./Pages/Orders/Orders";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import ForgetPassword from "./Pages/ForgetPassword/ForgetPassword";
import VerifyEmail from "./Pages/VerifyEmail/VerifyEmail";
import Checkout from "./Pages/Checkout/Checkout";
import NotFound from "./Pages/NotFound/NotFound";
import AuthProvider from "./context/Auth.context";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import CartProvider from "./context/Cart.context";
import OfflineAlert from "./Components/OfflineAlert/OfflineAlert";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import WishListProvider from "./context/Wishlist.context";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import AccountLayout from "./Components/AccountLayout/AccountLayout";
import AllProducts from "./Pages/AllProducts/AllProducts";
import AllDeals from "./Pages/AllDeals/AllDeals";
import UpdateUserData from "./Pages/UpdateUserData/UpdateUserData";
import ChangeUserPassword from "./Pages/ChangeUserPassword/ChangeUserPassword";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "signup",
          element: <Signup />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "forget-password",
          element: <ForgetPassword />,
        },
        {
          path: "verify-email",
          element: <VerifyEmail />,
        },
        {
          path: "reset-password",
          element: <ResetPassword />,
        },
        {
          path: "brands",
          element: <Brands />,
        },
        {
          path: "account",
          element: (
            <ProtectedRoute>
              <AccountLayout />
            </ProtectedRoute>
          ),
          children: [
            {
              index: true,
              element: <Navigate to={"update-data"} replace />,
            },
            {
              path: "orders",
              element: <Orders />,
            },
            {
              index: true,
              path: "dashboard",
              element: <Dashboard />,
            },
            {
              path: "update-data",
              element: <UpdateUserData />,
            },
            {
              path: "change-password",
              element: <ChangeUserPassword />,
            },
          ],
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "wishlist",
          element: (
            <ProtectedRoute>
              <WishList />
            </ProtectedRoute>
          ),
        },

        {
          path: "orders",
          element: (
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          ),
        },
        {
          path: "product/:id",
          element: <ProductDetails />,
        },
        {
          path: "all-products",
          element: <AllProducts />,
        },
        {
          path: "all-deals",
          element: <AllDeals />,
        },
        {
          path: "checkout",
          element: (
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          ),
        },
        {
          path: "allorders",
          element: <Navigate to={"/account/orders"} replace />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 3 * 60 * 1000,
        gcTime: 5 * 60 * 1000,
        retry: 3,
        retryDelay: 5000,
      },
    },
  });

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <OfflineAlert>
          <AuthProvider>
            <WishListProvider>
              <CartProvider>
                <RouterProvider router={router} />
                <ToastContainer
                  position="top-right"
                  autoClose={2000}
                  closeOnClick={true}
                  closeButton={false}
                />
              </CartProvider>
            </WishListProvider>
          </AuthProvider>
        </OfflineAlert>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}

export default App;
