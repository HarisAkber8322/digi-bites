"use client";
import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faUser,
  faCartShopping,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";
import ToggleThemeComponent from "../ToggleThemeButton";
import { Image } from "react-bootstrap";
import { usePathname } from "next/navigation";
// import { useRouter } from "next/router";
import Div from "../UI/Div";
import Text from "../UI/Text";
import { observer } from "mobx-react";
import { menuData } from "../../utills/constants"; // Adjust the path to where your menuData is located
import UserStoreContext from "@/store/UserStore";
import CartStoreContext from "@/store/CartStore";

const HeaderComponent = () => {
  const router = usePathname();
  // const routerTwo = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );
  const CartStore = useContext(CartStoreContext);
  const UserStore = useContext(UserStoreContext);
  const { isLoggedin } = UserStore;

  useEffect(() => {
    // CartStore.loadCart();
  }, [CartStore.cartItems, CartStore.cart]);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMouseEnter = () => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 1000);
    setDropdownTimeout(timeout as NodeJS.Timeout);
  };
  return (
    <>
      <Div
        themeDivClasses="md:fixed md:top-0 md:flex md:items-center md:w-full md:drop-shadow-md md:z-[999999]"
        content={
          <>
            <div className="md:w-[1180px] md:m-auto md:h-[64px] md:flex md:justify-between md:flex-row md:items-center">
              <div className="md:flex md:gap-4 md:flex-row md:items-center">
                <div className="xs:flex xs:items-center xs:justify-center xs:pt-5">
                  <Link href="/">
                    <Image
                      className="h-12 items-center"
                      src="/images/digibites.png"
                      alt="logo"
                    />
                  </Link>
                </div>
                <div className="md:hidden">
                  <Text
                    themeDivClasses="text-xl cursor-pointer"
                    content={
                      <FontAwesomeIcon icon={faBars} onClick={toggleMenu} />
                    }
                  />
                </div>
                <div
                  className={`navbar_menu xs:hidden duration-75 md:left-0 md:block`}
                >
                  <ul className="md:flex md:gap-10 md:text-lg md:font-semibold md:items-center">
                    <Text
                      themeDivClasses=""
                      content={
                        <li
                          className=""
                          onMouseEnter={handleMouseEnter}
                          onMouseLeave={handleMouseLeave}
                        >
                          <span className="md:cursor-pointer">Categories</span>
                          {isDropdownOpen && (
                            <ul className="absolute bg-white shadow-lg rounded-md mt-2 z-10">
                              {menuData.map((category) => (
                                <li
                                  key={category.category}
                                  className="px-4 text-black hover:bg-yellow-100 rounded-xl text-base font-semibold w-40"
                                >
                                  <Link href={`/category/${category.category}`}>
                                    {category.category}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      }
                    />
                    {UserStore.isLoggedin &&
                      <li className="md:transition-all md:duration-500 md:ease-in-out">
                        <Link
                          href="/favorite"
                          className={router === "/favorite" ? "active" : ""}
                        >
                          <Text
                            themeDivClasses="md:text-md md:font-semibold"
                            content={"Favorites"}
                          />
                        </Link>
                      </li>
                    }
                    <li className="md:transition-all md:duration-500 md:ease-in-out">
                      <Link
                        href="/suggestions"
                        className={router === "/suggestion" ? "active" : ""}
                      >
                        <Text
                          themeDivClasses="md:text-md md:font-semibold"
                          content={"Suggestions"}
                        />
                      </Link>
                    </li>
                    <li className="md:transition-all md:duration-500 md:ease-in-out">
                      <Link
                        href="/contact"
                        className={router === "/contact" ? "active" : ""}
                      >
                        <Text
                          themeDivClasses="md:text-md md:font-semibold"
                          content={"Contact"}
                        />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="md:flex md:items-center md:gap-5">
                <div className="md:flex md:items-center">
                  {/* <SearchInput onSearch={handleSearch} /> */}
                </div>
                <div className="md:text-lg md:flex md:items-center md:gap-5">
                  {isLoggedin && (
                    <Link href="/cart" className="cursor-pointer">
                      <Text
                        content={
                          <>
                            <FontAwesomeIcon icon={faCartShopping} />
                            {CartStore.cartItems.length > 0 && (
                              <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 ml-1 relative bottom-4">
                                {CartStore.cartItems.length}
                              </span>
                            )}
                          </>
                        }
                        themeDivClasses="text-themeYellow"
                      />
                    </Link>)
                  }

                  <ToggleThemeComponent />
                  {isLoggedin ? (
                    <Link href={"/profile"} className="cursor-pointer">
                      <Text
                        content={<FontAwesomeIcon icon={faUser} />}
                        themeDivClasses="text-themeYellow"
                      />
                    </Link>
                  ) : (
                    <div className="grid grid-cols-2 gap-4" >

                      <Link
                        href={"/login"}
                        className="w-full py-2 px-4  border-transparent rounded-md shadow-sm text-center text-sm font-medium !border !border-themeYellow bg-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <Text
                          content={" login"}
                          themeDivClasses="border-thr"
                          lightColor="text-themeYellow"
                          darkColor="text-white"
                        />
                      </Link>
                      <Link
                        href={"/signup"}
                        className="w-full py-2 px-4 border border-transparent rounded-md text-center shadow-sm text-sm font-medium text-white bg-themeYellow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <Text
                          content={"Sign up"}
                          themeDivClasses=""
                          lightColor="text-white "
                          darkColor="text-white "

                        />
                      </Link>
                    </div>

                  )}
                  {isLoggedin &&

                    <FontAwesomeIcon onClick={() => {
                      UserStore.logout();
                    }}
                      className="text-themeYellow cursor-pointer"
                      icon={faPowerOff} />
                  }
                </div>
              </div>
            </div>
          </>
        }
      />
    </>
  );
};

export default observer(HeaderComponent);
