import React from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPinterest, faLinkedin, faFacebook } from "@fortawesome/free-brands-svg-icons";

const Footer: React.FC = () => {
  return (
    <div className={classNames(["bg-lightorange mt-0.5 text-white"])}>
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* NEWS LETTER Section */}
        <div className="flex justify-center items-center"><h1 className="font-bold text-2xl  ">DigiBites</h1></div>
        <div className="">
          <h5 className="font-bold text-lg mb-2">NEWS LETTER</h5>
          <p>Subscribe to our news letter to get latest updates</p>
          <form className="mt-2">
            <input
              type="email"
              placeholder="Your email address"
              className="p-2 text-gray-700 border rounded-md mr-2"
            />
            <button
              type="submit"
              className="border-dullyelow text-black p-2 rounded-md"
            >
              Subscribe
            </button>
          </form>
          <div className="flex space-x-2 mt-2">
            {/* Social Media Icons */}
            <a href="#" className="hover:text-gray-500">
              <FontAwesomeIcon icon={faPinterest} />
            </a>
            <a href="#" className="hover:text-gray-500">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a href="#" className="hover:text-gray-500">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
          </div>
        </div>

        {/* My Account Section */}
        <div className="flex items-end flex-col">
          <h4 className="font-bold text-xl mb-2">My Account</h4>
          <ul>
            <li><a href="#" className="hover:text-gray-500">Profile</a></li>
            <li><a href="#" className="hover:text-gray-500">Address</a></li>
            <li><a href="#" className="hover:text-gray-500">Live Chat</a></li>
            <li><a href="#" className="hover:text-gray-500">My Orders</a></li>
          </ul>
        </div>

        {/* Quick Links Section */}
        <div className="flex items-end flex-col relative right-0">
          <h4 className="font-bold text-xl mb-2">Quick Links</h4>
          <ul>
            <li><a href="#" className="hover:text-gray-500">Contact Us</a></li>
            <li><a href="#" className="hover:text-gray-500">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-gray-500">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-gray-500">About Us</a></li>
          </ul>
        </div>
      </div>
      <hr className="border-grey-500"></hr>
      <div className="text-center text-gray-600 mt-0">
        DIGIBITE © 2024
      </div>
      
    </div>
  );
};

export default Footer;
