import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Rating from "../Rating/Rating";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { CartContext } from "../../context/Cart.context";
import { Link } from "react-router";

export default function CartItem({ productInfo }) {
  const [isUpdating, setIsUpdating] = useState(false);

  const { product, price, count } = productInfo;
  const { imageCover, title, category, ratingsAverage, id } = product;

  const { handleRemovingProductFromCart, handleUpdatingProductQuantity } =
    useContext(CartContext);

  async function handleUpdate({ id, count }) {
    setIsUpdating(true);
    await handleUpdatingProductQuantity({ id, count });
    setIsUpdating(false);
  }
  
  return (
    <>
      <div
        className={`flex items-center p-3 md:p-5 lg:p-6 space-x-2 md:space-x-4 border-b border-gray-100 ${
          isUpdating && "opacity-70"
        }`}
      >
        <img
          src={imageCover}
          alt="Product Image"
          className="size-15 md:size-20 rounded-md object-cover"
        />
        <div className="flex-1">
          <h3 className="font-semibold text-xs lg:text-sm">
            <Link to={`/product/${id}`} className="line-clamp-2 ">{title}</Link>
          </h3>
          <p className="text-[10px] lg:text-sm text-gray-500">{category?.name}</p>
          <div className="flex items-center mt-2">
            <div className="text-[10px] lg:text-sm text-yellow-400 flex">
              <Rating rating={ratingsAverage} />
            </div>
            <span className="text-[10px] lg:text-xs text-gray-500 ml-2">{ratingsAverage}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2 lg:space-x-4">
          <div className="flex items-center text-sm md:text-[16px] border border-gray-200 rounded-lg">
            <button
              className="p-2 md:p-3 hover:bg-gray-100"
              onClick={() => {
                handleUpdate({ id, count: count - 1 });
              }}
            >
              <FontAwesomeIcon icon={faMinus} className="" />
            </button>
            <span className="p-2 md:p-3 border-x border-gray-200">{count}</span>
            <button
              className="p-2 md:p-3 hover:bg-gray-100"
              onClick={() => {
                handleUpdate({ id, count: count + 1 });
              }}
            >
              <FontAwesomeIcon icon={faPlus} className="" />
            </button>
          </div>
          <div className="font-semibold ml-1 md:ml-2 text-[10px] md:text-sm lg:text-[16px] spac-y-1 text-center">
            <span className="block">{price}</span>
            <span className="text-[10px] md:text-xs lg:text-sm text-gray-500">EGP</span>
          </div>
        </div>
        <button className="icon ml-1 md:ml-2">
          <FontAwesomeIcon
            icon={faTrash}
            className="text-red-600 hover:text-red-700 text-sm lg:text-[16px] p-2"
            onClick={() => {
              handleRemovingProductFromCart({ id });
            }}
          />
        </button>
      </div>
    </>
  );
}
