import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faUser,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import ToggleThemeComponent from "../ToggleThemeButton";
import { Image } from "react-bootstrap";
import { usePathname } from "next/navigation";
import Div from "../UI/Div";
import Text from "../UI/Text";
import { observer } from "mobx-react";
import MainStoreContext from "@/store/Mainstore";
import { menuData } from "../../utills/constants"; // Adjust the path to where your menuData is located

const HeaderComponent = () => {
  const router = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );
  const MainStore = useContext(MainStoreContext);

  useEffect(() => {
    const updateCartCount = () => {
      const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
      const totalCount = cartItems.reduce(
        (acc: number, item: any) => acc + item.quantity,
        0,
      );
      MainStore.setCartCount(totalCount);
    };

    window.addEventListener("storage", updateCartCount);
    updateCartCount();

    return () => {
      window.removeEventListener("storage", updateCartCount);
    };
  }, [MainStore]);

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
        themeDivClasses="client_side md:fixed md:top-0 md:flex md:items-center md:w-full md:drop-shadow-md md:z-[999999]"
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
                  <Link href={"/profile"} className="cursor-pointer">
                    <Text
                      content={<FontAwesomeIcon icon={faUser} />}
                      themeDivClasses=""
                    />
                  </Link>
                  <Link href="/cart" className="cursor-pointer">
                    <Text
                      content={
                        <>
                          <FontAwesomeIcon icon={faCartShopping} />
                          {MainStore.cartCount > 0 && (
                            <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 ml-1 relative bottom-4">
                              {MainStore.cartCount}
                            </span>
                          )}
                        </>
                      }
                      themeDivClasses=""
                    />
                  </Link>
                  <ToggleThemeComponent />
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
