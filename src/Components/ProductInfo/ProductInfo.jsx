import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRotateLeft,
  faCartShopping,
  faTrash,
  faTruck,
  faHeart as solidHeart,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import Rating from "../Rating/Rating";
import { calcDiscount } from "../../utils/discount-utils";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/Cart.context";
import { WishlistContext } from "../../context/Wishlist.context";

export default function ProductInfo({ productDetails }) {
  const {
    id,
    title,
    images,
    category,
    brand,
    description,
    price,
    priceAfterDiscount,
    quantity,
    ratingsAverage,
    ratingsQuantity,
  } = productDetails;
  

  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isInCart, setIsInCart] = useState(false);

  const {
    handleAddingProductToCart,
    handleRemovingProductFromCart,
    cartItemsId,
  } = useContext(CartContext);
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

  function handleProductButton() {
    if (cartItemsId.includes(id)) {
      setIsInCart(true);
    } else {
      setIsInCart(false);
    }
  }

  useEffect(() => {
    handleWishlistIcon();
    handleProductButton();
  }, [wishlistItemsId , cartItemsId]);

  return (
    <>
      <section className="py-8 bg-gray-50">
        <div className="container">
          <div className="grid gap-4 lg:grid-cols-7">
            <div className="images bg-white lg:col-span-2 rounded-lg overflow-hidden">
              <ReactImageGallery
              autoPlay={true}
                showNav={false}
                showFullscreenButton={false}
                showPlayButton={false}
                items={images.map((image) => {
                  return {
                    original: image,
                    thumbnail: image,
                  };
                })}
              />
            </div>
            <div className="lg:col-span-5 p-5 bg-white rounded-lg">
              <div className="flex justify-between items-center">
                <span
                  className={`${
                    quantity > 0
                      ? "bg-primary-100 text-primary-700"
                      : "bg-red-100 text-red-700"
                  } px-2 py-1 rounded-sm text-sm`}
                >
                  {quantity > 0 ? "In Stock" : "Out of Stock"}
                </span>
                <div className="icon text-gray-500">
                  {isInWishlist ? (
                    <button
                      className="text-3xl text-red-600 hover:scale-110 transition-transform duration-300"
                      onClick={() => {
                        handleRemovingProductFromWishlist({ id });
                      }}
                    >
                      <FontAwesomeIcon icon={solidHeart} />
                    </button>
                  ) : (
                    <button
                      className="text-3xl hover:text-primary-600 hover:scale-110 transition-all duration-300"
                      onClick={() => {
                        handleAddingProductToWhishlist({ id });
                      }}
                    >
                      <FontAwesomeIcon icon={faHeart} />
                    </button>
                  )}
                </div>
              </div>

              <div className="py-6">
                <p className="md:text-lg text-gray-500">{category?.name}</p>
                <p className="text-lg md:text-xl mb-3">Brand : {brand?.name}</p>
                <h2 className="text-xl md:text-2xl font-bold mb-2">{title}</h2>
                
                <div className="flex items-center gap-3 mb-3">
                  <Rating rating={ratingsAverage} />
                  <div className="space-x-1">
                    <span>{ratingsAverage}</span>
                    <span>({ratingsQuantity} reviews)</span>
                  </div>
                </div>
                <div className="space-x-2">
                  <span className="text-xl md:text-2xl font-bold">
                    {priceAfterDiscount || price} EGP
                  </span>
                  {priceAfterDiscount && (
                    <>
                      <del className="text-gray-500">{price} EGP</del>

                      <span className="bg-red-100 text-red-700 px-2 py-1 rounded-sm text-xs md:text-sm">
                        Save {calcDiscount({ price, priceAfterDiscount })}%
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div className="py-6 border-y border-gray-200">
                <p className="mb-6 text-sm md:text-[16px]">{description}</p>
                <div className="space-y-5">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-sm md:text-[16px]">Quantity :</h3>
                    
                    <span className="text-xs md:text-sm">
                      Only {quantity} items left in stock
                    </span>
                  </div>
                  <div className="*:w-full">
                    {isInCart ? (
                      <button
                        className="btn font-medium space-x-3 text-white border-2 border-red-600 bg-red-600 hover:bg-red-700 transition-colors duration-200"
                        onClick={() => {
                          handleRemovingProductFromCart({ id });
                        }}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                        <span>Remove from Cart</span>
                      </button>
                    ) : (
                      <button
                        className="btn font-medium space-x-3 text-white border-2 border-primary-600 bg-primary-600 hover:bg-primary-700 transition-colors duration-200"
                        onClick={() => {
                          handleAddingProductToCart({ id });
                        }}
                      >
                        <FontAwesomeIcon icon={faCartShopping} />
                        <span>Add to Cart</span>
                      </button>
                    )}
                    
                  </div>
                </div>
              </div>

              <div className="mt-6 grid md:grid-cols-2 gap-3 md:gap-0">
                <div className="flex items-center gap-3">
                  <div className="icon min-w-11 h-11 bg-blue-100 rounded-full flex justify-center items-center">
                    <FontAwesomeIcon
                      icon={faTruck}
                      className=" text-primary-600"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm md:text-[16px]">Free Delivery</h3>
                    <span className="text-gray-600 text-xs md:text-sm font-medium">
                      Free shipping on orders over $50
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="icon min-w-11 h-11 bg-blue-100 rounded-full flex justify-center items-center">
                    <FontAwesomeIcon
                      icon={faArrowRotateLeft}
                      className=" text-primary-600"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm md:text-[16px]">30 Days Return</h3>
                    <span className="text-gray-600 text-xs md:text-sm font-medium">
                      Satisfaction guaranteed or money back
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
