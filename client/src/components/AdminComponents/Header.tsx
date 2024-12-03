import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import AdminProfileComponent from "./AdminOthersComp/AdminProfile";
import { Image } from "react-bootstrap";
import { usePathname } from "next/navigation";
import Div from "../UI/Div";
import Text from "../UI/Text";
import { observer } from "mobx-react";
import MainStoreContext from "../../store/Mainstore";
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

  return (
    <>
      <Div
        themeDivClasses={classNames([
          "md:fixed md:top-0 w-full md:flex md:items-center md:drop-shadow-md md:z-[999999]",
        ])}
        content={
          <>
            <div
              className={classNames([
                "md:h-[64px] px-5 w-full md:flex md:justify-between md:flex-row md:items-center",
              ])}
            >
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
                </div>
                <div className="md:text-lg md:flex md:items-center md:gap-8">
                  <AdminProfileComponent />
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