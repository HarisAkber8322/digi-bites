import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import Div from "../UI/Div";
import Text from "../UI/Text";
import classNames from "classnames";
interface SideBarProps {
  toggle: boolean;
  // Add other props if needed
}
const SideBarComponent: React.FC<SideBarProps> = (props) => {
  return (
    <Div
      themeDivClasses={classNames([
        "ease-in-out duration-300 h-screen  border-r border-lightGray pt-32 fixed",
        props.toggle ? "!w-[80px]" : "w-[250px]",
      ])}
      content={
        <>
          <ul className="w-full flex flex-col gap-5">
            <li className=" duration-500">
              <Link
                className={classNames([
                  "ease-in-out duration-300 h-screen text-base font-semibold py-5 px-8  items-center ",
                  props.toggle ? "pl-7" : "pl-12",
                ])}
                href="/admin"
              >
                <Text
                  themeDivClasses=""
                  content={
                    <>
                      <FontAwesomeIcon
                        className="text-lightorange"
                        icon={faHome}
                      />{" "}
                    </>
                  }
                />
                <Text
                  themeDivClasses={classNames([
                    " duration-300 ease-in-out",
                    ,
                    props.toggle ? "text-[0px]" : "text-base",
                  ])}
                  content={<>Dashboard</>}
                />
              </Link>
            </li>
            <li className=" duration-500">
              <Link
                className={classNames([
                  "ease-in-out duration-300 h-screen text-base font-semibold py-5 px-8  items-center ",
                  props.toggle ? "pl-7" : "pl-12",
                ])}
                href="/admin/users"
              >
                <Text
                  themeDivClasses=""
                  content={
                    <>
                      <FontAwesomeIcon
                        className="text-lightorange"
                        icon={faUser}
                      />{" "}
                    </>
                  }
                />
                <Text
                  themeDivClasses={classNames([
                    " duration-300 ease-in-out",
                    ,
                    props.toggle ? "text-[0px]" : "text-base",
                  ])}
                  content={<>Users</>}
                />
              </Link>
            </li>
          </ul>
        </>
      }
    />
  );
};
export default SideBarComponent;
