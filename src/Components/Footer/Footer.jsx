import {
  faFacebook,
  faGithub,
  faLinkedin,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router";
import freshCartLogo from "../../assets/images/freshcart-logo.svg";
import freshCartMiniLogo from "../../assets/images/mini-logo.png";

export default function Footer() {
  return (
    <>
      <footer className="py-5 bg-white border-t border-gray-200">
        <div className="container">
          <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-6 py-8">
            <div className="xl:col-span-2 space-y-3">
              <img src={freshCartLogo} alt="FreshCart Logo" />
              <p>
                FreshCart is versatile e-commerce plateform offering a wide
                range of products, from clothing to electronics. It provides a
                user-friendly experience for seameless shopping across diverse
                categories.
              </p>
              <ul className="flex items-center gap-5 text-gray-500 text-xl *:hover:text-primary-600 *:transition-colors *:duration-200">
                <li>
                  <a href="https://www.facebook.com/bel.al.96199344/?locale=ar_AR" target="_blank">
                    <FontAwesomeIcon icon={faFacebook} />
                  </a>
                </li>
                <li>
                  <a href="https://wa.me/+0201007694021" target="_blank">
                    <FontAwesomeIcon icon={faWhatsapp} />
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/belal-salem-a2bb0635b/" target="_blank">
                    <FontAwesomeIcon icon={faLinkedin} />
                  </a>
                </li>
                <li>
                  <a href="https://github.com/Belal210" target="_blank">
                    <FontAwesomeIcon icon={faGithub} />
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-span-1">
              <h2 className="text-xl font-bold mb-4">Categories</h2>
              <ul className="space-y-3 *:hover:text-primary-600 *:transition-colors *:duration-200">
                <li>
                  <Link>Men's Fashion</Link>
                </li>
                <li>
                  <Link>Women's Fashion</Link>
                </li>
                <li>
                  <Link>Baby & Toys</Link>
                </li>
                <li>
                  <Link>Beauty & Health</Link>
                </li>
                <li>
                  <Link>Electronics</Link>
                </li>
              </ul>
            </div>

            <div className="col-span-1">
              <h2 className="text-xl font-bold mb-4">Quick Links</h2>
              <ul className="space-y-3 *:hover:text-primary-600 *:transition-colors *:duration-200">
                <li>
                  <Link>About Us</Link>
                </li>
                <li>
                  <Link>Contact Us</Link>
                </li>
                <li>
                  <Link>Privacy Policy</Link>
                </li>
                <li>
                  <Link>Terms of Services</Link>
                </li>
                <li>
                  <Link>Shipping Policy</Link>
                </li>
              </ul>
            </div>

            <div className="col-span-1">
              <h2 className="text-xl font-bold mb-4">Customer Service</h2>
              <ul className="space-y-3 *:hover:text-primary-600 *:transition-colors *:duration-200">
                <li>
                  <Link to={"/account"}>My Account</Link>
                </li>
                <li>
                  <Link to={"/account/orders"}>My Orders</Link>
                </li>
                <li>
                  <Link to={"/wishlist"}>Wishlist</Link>
                </li>
                <li>
                  <Link>Returns & Refunds</Link>
                </li>
                <li>
                  <Link>Help Center</Link>
                </li>
              </ul>
            </div>
          </div>


          <div className="flex justify-between items-center text-sm md:text-[16px] py-6 border-t border-gray-200">
            <p>
              &copy; {new Date().getFullYear()} <strong>Belal Salem</strong> , All rights reserved.
            </p>
            <img src={freshCartMiniLogo} alt="FreshCart Mini Logo" className="w-7 md:w-9" />
          </div>
        </div>
      </footer>
    </>
  );
}
