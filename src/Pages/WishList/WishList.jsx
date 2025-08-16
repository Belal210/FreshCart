import { useContext } from "react";
import WishListItem from "../../Components/WishListItem/WishlListItem";
import { WishlistContext } from "../../context/Wishlist.context";
import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartBroken } from "@fortawesome/free-solid-svg-icons";
import PageMetaData from "../../Components/PageMetaData/PageMetaData";
import WishlistSkeleton from "../../Components/skeleton/WishlistSkeleton";

export default function WishList() {
  const { wishlistInfo, isLoading } = useContext(WishlistContext);

  if (isLoading) return <WishlistSkeleton />;

  const { count, data } = wishlistInfo;

  return (
    <>
      <PageMetaData title="Wishlist" />
      <main className="py-12 bg-gray-50">
        <div className="container lg:max-w-6xl">
          <div className="bg-white shadow-sm overflow-hidden rounded-lg">
            <div className="p-5 border-b border-gray-300">
              <h1 className="text-2xl font-bold">My Wishlist</h1>
              <p className="mt-1 text-gray-600">
                {count} items in your wishlist
              </p>
            </div>

            {count === 0 ? (
              <div className="py-10 text-center text-lg space-y-2">
                <p>
                  There are no products in your wishlist{" "}
                  <FontAwesomeIcon icon={faHeartBroken} />
                </p>
                <p>
                  You can add products from{" "}
                  <Link
                    to={"/"}
                    className="text-primary-600 hover:text-primary-700"
                  >
                    here
                  </Link>
                </p>
              </div>
            ) : (
              data?.map((product) => (
                <WishListItem key={product?.id} productInfo={product} />
              ))
            )}
          </div>
        </div>
      </main>
    </>
  );
}
