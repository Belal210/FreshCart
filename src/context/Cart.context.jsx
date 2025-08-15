import { createContext, useContext, useEffect, useState } from "react";
import {
  addProductToCart,
  clearCart,
  getCartItems,
  removeItemFromCart,
  updateProductQuantity,
} from "../services/cart-service";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { AuthContext } from "./Auth.context";

const MySwal = withReactContent(Swal);

export const CartContext = createContext(null);

export default function CartProvider({ children }) {
  const [cartInfo, setCartInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const [cartItemsId, setCartItemsId] = useState([]);

  const { isAuthenticated } = useContext(AuthContext);

  // * Add product to cart
  async function handleAddingProductToCart({ id }) {
    try {
      
      if(isAuthenticated) {
        setIsLoading(true);
        
        var toastId = toast.loading(
        "The product is being added to cart now..."
      );
      }else{
        toast.error("You must login first.")
        return;
      }

      const response = await addProductToCart({ id });

      if (response.success) {
        setIsLoading(false);

        FetchCartProducts();

        toast.dismiss(toastId);
        toast.success(response?.data?.message);
      }
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      setError(error);
    }
  }

  // ^ Get cart products
  async function FetchCartProducts() {
    try {
      setIsLoading(true);
      const response = await getCartItems();

      if (response.success) {
        setIsLoading(false);
        setCartInfo(response?.data);

        const cartProducts = response?.data.data.products || [];

        const cartProductsId = cartProducts?.map(
          (product) => product.product.id
        );
        setCartItemsId(cartProductsId);
      }
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      setError(error);
    }
  }

  // ! Remove product from cart
  async function handleRemovingProductFromCart({ id }) {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        iconColor: "#d33",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#273F4F",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const toastId = toast.loading("The product is being deleted now...");

        const response = await removeItemFromCart({ id });

        if (response.success) {
          setCartInfo(response?.data);

          const cartProducts = response?.data.data.products || [];
          const cartProductsId = cartProducts?.map(
            (product) => product.product.id
          );

          toast.dismiss(toastId);
          setCartItemsId(cartProductsId);
        }
      }
    } catch (error) {
      setIsError(true);
      setError(error);
    }
  }

  // ! Clear The Cart

  async function handleClearingCart() {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        iconColor: "#d33",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#273F4F",
        confirmButtonText: "Yes, clear it!",
      });
      if (result.isConfirmed) {
        const toastId = toast.loading("Your cart is being cleared now...");

        const response = await clearCart();
        if (response.success) {
          toast.dismiss(toastId);
          FetchCartProducts();
        }
      }
    } catch (error) {
      setIsError(true);
      setError(error);
    }
  }

  // ^ Update product quantity
  async function handleUpdatingProductQuantity({ id, count }) {
    try {
      const toastId = toast.loading("Updating product quantity");

      const response = await updateProductQuantity({ id, count });

      if (response.success) {
        toast.dismiss(toastId);
        setCartInfo(response?.data);
      }
    } catch (error) {
      setIsError(true);
      setError(error);
    }
  }

  useEffect(() => {
    FetchCartProducts();
  }, [isAuthenticated]);

  return (
    <CartContext.Provider
      value={{
        cartInfo,
        setCartInfo,
        isLoading,
        isError,
        error,
        handleAddingProductToCart,
        refreshCart: FetchCartProducts,
        handleRemovingProductFromCart,
        handleClearingCart,
        handleUpdatingProductQuantity,
        cartItemsId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
