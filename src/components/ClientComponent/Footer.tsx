import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaGoogle,
  FaYoutube,
} from "react-icons/fa";
import Text from "../UI/Text";
import { Image } from "react-bootstrap";
import Link from "next/link";
import Div from "../UI/Div";

const Footer: React.FC = () => {
  return (
    <footer className="">
      <Div
        lightColor="bg-ExtraLightGray"
        darkColor="bg-peperblack2"
        themeDivClasses=" flex "
        content={
          <>
            <div
              className=" w-full md:h-[195px] mx-auto flex flex-col relative"
              style={{
                background: `url('/images/wave.svg') bottom center no-repeat`,
                backgroundSize: "cover",
              }}
            >
              <div className="flex flex-row ">
                <Link href="/" passHref>
                  <Image
                    className=" mx-6 md:drop-shadow-md justify-center"
                    src="/images/digibites.png"
                    alt="logo"
                    width={300}
                    height={300}
                  />
                </Link>
                <Text
                  lightColor="text-dullyellow"
                  darkColor="text-dullyellow"
                  themeDivClasses="w-full flex justify-end mx-6 "
                  content={
                    <>
                      <nav className="">
                        <ul className="flex flex-rows gap-4 text-lg font-medium">
                          <li>
                            <Link href="/about">About</Link>
                          </li>
                          <li>
                            <Link href="/contact">Contact Us</Link>
                          </li>
                          <li>
                            <Link href="/privacy">Privacy Policy</Link>
                          </li>
                        </ul>
                      </nav>
                    </>
                  }
                />
              </div>
              <div className=" absolute bottom-1 w-full flex flex-row items-center justify-between">
                <div className="text-white">
                  <h2>Copyright ©2024</h2>
                </div>
                <div className="flex space-x-4 mr-6 text-xl text-dullyellow">
                  <FaFacebook className="hover:text-blue-600" />
                  <FaInstagram className="hover:text-pink-600" />
                  <FaTwitter className="hover:text-blue-400" />
                  <FaGoogle className="hover:text-red-600" />
                  <FaYoutube className="hover:text-red-600" />
                </div>
              </div>
            </div>
          </>
        }
      />
    </footer>
  );
};

export default Footer;
