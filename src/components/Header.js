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
const HeaderComponent = (props) => {
  const router = useRouter();
  const { themeMode } = useContext(ThemeStore);

  return (
    <>
      <Header theme={themeMode}>
        <div className="navbar_logo">
          <button className="close_btn" onClick={props.HandleToggle}>
            <FontAwesomeIcon icon={faBars} />
          </button>
          <Link href="/home">
            <Image src="/images/logo.png" alt="logo" />
          </Link>
        </div>
        <div className="navbar_menu">
          <ul>
            <li>
              <Link
                href="/home"
                className={router.pathname === "/home" ? "active" : ""}
              >
                {" "}
                <span>Home</span>{" "}
              </Link>
            </li>
            <li>
              <Link
                href="/users"
                className={router.pathname === "/users" ? "active" : ""}
              >
                {" "}
                <span> User </span>{" "}
              </Link>
            </li>
            <li>
              <Link
                href="/shop"
                className={router.pathname === "/shop" ? "active" : ""}
              >
                {" "}
                <span> Shop</span>{" "}
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className={router.pathname === "/contact" ? "active" : ""}
              >
                <span> contact </span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="navbar_user">
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              <FontAwesomeIcon icon={faUser} />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <Link href="/users/user1"> USER 1</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link href="#"> USER 2</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link href="#"> USER 3</Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <ToggleThemeComponent />
        </div>
      </Header>
    </>
  );
};
export default HeaderComponent;
