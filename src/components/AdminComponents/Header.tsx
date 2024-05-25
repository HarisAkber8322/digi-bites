
import React, { useContext } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "react-bootstrap/Dropdown";
import ToggleThemeComponent from "../ToggleThemeButton";
import { Image } from "react-bootstrap";
import { usePathname } from "next/navigation";
import { observer } from "mobx-react";
import Div from "../UI/Div";
import Text from "../UI/Text";
const HeaderComponent = () => {
  const router = usePathname();
  return (
    <>
      {/* <Header theme={props.themeStore.themeMode}> */}
      <Div
        themeDivClasses={
          "fixed top-0 z-50 h-16 w-full flex items-center justify-between shadow-sm px-17 md:px-25"
        }
        content={
          <>
            <div className="flex items-center gap-10">
              <Link href="/home">
                <Image className="h-12" src="/images/logo.png" alt="logo" />
              </Link>
            </div>
            <div className="navbar_menu">
              <ul className="flex gap-10 text-lg font-semibold items-center">
                <li className="transition-all duration-500 ease-in-out">
                  <Link
                    href="/home"
                    className={router === "/home" ? "active" : ""}
                  >

                    <span className="">Home</span>
                  </Link>
                </li>
                <li className="transition-all duration-500 ease-in-out">
                  <Link
                    href="/users"
                    className={router === "/users" ? "active" : ""}
                  >

                    <span> User </span>
                  </Link>
                </li>
                <li className="transition-all duration-500 ease-in-out">
                  <Link
                    href="/shop"
                    className={router === "/shop" ? "active" : ""}
                  >

                    <span> Shop</span>
                  </Link>
                </li>
                <li className="transition-all duration-500 ease-in-out">
                  <Link
                    href="/contact"
                    className={router === "/contact" ? "active" : ""}
                  >
                    <span> contact </span>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="text-lg flex items-center gap-10">
              <Text content={<FontAwesomeIcon icon={faUser} />} themeDivClasses="" />
              <ToggleThemeComponent />
            </div>
          </>
        }
      />

      {/* </Header> */}
    </>
  );
};
export default observer(HeaderComponent);
