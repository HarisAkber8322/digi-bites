"use client";
import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faUser,
  faCartShopping,
  faPowerOff,
  faCross,
  faCancel,
  faClose,
  faArrowDownWideShort,
  faArrowDown,
  faChevronDown,
  faChevronUp,
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
import { FaBars } from "react-icons/fa";

const HeaderComponent = () => {
  const router = usePathname();
  // const routerTwo = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const CartStore = useContext(CartStoreContext);
  const UserStore = useContext(UserStoreContext);
  const { isLoggedin } = UserStore;

  useEffect(() => {
    // CartStore.loadCart();
  }, [CartStore.cartItems, CartStore.cart]);

  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };
  const [toggleDropdown, setToggleDropdown] = useState(false);

  const handleToggle = () => {
    setToggleDropdown(!toggleDropdown);
  };
  return (
    <>
      <Div
        themeDivClasses="md:fixed md:top-0 md:flex md:items-center md:w-full md:drop-shadow-md md:z-[999999]"
        content={
          <>
            <div className="md:w-[1180px] md:m-auto md:h-[64px] md:flex md:justify-between md:flex-row md:items-center">
              <div className="md:flex md:gap-4 md:flex-row md:items-center">
                {/* DIGIBITES LOGO */}
                <div className="xs:flex xs:items-center xs:justify-center xs:pt-5">
                  <Link href="/">
                    <Image
                      className="h-12 items-center"
                      src="/images/digibites.png"
                      alt="logo"
                    />
                  </Link>
                </div>

                {/* DESKTOP MENU */}
                <div className={` duration-75 xs:hidden md:left-0 md:block`}>
                  <ul className="md:flex  md:gap-10 md:text-lg md:font-semibold md:items-center">
                    <li className="md:transition-all md:duration-500 md:ease-in-out">
                      <Link
                        href=""
                        className={router === "/home" ? "active" : ""}
                      >
                        <Text
                          themeDivClasses="md:text-md md:font-semibold"
                          content={"Home"}
                        />
                      </Link>
                    </li>
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
                    {/* FOR LOGEDIN USER */}
                    {UserStore.isLoggedin && (
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
                    )}
                  </ul>
                </div>
              </div>
              <div className="md:flex md:items-center md:gap-5">
                <div className="md:flex md:items-center">
                  {/* <SearchInput onSearch={handleSearch} /> */}
                </div>
                <div className="md:text-lg md:flex items-center md:gap-5 xs:flex xs:gap-1">
                  <div className="xs:flex xs:w-full xs:justify-between xs:p-4 ">
                    {/* MOBILE MENU */}

                    <div>
                      <div className=" md:hidden md:gap-4 md:flex-row md:items-center">
                        <button className="close_btn" onClick={toggleMenu}>
                          <Text
                            themeDivClasses=""
                            content={
                              <>
                                <FontAwesomeIcon icon={faBars} />
                              </>
                            }
                          />
                        </button>
                      </div>
                      <Div
                        themeDivClasses={`md:hidden ease-in-out duration-100 top-0 left-0 h-screen z-50 shadow-2xl xs:w-[180px]  fixed ${isMenuOpen ? "!ml-[-180px]" : "ml-[0px]"}`}
                        content={
                          <>
                            <div className="xs:flex xs:gap-4 xs:flex-row xs:items-center justify-end p-4">
                              <button
                                className="close_btn"
                                onClick={toggleMenu}
                              >
                                <Text
                                  themeDivClasses=""
                                  content={
                                    <>
                                      <FontAwesomeIcon icon={faClose} />
                                    </>
                                  }
                                />
                              </button>
                            </div>
                            <ul className="p-5 xs:gap-10 xs:text-md xs:font-semibold xs:items-center">
                              <li className="xs:transition-all xs:duration-500 xs:ease-in-out xs:py-2 hover:bg-yellow-100 rounded-xl ">
                                <Link
                                  href="/"
                                  className={router === "/home" ? "active" : ""}
                                >
                                  <Text
                                    themeDivClasses="xs:text-md xs:font-semibold"
                                    content="Home"
                                  />
                                </Link>
                              </li>
                              <Text
                                themeDivClasses=""
                                content={
                                  <>
                                    {" "}
                                    <li className="xs:py-2 xs:duration-150 ease-in-out">
                                      <span
                                        className="xs:cursor-pointer xs:flex xs:items-center xs:gap-1"
                                        onClick={handleToggle}
                                      >
                                        Categories
                                        <button className="xs:text-[12px] text-black">
                                          {toggleDropdown ? (
                                            <FontAwesomeIcon
                                              icon={faChevronUp}
                                            />
                                          ) : (
                                            <FontAwesomeIcon
                                              icon={faChevronDown}
                                            />
                                          )}
                                        </button>
                                      </span>

                                      {toggleDropdown && (
                                        <ul className=" bg-white mt-2 xs:duration-200 ease-in-out">
                                          {menuData.map((category) => (
                                            <li
                                              key={category.category}
                                              className="xs:py-1 xs:px-2 xs:duration-150 ease-in-out text-black hover:bg-yellow-100 rounded-xl text-base font-normal "
                                            >
                                              <Link
                                                href={`/category/${category.category}`}
                                              >
                                                {category.category}
                                              </Link>
                                            </li>
                                          ))}
                                        </ul>
                                      )}
                                    </li>
                                  </>
                                }
                              />
                              {UserStore.isLoggedin && (
                                <li className="md:transition-all xs:py-1 md:duration-500 md:ease-in-out">
                                  <Link
                                    href="/favorite"
                                    className={
                                      router === "/favorite" ? "active" : ""
                                    }
                                  >
                                    <Text
                                      themeDivClasses="md:text-md md:font-semibold"
                                      content="Favorites"
                                    />
                                  </Link>
                                </li>
                              )}
                            </ul>
                          </>
                        }
                      />
                    </div>

                    <div className="flex gap-3 items-center">
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
                        </Link>
                      )}
                      <ToggleThemeComponent />

                      {isLoggedin ? (
                        <Link href={"/profile"} className="cursor-pointer">
                          <Text
                            content={<FontAwesomeIcon icon={faUser} />}
                            themeDivClasses="text-themeYellow"
                          />
                        </Link>
                      ) : (
                        <div className="grid grid-cols-2 gap-4 xs:flex xs:gap-1">
                          <Link
                            href={"/login"}
                            className="md:w-full py-2 px-4 xs:py-1   xs:px-3 xs:text-[12px] border-transparent rounded-md shadow-sm text-center text-sm font-medium !border !border-themeYellow bg-transparent focus:outline-none "
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
                            className="md:w-full py-2 px-4  xs:py-1   xs:px-2 xs:text-[12px]  border border-transparent rounded-md text-center shadow-sm text-sm font-medium text-white bg-themeYellow focus:outline-none "
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
                      {isLoggedin && (
                        <FontAwesomeIcon
                          onClick={() => {
                            UserStore.logout();
                          }}
                          className="text-themeYellow cursor-pointer"
                          icon={faPowerOff}
                        />
                      )}
                    </div>
                  </div>
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
