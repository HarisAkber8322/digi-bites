import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import ToggleThemeComponent from "../ToggleThemeButton";
import { Image } from "react-bootstrap";
import { usePathname } from "next/navigation";
import Div from "../UI/Div";
import Text from "../UI/Text";
import { observer } from "mobx-react";
import MainStoreContext from "@/store/Mainstore";

const HeaderComponent = () => {
  const router = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const MainStore = useContext(MainStoreContext);
  useEffect(() => {
    const updateCartCount = () => {
      const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
      const totalCount = cartItems.reduce((acc: number, item: any) => acc + item.quantity, 0);
      MainStore.setCartCount(totalCount);
    };

    // Listen for changes in localStorage
    window.addEventListener('storage', updateCartCount);

    // Initial count update
    updateCartCount();

    // Cleanup function
    return () => {
      window.removeEventListener('storage', updateCartCount);
    };
  }, []);

  const handleSearch = (searchTerm: string) => {
    console.log("Search term:", searchTerm);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
                    content={<FontAwesomeIcon icon={faBars} onClick={toggleMenu} />}
                  />
                </div>
                <div className={`navbar_menu xs:hidden duration-75 md:left-0 md:block`}>
                  <ul className="md:flex md:gap-10 md:text-lg md:font-semibold md:items-center">
                    <li className="md:transition-all md:duration-500 md:ease-in-out">
                      <Link
                        href="/client/favorite"
                        className={router === "/client/favorite" ? "active" : ""}
                      >
                        <Text
                          themeDivClasses="md:text-md md:font-semibold"
                          content={"Favorites"}
                        />
                      </Link>
                    </li>
                    <li className="md:transition-all md:duration-500 md:ease-in-out">
                      <Link href="/contact" className={router === "/contact" ? "active" : ""}>
                        <Text themeDivClasses="md:text-md md:font-semibold" content={"contact"} />
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
                  <Link
                    href={"/client/profile"}
                    className="cursor-pointer"
                  >
                    <Text
                      content={<FontAwesomeIcon icon={faUser} />}
                      themeDivClasses=""
                    />
                  </Link>
                  <Link href="/client/cart" className="cursor-pointer">
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
              </div >
            </div >
          </>
        }
      />
    </>
  );
};

export default observer(HeaderComponent);
