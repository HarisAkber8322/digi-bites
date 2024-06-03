import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ThemeStore from "@/store/ThemeStore";
import { observer } from "mobx-react";
import Link from "next/link";
// import Div from "../../UI/Div";
// import Text from "../../UI/Text";

const CommonButton = () => {
  return (
    <>
      <button className="flex w-[50%] rounded-[30px] overflow-hidden ">
        <Link
          className="flex justify-center p-1 bg-dullyellow w-full text-lg  text-white"
          href={"#"}
        >
          Add To Cart
        </Link>
      </button>

      {/* <Div themeDivClasses={""} 
      content={
      <>
      <button className=""></button>
      </>
    } /> */}
    </>
  );
};

export default observer(CommonButton);
