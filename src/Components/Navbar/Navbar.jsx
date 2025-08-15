import {
  faAddressCard,
  faEnvelope,
  faHeart,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import {
  faBabyCarriage,
  faBars,
  faBolt,
  faCartShopping,
  faChevronDown,
  faEllipsis,
  faFire,
  faHome,
  faPerson,
  faPersonDress,
  faPhone,
  faRightFromBracket,
  faSpinner,
  faSuitcaseMedical,
  faUserPlus,
  faWifi,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, NavLink } from "react-router";
import freshCartLogo from "../../assets/images/freshcart-logo.svg";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/Auth.context";
import { CartContext } from "../../context/Cart.context";
import { useOnlineStatus } from "../../hooks/useOnlineStatus";
import { WishlistContext } from "../../context/Wishlist.context";

export default function Navbar() {
  const { logOut, token } = useContext(AuthContext);

  const { cartInfo, isLoading } = useContext(CartContext);
  const {wishlistInfo , isLoading: wishlistLoading} = useContext(WishlistContext)

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isOnline = useOnlineStatus();

  function toggleNavMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <>
      <header className="bg-white">
        <div className="container">
          {/* Top Navbar */}
          <div className="hidden lg:flex justify-between items-center border-b border-gray-300/40 py-2 text-sm">
            <ul className="flex items-center gap-5 *:flex *:items-center *:gap-2">
              <li>
                <FontAwesomeIcon icon={faPhone} />
                <a href="tel:+1 (800) 123-4567">+1 (800) 123-4567</a>
              </li>
              <li>
                <FontAwesomeIcon icon={faEnvelope} />
                <a href="mailto:support@freshcart.com">support@freshcart.com</a>
              </li>

              {isOnline && (
                <li className="text-primary-600">
                  <FontAwesomeIcon icon={faWifi} />
                  <span>Online</span>
                </li>
              )}
            </ul>

            <ul className="flex items-center gap-5">
              <li>
                <Link>Track Order</Link>
              </li>
              <li>
                <Link>About</Link>
              </li>
              <li>
                <Link>Contact</Link>
              </li>

              <li>
                <select name="" id="">
                  <option value="">EGP</option>
                  <option value="">SAR</option>
                  <option value="">AED</option>
                </select>
              </li>
              <li>
                <select name="language" id="language">
                  <option value="ar">العربية</option>
                  <option value="en">English</option>
                </select>
              </li>
            </ul>
          </div>
          {/* Main Nav */}
          <nav className="flex justify-between items-center py-5">
            <h1>
              <Link to={"/"}>
                <img src={freshCartLogo} alt="FreshCart Logo" />
              </Link>
            </h1>

            <ul className="hidden lg:flex items-center gap-7">
              <li>
                <NavLink
                  to={"wishlist"}
                  className={({ isActive }) => {
                    return `${
                      isActive ? "text-primary-600" : ""
                    } flex flex-col gap-0.5 hover:text-primary-600 transition-colors duration-200`;
                  }}
                >
                  <div className="relative w-fit mx-auto">
                    <FontAwesomeIcon className="text-xl" icon={faHeart} />
                    {token && (
                      <span className="absolute -right-3 -top-2.5 flex justify-center items-center text-xs size-5 rounded-full bg-primary-600 text-white">
                        {wishlistLoading ? (
                          <FontAwesomeIcon icon={faSpinner} spin />
                        ) : (
                          wishlistInfo?.count
                        )}
                      </span>
                    )}
                  </div>
                  <span className="text-sm">Wishlist</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to={"cart"}
                  className={({ isActive }) => {
                    return `${
                      isActive ? "text-primary-600" : ""
                    } flex flex-col gap-0.5 hover:text-primary-600 transition-colors duration-200`;
                  }}
                >
                  <div className="relative w-fit">
                    <FontAwesomeIcon
                      className="text-xl"
                      icon={faCartShopping}
                    />
                    {token && (
                      <span className="absolute -right-3 -top-2.5 flex justify-center items-center text-xs size-5 rounded-full bg-primary-600 text-white">
                        {isLoading ? (
                          <FontAwesomeIcon icon={faSpinner} spin />
                        ) : (
                          cartInfo?.numOfCartItems
                        )}
                      </span>
                    )}
                  </div>
                  <span className="text-sm">Cart</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"account"}
                  className={({ isActive }) => {
                    return `${
                      isActive ? "text-primary-600" : ""
                    } flex flex-col gap-2 hover:text-primary-600 transition-colors duration-200`;
                  }}
                >
                  <FontAwesomeIcon className="text-xl" icon={faUser} />
                  <span className="text-sm">Account</span>
                </NavLink>
              </li>

              {token ? (
                <li
                  className={
                    "flex flex-col gap-2 cursor-pointer hover:text-primary-600 transition-colors duration-200"
                  }
                  onClick={logOut}
                >
                  <FontAwesomeIcon
                    className="text-xl"
                    icon={faRightFromBracket}
                  />
                  <span className="text-sm">Logout</span>
                </li>
              ) : (
                <>
                  <li>
                    <NavLink
                      to={"signup"}
                      className={({ isActive }) => {
                        return `${
                          isActive ? "text-primary-600" : ""
                        } flex flex-col gap-2 hover:text-primary-600 transition-colors duration-200`;
                      }}
                    >
                      <FontAwesomeIcon className="text-xl" icon={faUserPlus} />
                      <span className="text-sm">Sign up</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={"login"}
                      className={({ isActive }) => {
                        return `${
                          isActive ? "text-primary-600" : ""
                        } flex flex-col gap-2 hover:text-primary-600 transition-colors duration-200`;
                      }}
                    >
                      <FontAwesomeIcon
                        className="text-xl"
                        icon={faAddressCard}
                      />
                      <span className="text-sm">Login</span>
                    </NavLink>
                  </li>
                </>
              )}
            </ul>

            <button
              className="lg:hidden btn text-white bg-primary-600"
              onClick={toggleNavMenu}
            >
              {isMenuOpen ? (
                <FontAwesomeIcon icon={faXmark} />
              ) : (
                <FontAwesomeIcon icon={faBars} />
              )}
            </button>
          </nav>
        </div>

        {/* Category Nav */}
        <nav className="hidden lg:block py-4 bg-gray-100">
          <div className="container flex items-center gap-8">
            <div className="relative group">
              <button className="btn flex items-center gap-3 text-white bg-primary-600 hover:bg-primary-700">
                <FontAwesomeIcon icon={faBars} />
                <span>All Categories</span>
                <FontAwesomeIcon icon={faChevronDown} />
              </button>
              <menu className="hidden group-hover:block absolute top-10 min-w-52 z-10 rounded-lg bg-white shadow divide-y divide-gray-200 ">
                <li>
                  <Link className="flex items-center gap-2 px-2 py-3 hover:bg-gray-100">
                    <FontAwesomeIcon
                      className="text-primary-600"
                      fixedWidth
                      icon={faPerson}
                    />
                    <span>Men's Fashion</span>
                  </Link>
                </li>
                <li>
                  <Link className="flex items-center gap-2 px-2 py-3 hover:bg-gray-100">
                    <FontAwesomeIcon
                      className="text-primary-600"
                      fixedWidth
                      icon={faPersonDress}
                    />
                    <span>Women's Fashion</span>
                  </Link>
                </li>
                <li>
                  <Link className="flex items-center gap-2 px-2 py-3 hover:bg-gray-100">
                    <FontAwesomeIcon
                      className="text-primary-600"
                      fixedWidth
                      icon={faBabyCarriage}
                    />
                    <span>Baby & Toys</span>
                  </Link>
                </li>
                <li>
                  <Link className="flex items-center gap-2 px-2 py-3 hover:bg-gray-100">
                    <FontAwesomeIcon
                      className="text-primary-600"
                      fixedWidth
                      icon={faSuitcaseMedical}
                    />
                    <span>Beauty & Health</span>
                  </Link>
                </li>
                <li>
                  <Link className="flex items-center gap-2 px-2 py-3 hover:bg-gray-100">
                    <FontAwesomeIcon
                      className="text-primary-600"
                      fixedWidth
                      icon={faBolt}
                    />
                    <span>Electronics</span>
                  </Link>
                </li>
                <li>
                  <Link className="flex items-center gap-2 px-2 py-3 hover:bg-gray-100">
                    <FontAwesomeIcon
                      className="text-primary-600"
                      fixedWidth
                      icon={faEllipsis}
                    />
                    <span>View All Categories</span>
                  </Link>
                </li>
              </menu>
            </div>

            <ul className="flex gap-5">
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>
                <Link to={"/all-products"}>All Products</Link>
              </li>

              <li>
                <Link to={"/all-deals"}>Deals</Link>
              </li>
              <li>
                <Link to={"/brands"}>Brands</Link>
              </li>
              <li>
                <Link>Recently Added</Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* OffCavnas */}
        {isMenuOpen && (
          <>
            <div
              className=" background-layer fixed inset-0 z-20 bg-black/40 cursor-pointer"
              onClick={toggleNavMenu}
            ></div>
            <div className="offcanvas w-72 sm:w-96 bg-white p-5 fixed top-0 bottom-0 z-30 space-y-4 animate-slide-in">
              <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                <img src={freshCartLogo} alt="FreshCart Logo" />
                <button
                  className="btn p-0 size-8 rounded-full"
                  onClick={toggleNavMenu}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>

              <div>
                <h2 className="text-xl font-bold">Main Menu</h2>
                <ul className="space-y-2 mt-2 *:hover:bg-gray-100 *:rounded-md overflow-hidden transition-colors duration-200">
                  <li>
                    <NavLink
                      to={"/"}
                      className={({ isActive }) => {
                        return `${
                          isActive ? "text-primary-600 bg-primary-100" : ""
                        } flex gap-2 transition-colors duration-200 p-3 rounded-md`;
                      }}
                    >
                      <FontAwesomeIcon className="text-xl" icon={faHome} />
                      <span className="text-sm">Home</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={"wishlist"}
                      className={({ isActive }) => {
                        return `${
                          isActive ? "text-primary-600 bg-primary-100" : ""
                        } flex gap-2 transition-colors duration-200 p-3 rounded-md`;
                      }}
                    >
                      <div className="relative">
                        <FontAwesomeIcon
                          className="text-xl"
                          icon={faHeart}
                        />
                        {token && (
                          <span className="absolute -right-2 -top-2.5 flex justify-center items-center text-xs size-5 rounded-full bg-primary-600 text-white">
                            {wishlistLoading ? (
                              <FontAwesomeIcon icon={faSpinner} spin />
                            ) : (
                              wishlistInfo?.count
                            )}
                          </span>
                        )}
                      </div>
                      <span className="text-sm">Wishlist</span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to={"cart"}
                      className={({ isActive }) => {
                        return `${
                          isActive ? "text-primary-600 bg-primary-100" : ""
                        } flex gap-2 transition-colors duration-200 p-3 rounded-md`;
                      }}
                    >
                      <div className="relative">
                        <FontAwesomeIcon
                          className="text-xl"
                          icon={faCartShopping}
                        />
                        {token && (
                          <span className="absolute -right-2 -top-3 flex justify-center items-center text-xs size-5 rounded-full bg-primary-600 text-white">
                            {isLoading ? (
                              <FontAwesomeIcon icon={faSpinner} spin />
                            ) : (
                              cartInfo?.numOfCartItems
                            )}
                          </span>
                        )}
                      </div>
                      <span className="text-sm">Cart</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={"brands"}
                      className={({ isActive }) => {
                        return `${
                          isActive ? "text-primary-600 bg-primary-100" : ""
                        } flex gap-2 transition-colors duration-200 p-3 rounded-md`;
                      }}
                    >
                      <FontAwesomeIcon className="text-xl" icon={faFire} />
                      <span className="text-sm">Brands</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={"account"}
                      className={({ isActive }) => {
                        return `${
                          isActive ? "text-primary-600 bg-primary-100" : ""
                        } flex gap-2 transition-colors duration-200 p-3 rounded-md`;
                      }}
                    >
                      <FontAwesomeIcon className="text-xl" icon={faUser} />
                      <span className="text-sm">Account</span>
                    </NavLink>
                  </li>
                </ul>
              </div>

              <div className="border-t border-gray-200 pt-3">
                <h2 className="text-xl font-bold">Account</h2>
                <ul className="space-y-2 mt-2 *:hover:bg-gray-100 *:rounded-md transition-colors duration-200">
                  {token ? (
                    <li
                      className={
                        "flex gap-2 cursor-pointer transition-colors duration-200 p-3"
                      }
                      onClick={logOut}
                    >
                      <FontAwesomeIcon
                        className="text-xl"
                        icon={faRightFromBracket}
                      />
                      <span className="text-sm">Logout</span>
                    </li>
                  ) : (
                    <>
                      <li>
                        <NavLink
                          to={"signup"}
                          className={({ isActive }) => {
                            return `${
                              isActive ? "text-primary-600 bg-primary-100" : ""
                            } flex gap-2 transition-colors duration-200 p-3 rounded-md`;
                          }}
                        >
                          <FontAwesomeIcon
                            className="text-xl"
                            icon={faUserPlus}
                          />
                          <span className="text-sm">Sign up</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to={"login"}
                          className={({ isActive }) => {
                            return `${
                              isActive ? "text-primary-600 bg-primary-100" : ""
                            } flex gap-2 transition-colors duration-200 p-3 rounded-md`;
                          }}
                        >
                          <FontAwesomeIcon
                            className="text-xl"
                            icon={faAddressCard}
                          />
                          <span className="text-sm">Login</span>
                        </NavLink>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </>
        )}
      </header>
    </>
  );
}
