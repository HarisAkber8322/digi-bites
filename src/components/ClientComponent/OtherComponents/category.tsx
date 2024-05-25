import React, { useState } from "react";
import Link from "next/link";
import Div from "../../UI/Div"; // Adjust the import path as necessary
import Text from "../../UI/Text"; // Adjust the import path as necessary
import { MenuList } from "../../../utills/constants";

const Category = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = (isOpen: boolean) => {
    setIsDropdownOpen(isOpen);
  };

  return (
    <li
      className="md:relative md:transition-all md:duration-500 md:ease-in-out cursor-pointer"
      onClick={() => toggleDropdown(!isDropdownOpen)}
    >
      <Text themeDivClasses="md:text-md md:font-semibold cursor-pointer" content="category" />
      {isDropdownOpen && (
        <Div
          themeDivClasses="absolute top-full left-0 mt-2 w-48  shadow-lg rounded-md z-10"
          content={
            <ul className="py-2">
              {MenuList.map((menuItem, index) => (
                <li key={index} className="px-4 py-2 hover:bg-gray-200">
                  {/* <Link href={menuItem.link}> */}
                      <Text
                        themeDivClasses="md:text-md md:font-semibold"
                        content={menuItem.name}
                      />
                  {/* </Link> */}
                </li>
              ))}
            </ul>
          }
        />
      )}
    </li>
  );
};

export default Category;
