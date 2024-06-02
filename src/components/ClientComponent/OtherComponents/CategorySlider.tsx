import React from "react";
import Slider from "react-slick";
import { menuData } from "../../../utills/constants"; // Adjust the import path if needed
import Image from "next/image";
import Text from "../../UI/Text";
import Link from "next/link";
import { observer } from "mobx-react";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const Arrow: React.FC<ArrowProps> = ({ className, style, onClick }) => (
  <div
    className={className}
    style={{ ...style, color: 'black', backgroundColor: 'black', borderRadius: '50%', width: '17px', height: '17px', zIndex: 0 }}
    onClick={onClick}
  />
);

const CategorySlider: React.FC = () => {
  const settings = {
    infinite: true,
    speed: 300,
    slidesToShow: 7,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
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
    nextArrow: <Arrow className="slick-next" />,
    prevArrow: <Arrow className="slick-prev" />,
  };
  const defaultImage = "/images/default.jpg";

  return (
    <>
      <div className="mt-7 flex justify-center ">
        <Text themeDivClasses="text-3xl font-bold" content="All Categories" />
      </div>
      <div className="mt-7">
        <Slider {...settings}>
          {menuData.map((category, index) => (
            <div key={index} className="!flex !justify-center">
              <Link href={`/client/category/${category.category}`} className="flex flex-col justify-center items-center gap-2 w-32">
                <div className="rounded-full overflow-hidden w-32 h-32">
                  <Image
                    className="object-cover !w-full !h-full"
                    src={category.image ?? defaultImage}
                    alt={category.category}
                    width={130}
                    height={130}
                  />
                </div>
                <Text
                  themeDivClasses="text-center text-lg mt-2 font-normal"
                  content={category.category}
                />
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default observer(CategorySlider);
