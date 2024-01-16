import React from "react";
import * as style from "../styles/globalStyles";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faContactBook,
  faHome,
  faShop,
  faUser,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
const SideBarComponent = (props) => {
  const router = useRouter();
  return (
    <>
      <style.sideBar toggleprop={`${props.toggle}`}>
        <ul>
          <li>
            <Link href="/home" className={router.pathname === "/home" ? "active" : ""}>
              <span><FontAwesomeIcon icon={faHome}/> </span>
              <span className="list_text">Home</span>
            </Link>
          </li>
          <li>
            <Link
              href="/users"
              className={router.pathname === "/users" ? "active" : ""}
            >
              {" "}
              <span>
                <FontAwesomeIcon icon={faUser} />
              </span>{" "}
              <span className="list_text"> User </span>{" "}  
            </Link>
          </li>
          <li>
            <Link
              href="/shop"
              className={router.pathname === "/shop" ? "active" : ""}
            >
              {" "}
              <span>
                <FontAwesomeIcon icon={faShop} />
              </span>{" "}
              <span className="list_text"> Shop</span>{" "}
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className={router.pathname === "/contact" ? "active" : ""}
            >
              <span>
                <FontAwesomeIcon icon={faContactBook} />
              </span>{" "}
              <span className="list_text"> contact </span>
            </Link>
          </li>
        </ul>
      </style.sideBar>
    </>
  );
};
export default SideBarComponent;
