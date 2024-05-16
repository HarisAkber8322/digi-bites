import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ThemeStore from "@/store/ThemeStore";
import { observer } from "mobx-react";
import Div from "../../UI/Div";
import Text from "../../UI/Text";
import Image from "next/image";
import burger from "../../../../public/images/burger.jpeg"
import CommonButton from "../OtherComponents/CommonButton";

const SetMenu = () => {
  return (
    <>
      <Div themeDivClasses={"bg-pepperBlack"} 
      content={
      <>
      <div className="grid grid-cols-4 mt-12 ml-20 mr-20 ">
        <div className=" overflow-hidden rounded-xl h-80 shadow-xl">
         <div className="">
            <Image className="h-52 items-center" src={burger} alt="" />
            </div>
         <div className="flex flex-col items-center justify-center">
             <Text themeDivClasses="text-lg mt-2 font-semibold " content={"Zinger Burger"} />
             <div className="flex w-full mt-7 justify-center">
            <CommonButton/></div>
         </div>
        </div>
        </div>
      </>
    } />
    </>
  );
};

export default observer(SetMenu);
