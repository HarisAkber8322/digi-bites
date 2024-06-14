import React, { useState, useContext } from "react";
import { observer } from "mobx-react-lite";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaGoogle,
  FaYoutube,
  FaShareAlt,
} from "react-icons/fa";
import Text from "../UI/Text";
import { Image } from "react-bootstrap";
import Link from "next/link";
import Div from "../UI/Div";
import ThemeStoreContext from "../../store/ThemeStore"; // Adjust the import path as needed

const Footer: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const themeStore = useContext(ThemeStoreContext); // Use the ThemeStore

  return (
    <footer className="border-t-2 border-themeYellow">
      <Div
        lightColor="bg-ExtraLightGray"
        darkColor="bg-peperblack2"
        themeDivClasses="  "
        content={
          <>
            <div className="md:w-[1180px] m-auto flex justify-between items-center py-2">
              <div className="flex flex-row items-center">
                <Link href="/" passHref>
                  <Image
                    className=""
                    src={
                      themeStore.themeMode === "dark"
                        ? "/images/digibites-light.png"
                        : "/images/digibites-dark.png"
                    }
                    alt="logo"
                    width={150}
                    height={100}
                  />
                </Link>
              </div>
              <div
                className={`relative flex items-center ml-32 transition-all duration-400 ease-in-out text-themeYellow ${
                  isHovered ? "w-60" : "w-10"
                } overflow-hidden`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {!isHovered && <FaShareAlt className="text-xl" />}
                {isHovered && (
                  <div className="flex flex-row items-center justify-between w-full space-x-4 text-xl">
                    <FaFacebook />
                    <FaInstagram />
                    <FaTwitter />
                    <FaGoogle />
                    <FaYoutube />
                  </div>
                )}
              </div>
              <Text
                themeDivClasses="flex justify-center"
                content={
                  <nav>
                    <ul className="flex flex-rows gap-4 text-[15px] font-semibold items-center h-full">
                      <li>
                        <Link href="/about">About</Link>
                      </li>
                      <li>
                        <Link href="/contact">Contact Us</Link>
                      </li>
                      <li>
                        <Link href="/privacy-policy">Privacy Policy</Link>
                      </li>
                    </ul>
                  </nav>
                }
              />
            </div>
          </>
        }
      />
    </footer>
  );
};

export default observer(Footer);
