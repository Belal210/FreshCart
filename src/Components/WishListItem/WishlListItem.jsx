import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Rating from "../Rating/Rating";
import { useContext } from "react";
import { WishlistContext } from "../../context/Wishlist.context";
import { CartContext } from "../../context/Cart.context";
import { Link } from "react-router";

export default function WishListItem({ productInfo }) {
  const { handleRemovingProductFromWishlist } = useContext(WishlistContext);
  const { handleAddingProductToCart } = useContext(CartContext);

  const {
    title,
    ratingsQuantity,
    ratingsAverage,
    price,
    imageCover,
    category,
    id,
  } = productInfo;
  return (
    <>
      <div
        className={`flex items-center p-3 md:p-6 space-x-2 md:space-x-4 border-b border-gray-100`}
      >
        <img
          src={imageCover}
          alt="Product Image"
          className="size-15 md:size-20 rounded-lg object-cover"
        />
        <div className="flex-1 text-xs md:text-sm">
          <h3 className="font-semibold text-xs lg:text-sm ">
            <Link to={`/product/${id}`} className="line-clamp-2 ">{title}</Link>
          </h3>
          <p className="text-gray-500 text-[10px] lg:text-sm">{category?.name}</p>
          <div className="flex items-center mt-2">
            <div className="text-[10px] lg:text-sm text-yellow-400 flex">
              <Rating rating={ratingsAverage} />
            </div>
            <span className="text-[10px] lg:text-xs text-gray-500 ml-2 ">
              {ratingsAverage} ({ratingsQuantity})
            </span>
          </div>
        </div>
        <div className="font-semibold text-xs md:text-sm lg:text-[16px] spac-y-1 text-center text-primary-600">
            <span className="block">{price}</span>
            <span className="text-[10px] md:text-xs lg:text-sm">EGP</span>
          </div>

        <button
          className="text-[10px] md:text-[16px] btn px-2 lg:p-3 bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors duration-200"
          onClick={() => {
            handleAddingProductToCart({ id });
          }}
        >
          Add to cart
        </button>

        <button
          className="icon ml-1 md:ml-2 text-sm md:text-[16px] lg:text-lg text-gray-500 hover:text-red-600 transition-colors duration-200"
          onClick={() => {
            handleRemovingProductFromWishlist({ id });
          }}
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      </div>
    </>
  );
}
