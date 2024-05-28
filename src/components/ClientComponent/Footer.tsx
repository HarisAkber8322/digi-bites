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
        themeDivClasses=" mx-auto flex flex-col "
        content={
          <>
            {/* Social Media Icons */}
            <div
              className=" bottom-0 left-0 w-full md:h-[195px] "
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
                {/* <Text
                  themeDivClasses="flex drop-shadow-md justify-center items-center text-6xl text-dullyellow font-bold"
                  content="Restaurant"
                /> */}
                <Text
                  lightColor="text-pepperblack2"
                  themeDivClasses="w-full flex flex-col items-end "
                  content={
                    <>
                      {/* Navigation Links */}
                      <nav className="my-2 mx-6">
                        <ul className="flex flex-col  text-lg font-normal">
                          <li>
                            <Link href="/" className=" hover:text-dullyellow">
                              Home
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/news"
                              className="hover:text-dullyellow"
                            >
                              News
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/about"
                              className="hover:text-dullyellow"
                            >
                              About
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/contact"
                              className="hover:text-dullyellow"
                            >
                              Contact Us
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/team"
                              className="hover:text-dullyellow"
                            >
                              Our Team
                            </Link>
                          </li>
                        </ul>
                      </nav>
                    </>
                  }
                />
              </div>

              {/* Copyright Notice */}
              <Text
                
                themeDivClasses=""
                content={
                  <>
                    {/* <hr className="w-full text-lightGray  " /> */}
                    <div className="flex flex-row justify-between  ">
                      <small className="my-2 mx-6 ">Copyright ©2024</small>
                      <div className="flex space-x-4 mr-6 text-xl my-2 text-dullyellow">
                        <FaFacebook className="hover:text-blue-600" />
                        <FaInstagram className="hover:text-pink-600" />
                        <FaTwitter className="hover:text-blue-400" />
                        <FaGoogle className="hover:text-red-600" />
                        <FaYoutube className="hover:text-red-600" />
                      </div>
                    </div>
                  </>
                }
              />
            </div>
          </>
        }
      />
    </footer>
  );
};

export default Footer;
