    // import React from "react";
    // import { MenuList } from "../../../utills/constants";
    // import Image from "next/image";
    // import Text from "../../UI/Text";
    // const CategorySlider = () => {
    //   return (
    //     <>
    //       <div className="mt-10 flex justify-center">
    //         <Text
    //           themeDivClasses=" text-3xl font-bold  "
    //           content={"All Category"}
    //         />
    //       </div>

    //       <div className="flex mt-7 ml-20 mr-20 gap-6">
    //         {MenuList.map((menuItem, index) => (
    //           <div key={index}>
    //             <div className="">
    //               <Image
    //                 className="rounded-full"
    //                 src={menuItem.image}
    //                 alt={menuItem.name}
    //                 width={130}
    //                 height={130}
    //               ></Image>
    //               <div className="flex justify-center">
    //               <Text
    //                 themeDivClasses=" text-center mt-2 font-medium "
    //                 content={menuItem.name}
    //               />
    //               </div>
                
    //             </div>
    //           </div>
    //         ))}
    //       </div>
    //     </>
    //   );
    // };

    // export default CategorySlider;

import React from "react";
import Slider from "react-slick";
import { MenuList } from "../../../utills/constants";
import Image from "next/image";
import Text from "../../UI/Text";
import Link from "next/link";

const CategorySlider = () => {
  const settings = {
    infinite: true,
    speed: 300,
    slidesToShow: 7, // Show 6 slides at a time
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="mt-10 flex justify-center">
        <Text themeDivClasses="text-3xl font-bold" content="All Categories" />
      </div>

      <div className="mt-7 mx-20  ">
        <Slider {...settings}>
          {MenuList.map((menuItem, index) => (
            <div key={index} className="">
              <Link  href={menuItem.link} className="flex  flex-col justify-center items-center gap-2 w-32 ml-5 ">
                <div className="rounded-full overflow-hidden w-32 h-32">
                  <Image
                    className="object-cover"
                    src={menuItem.image}
                    alt={menuItem.name}
                    width={130}
                    height={130}
                  />
                </div>
                <Text
                  themeDivClasses="text-center mt-2 font-medium"
                  content={menuItem.name}
                />
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};
export default CategorySlider;

