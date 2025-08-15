import { faEye, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faCodeCompare, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { calcDiscount } from "../../utils/discount-utils";
import Rating from "../Rating/Rating";
import { Link } from "react-router";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/Cart.context";
import { WishlistContext } from "../../context/Wishlist.context";
import { AuthContext } from "../../context/Auth.context";

export default function ProductCard({ productInfo }) {
  const {
    category,
    ratingsQuantity,
    ratingsAverage,
    imageCover,
    priceAfterDiscount,
    price,
    title,
    id,
  } = productInfo;

  const [isInWishlist, setIsInWishlist] = useState(false);

  const { handleAddingProductToCart } = useContext(CartContext);
  const {
    handleAddingProductToWhishlist,
    handleRemovingProductFromWishlist,
    wishlistItemsId,
  } = useContext(WishlistContext);


  function handleWishlistIcon() {
    if (wishlistItemsId.includes(id)) {
      setIsInWishlist(true);
    } else {
      setIsInWishlist(false);
    }
  }

  useEffect(() => {
    handleWishlistIcon();
  }, [wishlistItemsId]);

  return (
    <>
      <div className="card bg-white py-2 relative shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden rounded-xl">
        <div>
          <Link to={`/product/${id}`} className="block">
            <img
              src={imageCover}
              alt="Product Image"
              loading="lazy"
              className="h-52 mx-auto"
            />
          </Link>
        </div>
        <div className="content p-4 space-y-2">
          <div className="title">
            <span className="text-gray-500 text-xs">{category?.name}</span>
            <h2 className="font-semibold text-sm">
              <Link to={`/product/${id}`} className="line-clamp-2">
                {title}
              </Link>
            </h2>
          </div>
          <div className="ratings flex items-center gap-2">
            <Rating rating={ratingsAverage} />
            <span>{ratingsAverage}</span>
            <span className="-ml-1">({ratingsQuantity})</span>
          </div>

          <div className="flex justify-between items-center">
            <div className="price space-x-2">
              <span className="text-primary-600 font-semibold">
                {priceAfterDiscount ? priceAfterDiscount : price} EGP
              </span>
              {priceAfterDiscount && (
                <del className="text-gray-500 text-sm">{price} EGP</del>
              )}
            </div>
            <button
              className="btn p-0 size-8 text-white bg-primary-600 hover:bg-primary-700 transition-colors duration-200 rounded-full"
              onClick={() => {
                handleAddingProductToCart({ id });
              }}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>

        <div className="actions absolute top-4 right-2 flex flex-col gap-4 text-gray-500 *:text-lg *:hover:scale-110 *:transition-all *:duration-200">
          {isInWishlist ? (
            <button
              className="text-red-600 hover:text-red-700"
              onClick={() => {
                handleRemovingProductFromWishlist({ id });
              }}
            >
              <FontAwesomeIcon icon={solidHeart} />
            </button>
          ) : (
            <button
              className="hover:text-primary-600"
              onClick={() => {
                handleAddingProductToWhishlist({ id });
              }}
            >
              <FontAwesomeIcon icon={faHeart} />
            </button>
          )}
          <button className="hover:text-primary-600">
            <FontAwesomeIcon icon={faCodeCompare} />
          </button>

          <Link to={`/product/${id}`} className="hover:text-primary-600">
            <FontAwesomeIcon icon={faEye} />
          </Link>
        </div>

        {priceAfterDiscount && (
          <span className="badge absolute top-4 left-2 text-white text-sm bg-red-500 px-1 py-0.5 rounded-md">
            -{calcDiscount({ price, priceAfterDiscount })}%
          </span>
        )}
      </div>
    </>
  );
}
