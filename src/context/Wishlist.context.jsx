import { createContext, useContext, useEffect, useState } from "react";
import {
  addProductToWishlist,
  getWishlistItems,
  removeItemFromWishlist,
} from "../services/wishlist-service";
import { toast } from "react-toastify";
import { AuthContext } from "./Auth.context";

export const WishlistContext = createContext(null);

export default function WishListProvider({ children }) {
  const [wishlistInfo, setWishlistInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const [wishlistItemsId, setWishlistItemsId] = useState([]);

  const { isAuthenticated } = useContext(AuthContext);

  // * Add product to wishlist
  async function handleAddingProductToWhishlist({ id }) {
    try {
      if (isAuthenticated) {
        setIsLoading(true);
        var toastId = toast.loading(
          "The product is being added to wishlist now..."
        );
      } else {
        toast.error("You must login first.");
        return;
      }

      const response = await addProductToWishlist({ id });

      if (response.success) {
        setIsLoading(false);
        toast.dismiss(toastId);

        setWishlistItemsId(response?.data?.data);
        FetchWishlistProducts();
      }
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      setError(error);
    }
  }

  // ^ Get wishlist products
  async function FetchWishlistProducts() {
    try {
      setIsLoading(true);
      const response = await getWishlistItems();

      if (response.success) {
        setIsLoading(false);
        setWishlistInfo(response?.data);

        const items = response?.data?.data || [];
        const itemsId = items?.map((item) => item.id);
        setWishlistItemsId(itemsId);
      }
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      setError(error);
    }
  }

  // ! Remove product from wishlist
  async function handleRemovingProductFromWishlist({ id }) {
    try {
      if (isAuthenticated) {
        var toastId = toast.loading(
          "The product is being deleted from your wishlist now"
        );
      } else {
        toast.error("You must login first.");
        return;
      }

      const response = await removeItemFromWishlist({ id });

      if (response.success) {
        toast.dismiss(toastId);

        setWishlistItemsId(response?.data?.data);
        FetchWishlistProducts();
      }
    } catch (error) {
      setIsError(true);
      setError(error);
    }
  }

  useEffect(() => {
    FetchWishlistProducts();
  }, [isAuthenticated]);

  return (
    <WishlistContext.Provider
      value={{
        handleAddingProductToWhishlist,
        wishlistInfo,
        isLoading,
        handleRemovingProductFromWishlist,
        wishlistItemsId,
        refreshWishlist: FetchWishlistProducts,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
