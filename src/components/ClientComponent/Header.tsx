import React, { useContext } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faUser,
  faXmark,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import Dropdown from "react-bootstrap/Dropdown";
import ToggleThemeComponent from "../ToggleThemeButton";
import { Image } from "react-bootstrap";
import { usePathname } from "next/navigation";
import ThemeStore from "@/store/ThemeStore";
import { observer } from "mobx-react";
import Div from "../UI/Div";
import Text from "../UI/Text";
import SearchInput from "./OtherComponents/SearchInput"; // Assuming your path

const HeaderComponent = (props: {
  themeStore: { themeMode: string };
  HandleToggle: React.MouseEventHandler<HTMLButtonElement> | undefined;
}) => {
  const router = usePathname();
  // const { themeMode } = useContext(ThemeStore);

  const handleSearch = (searchTerm: string) => {
    // Implement your search logic here
    console.log("Search term:", searchTerm);
  };

  return (
    <>
      <Div
        themeDivClasses={
          "fixed top-0  flex items-center w-full shadow-sm shadow-lg z-[999999]"
        }
        content={
          <>
            <div className="w-[1180px] m-auto h-[64px] flex justify-between flex-row items-center">
              <div className="flex gap-4 flex-row items-center ">
                <div className="">
                  <Link href="/home">
                    <Image
                      className="h-12"
                      src="/images/digibites.png"
                      alt="logo"
                    />
                  </Link>
                </div>
                <div className="navbar_menu left-0 ">
                  <ul className="flex gap-10 text-lg font-semibold items-center ">
                    <li className="transition-all duration-500 ease-in-out">
                      <Link
                        href="/home"
                        className={router === "/home" ? "active" : ""}
                      >
                        <Text
                          themeDivClasses="text-md font-semibold"
                          content={"Home"}
                        />
                      </Link>
                    </li>
                    <li className="transition-all duration-500 ease-in-out">
                      <Link
                        href="/users"
                        className={router === "/users" ? "active" : ""}
                      >
                        <Text
                          themeDivClasses="text-md font-semibold"
                          content={"users"}
                        />
                      </Link>
                    </li>
                    <li className="transition-all duration-500 ease-in-out">
                      <Link
                        href="/shop"
                        className={router === "/shop" ? "active" : ""}
                      >
                        <Text
                          themeDivClasses="text-md font-semibold"
                          content={"shop"}
                        />
                      </Link>
                    </li>
                    <li className="transition-all duration-500 ease-in-out">
                      <Link
                        href="/contact"
                        className={router === "/contact" ? "active" : ""}
                      >
                        <Text
                          themeDivClasses="text-md font-semibold"
                          content={"contact"}
                        />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <div className="flex items-center ">
                  <SearchInput onSearch={handleSearch} />{" "}
                  {/* Added SearchInput */}
                </div>
                <div className="text-lg flex items-center gap-5">
                  <Link href={"/client/profile/"} className="cursor-pointer">
                    <Text
                      content={<FontAwesomeIcon icon={faUser} />}
                      themeDivClasses=""
                    />
                  </Link>
                  <ToggleThemeComponent themeStore={props.themeStore} />
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
