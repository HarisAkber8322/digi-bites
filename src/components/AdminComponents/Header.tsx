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
import classNames from "classnames";

 interface HeaderProps {
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  handleToggle: () => void;
}

const HeaderComponent: React.FC<HeaderProps> = ({
  toggle,
  setToggle,
  handleToggle,
}) => {
  const router = usePathname();
  const MainStore = useContext(MainStoreContext);
  useEffect(() => {
    const updateCartCount = () => {
      const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
      const totalCount = cartItems.reduce(
        (acc: number, item: any) => acc + item.quantity,
        0
      );
      MainStore.setCartCount(totalCount);
    };

    // Listen for changes in localStorage
    window.addEventListener("storage", updateCartCount);

    // Initial count update
    updateCartCount();

    // Cleanup function
    return () => {
      window.removeEventListener("storage", updateCartCount);
    };
  }, []);

  return (
    <>
      <Div
      themeDivClasses={classNames(["md:fixed md:top-0 w-full md:flex md:items-center  md:drop-shadow-md md:z-[999999]"])}
        content={
          <>
            <div className= {classNames(["md:h-[64px] px-8 w-full md:flex md:justify-between md:flex-row md:items-center"])}>
              <div className="md:flex md:gap-4 md:flex-row md:items-center">
                <button className="close_btn" onClick={handleToggle}>
                  <Text
                    themeDivClasses=""
                    content={
                      <>
                        <FontAwesomeIcon icon={faBars} />
                      </>
                    }
                  />
                </button>
                <div className="xs:flex xs:items-center xs:justify-center xs:pt-5">
                  <Link href="/">
                    <Image
                      className="h-12 items-center"
                      src="/images/digibites.png"
                      alt="logo"
                    />
                  </Link>
                </div>
              </div>
              <div className="md:flex md:items-center md:gap-5">
                <div className="md:flex md:items-center">
                  {/* <SearchInput onSearch={handleSearch} /> */}
                </div>
                <div className="md:text-lg md:flex md:items-center md:gap-5">
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
