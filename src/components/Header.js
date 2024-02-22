import * as style from "../styles/globalStyles";
import GlobalStyles, { Header } from "../styles/globalStyles";
import React, { useContext } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "react-bootstrap/Dropdown";
import ToggleThemeComponent from "./ToggleThemeButton";
import { Image } from "react-bootstrap";
import { useRouter } from "next/router";
import ThemeStore from "@/store/ThemeStore";
import { observer } from "mobx-react";
import Div from "./UI/Div";
const HeaderComponent = (props) => {
  const router = useRouter();
  // const { themeMode } = useContext(ThemeStore);
  return (
    <>
      {/* <Header theme={props.themeStore.themeMode}> */}
      <Div
      themeDivClasses={"fixed top-0 z-50 h-16 w-full flex items-center justify-between px-17 md:px-25"}
        themeMode={props.themeStore.themeMode}
        content={
          <>
            <div className="flex items-center gap-10">
              <button className="h-10 text-lg border border-solid border-green-600 rounded px-4 py-2 transition duration-500 ease-in-out hover:bg-green-600" onClick={props.HandleToggle}>
                <FontAwesomeIcon icon={faBars} />
              </button>
              <Link href="/home">
                <Image className="h-12" src="/images/logo.png" alt="logo" />
              </Link>
            </div>
            <div className="navbar_menu">
              <ul className="flex gap-10 text-lg font-semibold items-center">
                <li className="transition-all duration-500 ease-in-out">
                  <Link
                    href="/home"
                    className={router.pathname === "/home" ? "active" : ""}
                  >
                    {" "}
                    <span className="">Home</span>{" "}
                  </Link>
                </li>
                <li className="transition-all duration-500 ease-in-out">
                  <Link
                    href="/users"
                    className={router.pathname === "/users" ? "active" : ""}
                  >
                    {" "}
                    <span> User </span>{" "}
                  </Link>
                </li>
                <li className="transition-all duration-500 ease-in-out">
                  <Link
                    href="/shop"
                    className={router.pathname === "/shop" ? "active" : ""}
                  >
                    {" "}
                    <span> Shop</span>{" "}
                  </Link>
                </li>
                <li className="transition-all duration-500 ease-in-out">
                  <Link
                    href="/contact"
                    className={router.pathname === "/contact" ? "active" : ""}
                  >
                    <span> contact </span>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="text-lg flex items-center gap-10">
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  <FontAwesomeIcon icon={faUser} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item className="focus-within:text-white focus-within:bg-green-600 hover:text-white hover:bg-green-600">
                    <Link  className="flex w-full" href="/users/user1"> USER 1</Link>
                  </Dropdown.Item>
                  <Dropdown.Item className="focus-within:text-white focus-within:bg-green-600 hover:text-white hover:bg-green-600">
                    <Link  className="flex w-full" href="#"> USER 2</Link>
                  </Dropdown.Item>
                  <Dropdown.Item className="focus-within:text-white focus-within:bg-green-600 hover:text-white hover:bg-green-600">
                    <Link className="flex w-full" href="#"> USER 3</Link>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <ToggleThemeComponent themeStore={props.themeStore} />
            </div>
          </>
        }
      />

      {/* </Header> */}
    </>
  );
};
export default observer(HeaderComponent);
