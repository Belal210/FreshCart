import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { NavLink, Outlet } from "react-router";
import { AuthContext } from "../../context/Auth.context";
import {
  faBox,
  faGaugeHigh,
  faKey,
  faRightFromBracket,
  faUserPen,
} from "@fortawesome/free-solid-svg-icons";
import PageMetaData from "../PageMetaData/PageMetaData";

export default function AccountLayout() {
  const { userInfo, logOut } = useContext(AuthContext);

  return (
    <>
    <PageMetaData title="Account"/>
      <section className="py-8 bg-gray-50">
        <div className="container">
          <div className="flex flex-col gap-5 md:flex-row">
            {/* Sidebar */}
            <aside className="w-full md:w-1/4">
              <div className="bg-white p-5 rounded-lg shadow-sm">
                <div className="flex items-center md:flex-col md:text-center gap-1  space-x-3 mb-6">
                  <div className="size-10 lg:size-14 bg-primary-100 flex justify-center items-center rounded-full">
                    <FontAwesomeIcon
                      icon={faUser}
                      className="text-sm lg:text-lg text-primary-600"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm lg:text-lg md:pr-3">{userInfo?.name || "User"}</h3>
                    <p className="text-xs lg:text-sm text-gray-500">
                      {userInfo?.email || "user@example.com"}
                    </p>
                  </div>
                </div>

                <ul className="space-y-2">
                  <li>
                    <NavLink
                      to={"/account/dashboard"}
                      className={({ isActive }) => {
                        return `${
                          isActive
                            ? "text-primary-600 bg-primary-50"
                            : "text-gray-700 hover:bg-gray-100"
                        } flex items-center px-4 py-3 space-x-3 rounded-md`;
                      }}
                    >
                      <FontAwesomeIcon icon={faGaugeHigh} />
                      <span>Dashboard</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={"/account/orders"}
                      className={({ isActive }) => {
                        return `${
                          isActive
                            ? "text-primary-600 bg-primary-50"
                            : "text-gray-700 hover:bg-gray-100"
                        } flex items-center px-4 py-3 space-x-3 rounded-md`;
                      }}
                    >
                      <FontAwesomeIcon icon={faBox} />
                      <span>Orders</span>
                    </NavLink>
                  </li>
                  
                  <li>
                    <NavLink
                      to={"/account/update-data"}
                      className={({ isActive }) => {
                        return `${
                          isActive
                            ? "text-primary-600 bg-primary-50"
                            : "text-gray-700 hover:bg-gray-100"
                        } flex items-center px-4 py-3 space-x-3 rounded-md`;
                      }}
                    >
                      <FontAwesomeIcon icon={faUserPen} />
                      <span>Update Data</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={"/account/change-password"}
                      className={({ isActive }) => {
                        return `${
                          isActive
                            ? "text-primary-600 bg-primary-50"
                            : "text-gray-700 hover:bg-gray-100"
                        } flex items-center px-4 py-3 space-x-3 rounded-md`;
                      }}
                    >
                      <FontAwesomeIcon icon={faKey} />
                      <span>Change Password</span>
                    </NavLink>
                  </li>
                  <li
                    className="text-gray-700 hover:bg-gray-100 cursor-pointer flex items-center px-4 py-3 space-x-3 rounded-md"
                    onClick={logOut}
                  >
                    <FontAwesomeIcon icon={faRightFromBracket} />
                    <span>Logout</span>
                  </li>
                </ul>
              </div>
            </aside>

            <div className="w-full md:w-3/4 bg-white p-4 shadow-sm rounded-lg">
              <Outlet />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
