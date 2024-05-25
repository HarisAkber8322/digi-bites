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
    <footer className="w-full">
      <Div
        darkColor="bg-peperblack2"
        lightColor="bg-lightGray"
        themeDivClasses="bg-white mx-auto flex flex-col items-center"
        content={
          <>
            {/* Social Media Icons */}
            <div className="flex flex-rows">
              <Link href="/" passHref>
                <Image
                  className="h-12 my-3 md:drop-shadow-md"
                  src="/images/digibites.png"
                  alt="logo"
                />
              </Link>
              <Text
                themeDivClasses="flex drop-shadow-md justify-center items-center text-6xl text-dullyellow font-bold"
                content="Restaurant"
              />
            </div>
            <Text
              lightColor="text-pepperblack2"
              darkColor="text-pepperblack2"
              themeDivClasses=""
              content={
                <>
                  <div className="flex space-x-8 mb-6 text-4xl">
                    <FaFacebook className="hover:text-blue-600" />
                    <FaInstagram className="hover:text-pink-600" />
                    <FaTwitter className="hover:text-blue-400" />
                    <FaGoogle className="hover:text-red-600" />
                    <FaYoutube className="hover:text-red-600" />
                  </div>
                  {/* Navigation Links */}
                  <nav className="mb-6">
                    <ul className="flex space-x-4 text-lg font-normal">
                      <li>
                        <Link href="/" className="ml-6 hover:text-dullyellow">
                          Home
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/news"
                          className="ml-6 hover:text-dullyellow"
                        >
                          News
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/about"
                          className="ml-6 hover:text-dullyellow"
                        >
                          About
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/contact"
                          className="ml-6 hover:text-dullyellow"
                        >
                          Contact Us
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/team"
                          className="ml-6 hover:text-dullyellow"
                        >
                          Our Team
                        </Link>
                      </li>
                    </ul>
                  </nav>
                  {/* Copyright Notice */}
                  <hr className="w-full" />
                  <small className="my-2">Copyright ©2024</small>
                </>
              }
            />
          </>
        }
      />
    </footer>
  );
};

export default Footer;
