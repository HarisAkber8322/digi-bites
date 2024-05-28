import React from "react";
import Link from "next/link";
import Image from "next/image";
import Div from "../../UI/Div";
import Text from "../../UI/Text";
import { cardList } from "../../../utills/constants";

interface MenuItem {
  name: string;
  image: string;
  price: number;
  description: string;
  link: string;
}

const Card = ({ menuItem }: { menuItem: MenuItem }) => (
  <Link
    href={menuItem.link}
    passHref
    className="relative  hover:bg-black duration-75 group duration-500 cursor-pointer overflow-hidden relative text-dullyellow h-[350px] w-[350px] rounded-2xl transform transition-transform hover:scale-105 hover:shadow-2xl "
  >
    <div
      className="w-[350px] h-[350px] bg-dullyellow bg-cover bg-center  text-gray-800 hover:opacity-50"
      style={{ backgroundImage: `url(${menuItem.image})`}}
    >
      
      <div className="flex flex-row justify-between">
        <svg
          className="fill-current stroke-current w-8 h-8 p-2 hover:bg-orange1 rounded-full m-1"
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
          className="fill-current stroke-current w-8 h-8 p-2 m-1 "
          height="100"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 100 100"
          width="100"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* <path
            className="svg-stroke-primary"
            d="M50,17.4h0M50,50h0m0,32.6h0M50,22a4.7,4.7,0,1,1,4.7-4.6A4.7,4.7,0,0,1,50,22Zm0,32.7A4.7,4.7,0,1,1,54.7,50,4.7,4.7,0,0,1,50,54.7Zm0,32.6a4.7,4.7,0,1,1,4.7-4.7A4.7,4.7,0,0,1,50,87.3Z"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="8"
          ></path> */}
        </svg>
      </div>
    </div>
    <div className="absolute bg-gray-50 -bottom-8 w-full p-3 flex flex-col gap-1 group-hover:bottom-32  group-hover:duration-600 duration-500">
      <span className="text-white font-bold text-center text-xl">{menuItem.name}</span>
      <p className="text-white">{menuItem.description}</p>
    </div>
  </Link>
);

const CardGrid = () => (
  <>
    {/* <div className="mt-14 flex justify-center">
      <Text themeDivClasses="text-3xl font-bold" content={"Menu"} />
    </div> */}
    <Div
      darkColor="bg-pepperblack2"
      lightColor="bg-ExtraLightGray"
      themeDivClasses={" py-20  content-center"}
      content={
        <>
          <div className="flex justify-around w-full md:w-[1180px] m-auto">
            {cardList.slice(0, 3).map((menuItem: MenuItem, index: number) => (
              <Card key={index} menuItem={menuItem} />
            ))}
          </div>
        </>
      }
    />
  </>
);

export default CardGrid;
