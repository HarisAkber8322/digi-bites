import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaGoogle, FaYoutube } from 'react-icons/fa';
import Text from '../UI/Text';
import { Image } from "react-bootstrap";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className=" w-full">

      <Text themeDivClasses="bg-blue1 mx-auto flex flex-col items-center" content={
        <>
        {/* Social Media Icons */}
        <div className="">
                  <Link href="/home">
                    <Image className="h-12 my-3" src="/images/digibites.png" alt="logo" />
                  </Link>
                </div>
        <div className="flex space-x-8 mb-6 text-4xl">
          <FaFacebook className="hover:text-blue-600" />
          <FaInstagram className="hover:text-pink-600" />
          <FaTwitter className="hover:text-blue-400" />
          <FaGoogle className="hover:text-red-600" />
          <FaYoutube className="hover:text-red-600" />
        </div>
        {/* Navigation Links */}
        <nav className="mb-6 ">
          <ul className="flex space-x-4 text-xl font-semibold">
            <li><a href="#" className="ml-6 hover:text-dullyellow">Home</a></li>
            <li><a href="#" className="ml-6 hover:text-dullyellow">News</a></li>
            <li><a href="#" className="ml-6 hover:text-dullyellow">About</a></li>
            <li><a href="#" className="ml-6 hover:text-dullyellow">Contact Us</a></li>
            <li><a href="#" className="ml-6 hover:text-dullyellow">Our Team</a></li>
          </ul>
          
        </nav>
        {/* Copyright Notice */}
        <hr className='w-full'/>
        <small className=" my-2">Copyright ©2024</small>
        </>
      }/>
    </footer>
  );
};

export default Footer;
