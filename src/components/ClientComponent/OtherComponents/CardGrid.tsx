import React from "react";
import Link from "next/link";
import Image from "next/image";
import Div from "../../UI/Div";
import Text from "../../UI/Text";
import { MenuList } from "../../../utills/constants";

interface MenuItem {
  name: string;
  image: string;
  price: number;
  description: string;
  link: string;
}

const Card = ({ menuItem }: { menuItem: MenuItem }) => (
  <Link href={menuItem.link} passHref className="relative group duration-500 cursor-pointer overflow-hidden relative text-gray-50 h-72 w-56 rounded-2xl hover:duration-700 duration-700">

    <div className="w-56 h-72 bg-lime-400 text-gray-800">
      <div className="flex flex-row justify-between">
        <svg
          className="fill-current stroke-current w-8 h-8 p-2 hover:bg-lime-200 rounded-full m-1"
          height="100"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 100 100"
          width="100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.8,32.9V15.8m0,0H32.9m-17.1,0L37.2,37.2m47-4.3V15.8m0,0H67.1m17.1,0L62.8,37.2m-47,29.9V84.2m0,0H32.9m-17.1,0L37.2,62.8m47,21.4L62.8,62.8M84.2,84.2V67.1m0,17.1H67.1"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="8"
          ></path>
        </svg>
        <svg
          className="fill-current stroke-current w-8 h-8 p-2 m-1 hover:bg-lime-200 rounded-full"
          height="100"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 100 100"
          width="100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="svg-stroke-primary"
            d="M50,17.4h0M50,50h0m0,32.6h0M50,22a4.7,4.7,0,1,1,4.7-4.6A4.7,4.7,0,0,1,50,22Zm0,32.7A4.7,4.7,0,1,1,54.7,50,4.7,4.7,0,0,1,50,54.7Zm0,32.6a4.7,4.7,0,1,1,4.7-4.7A4.7,4.7,0,0,1,50,87.3Z"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="8"
          ></path>
        </svg>
      </div>
    </div>
    <div className="absolute bg-gray-50 -bottom-24 w-56 p-3 flex flex-col gap-1 group-hover:-bottom-0 group-hover:duration-600 duration-500">
      <span className="text-lime-400 font-bold text-xs">{menuItem.name}</span>
      <span className="text-gray-800 font-bold text-3xl">${menuItem.price}</span>
      <p className="text-neutral-800">{menuItem.description}</p>
    </div>
  </Link>
);

const CardGrid = () => (
  <>
    <div className="mt-14 flex justify-center">
      <Text themeDivClasses="text-3xl font-bold" content={"Menu"} />
    </div>
    <Div themeDivClasses={"bg-pepperBlack"} content={
      <div className="grid grid-cols-3 mt-7 ml-20 mr-20 gap-4">
        {MenuList.slice(0, 3).map((menuItem: MenuItem, index: number) => (
          <Card key={index} menuItem={menuItem} />
        ))}
      </div>
    } />
  </>
);

export default CardGrid;
