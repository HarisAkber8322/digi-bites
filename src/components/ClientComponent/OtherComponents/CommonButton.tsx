import React from "react";
import { observer } from "mobx-react";
import Link from "next/link";
const CommonButton = () => {
  return (
    <>
      <button className="flex w-[50%] rounded-[30px] overflow-hidden ">
        <Link
          className="flex justify-center p-1 bg-themeYellow w-full text-lg  text-white"
          href={"#"}
        >
          Add To Cart
        </Link>
      </button>
    </>
  );
};

export default observer(CommonButton);
