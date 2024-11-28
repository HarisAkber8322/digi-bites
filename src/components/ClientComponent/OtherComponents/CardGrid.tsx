// import React from "react";
// import Link from "next/link";
// import Div from "../../UI/Div";
// import { cardList } from "@/utills/constants";

// interface MenuItem {
//   name: string;
//   image: string;
//   price: number;
//   description: string;
//   link: string;
// }

// const Card = ({ menuItem }: { menuItem: MenuItem }) => (
//   <Link
//     href={menuItem.link}
//     passHref
//     className="group duration-150 cursor-pointer overflow-hidden relative text-white h-[350px] w-[350px] xs:w-60 xs:h-60 rounded-2xl transform transition-transform hover:scale-105 hover:shadow-2xl  "
//   >
//     <div
//       className="md:w-[350px] md:h-[350px] xs:w-60 xs:h-60 bg-cover bg-center "
//       style={{ backgroundImage: `url(${menuItem.image})` }}
//     ></div>
//   </Link>
// );

// const CardGrid = () => (
//   <>
//     <Div
//       darkColor="bg-pepperBlack"
//       lightColor="bg-ExtraLightGray"
//       themeDivClasses={""}
//       content={
//         <>
//           <div className="py-20 flex justify-between w-full md:w-[1180px] m-auto xs:w-[100%] xs:flex-col xs:gap-4 xs:justify-center xs:items-center">
//             {cardList.slice(0, 3).map((menuItem: MenuItem, index: number) => (
//               <Card key={index} menuItem={menuItem} />
//             ))}
//           </div>
//         </>
//       }
//     />
//   </>
// );

// export default CardGrid;
