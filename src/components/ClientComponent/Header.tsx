// import React, { useContext, useState } from "react";
// import Link from "next/link";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faBars,
//   faUser,
//   faXmark,
//   faSearch,
//   faCartPlus,
//   faCartFlatbed,
//   faCartShopping,
// } from "@fortawesome/free-solid-svg-icons";
// import ToggleThemeComponent from "../ToggleThemeButton";
// import { Image } from "react-bootstrap";
// import { usePathname } from "next/navigation";
// import { observer } from "mobx-react";
// import Div from "../UI/Div";
// import Text from "../UI/Text";
// import SearchInput from "./OtherComponents/SearchInput";
// import { MenuList } from "@/utills/constants";

// const HeaderComponent = () => {
//   const router = usePathname();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const handleSearch = (searchTerm: string) => {
//     console.log("Search term:", searchTerm);
//   };

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   const toggleDropdown = (isOpen: boolean) => {
//     setIsDropdownOpen(isOpen);
//   };
//   return (
//     <>
//       <Div
//         themeDivClasses="md:fixed md:top-0 md:flex md:items-center md:w-full md:drop-shadow-md md:z-[999999] "
//         content={
//           <>
//             <div className="md:w-[1180px] md:m-auto md:h-[64px] md:flex md:justify-between md:flex-row md:items-center">
//               <div className="md:flex md:gap-4 md:flex-row md:items-center ">
//                 <div className="xs:flex xs:items-center xs:justify-center xs:pt-5">
//                   <Link href="/">
//                     <Image
//                       className="h-12 items-center  "
//                       src="/images/digibites.png"
//                       alt="logo"
//                     />
//                   </Link>
//                 </div>
//                 <div className="md:hidden">
//                   <Text
//                     themeDivClasses="text-xl cursor-pointer"
//                     content={
//                       <FontAwesomeIcon icon={faBars} onClick={toggleMenu} />
//                     }
//                   />
//                 </div>
//                 <div
//                   className={`navbar_menu xs:hidden duration-75 md:left-0 md:block`}
//                 >
//                   <ul className="md:flex md:gap-10 md:text-lg md:font-semibold md:items-center ">
//                     <li
//                       className="md:transition-all md:duration-500 md:ease-in-out"
//                       onClick={() => toggleDropdown(!isDropdownOpen)}
//                     >
//                       <Text
//                         themeDivClasses="md:text-md md:font-semibold cursor-pointer"
//                         content="category"
//                       />
//                       {isDropdownOpen && (
//                         <Div
//                           themeDivClasses="absolute top-full left-0 mt-2 w-48  shadow-lg rounded-md z-10"
//                           content={
//                             <ul className="py-2">
//                               {MenuList.map((menuItem, index) => (
//                                 <li
//                                   key={index}
//                                   className="px-4 py-2 hover:bg-gray-200"
//                                 >
//                                   {/* <Link href={menuItem.link}> */}
//                                   <Text
//                                     themeDivClasses="md:text-md md:font-semibold"
//                                     content={menuItem.name}
//                                   />
//                                   {/* </Link> */}
//                                 </li>
//                               ))}
//                             </ul>
//                           }
//                         />
//                       )}
//                     </li>
//                     <li className="md:transition-all md:duration-500 md:ease-in-out">
//                       <Link
//                         href="/shop"
//                         className={router === "/shop" ? "active" : ""}
//                       >
//                         <Text
//                           themeDivClasses="md:text-md md:font-semibold"
//                           content={"shop"}
//                         />
//                       </Link>
//                     </li>
//                     <li className="md:transition-all md:duration-500 md:ease-in-out">
//                       <Link
//                         href="/contact"
//                         className={router === "/contact" ? "active" : ""}
//                       >
//                         <Text
//                           themeDivClasses="md:text-md md:font-semibold"
//                           content={"contact"}
//                         />
//                       </Link>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//               <div className="md:flex md:items-center md:gap-5">
//                 <div className="md:flex md:items-center">
//                   <SearchInput onSearch={handleSearch} />{" "}
//                   {/* Added SearchInput */}
//                 </div>
//                 <div className="md:text-lg md:flex md:items-center md:gap-5">
//                   <Link
//                     href={"/client/profile/profile"}
//                     className="cursor-pointer"
//                   >
//                     <Text
//                       content={<FontAwesomeIcon icon={faUser} />}
//                       themeDivClasses=""
//                     />
//                   </Link>
//                   <Link
//                     href={"/client/cart"}
//                     className="cursor-pointer"
//                   >
//                     <Text
//                       content={<FontAwesomeIcon icon={faCartShopping} />}
//                       themeDivClasses=""
//                     />
//                   </Link>
//                   <ToggleThemeComponent />
//                 </div>
//               </div>
//             </div>
//             <Div
//               themeDivClasses={`fixed top-0 left-0 h-full w-[86%]  transform ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out z-[999998]`}
//               content={
//                 <>
//                   <div className="p-4 flex justify-between items-center">
//                     <Image
//                       className="h-12"
//                       src="/images/digibites.png"
//                       alt="logo"
//                     />
//                     <Text
//                       themeDivClasses="text-xl cursor-pointer"
//                       content={
//                         <FontAwesomeIcon icon={faXmark} onClick={toggleMenu} />
//                       }
//                     />
//                   </div>
//                   <ul className="flex flex-col gap-4 text-lg font-semibold p-4">
//                     <li>
//                       <Link href="/home" onClick={toggleMenu}>
//                         <Text
//                           themeDivClasses="text-md font-semibold"
//                           content={"Home"}
//                         />
//                       </Link>
//                     </li>
//                     <li>
//                       <Link href="/users" onClick={toggleMenu}>
//                         <Text
//                           themeDivClasses="text-md font-semibold"
//                           content={"users"}
//                         />
//                       </Link>
//                     </li>
//                     <li>
//                       <Link href="/shop" onClick={toggleMenu}>
//                         <Text
//                           themeDivClasses="text-md font-semibold"
//                           content={"shop"}
//                         />
//                       </Link>
//                     </li>
//                     <li>
//                       <Link href="/contact" onClick={toggleMenu}>
//                         <Text
//                           themeDivClasses="text-md font-semibold"
//                           content={"contact"}
//                         />
//                       </Link>
//                     </li>
//                   </ul>
//                 </>
//               }
//             />
//           </>
//         }
//       />
//     </>
//   );
// };

// export default observer(HeaderComponent);



// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBars, faUser, faCartShopping } from "@fortawesome/free-solid-svg-icons";
// import ToggleThemeComponent from "../ToggleThemeButton";
// import { Image } from "react-bootstrap";
// import { usePathname } from "next/navigation";
// import { observer } from "mobx-react";
// import Div from "../UI/Div";
// import Text from "../UI/Text";
// import SearchInput from "./OtherComponents/SearchInput";
// const HeaderComponent = () => {
//   const router = usePathname();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [MainStore.cartCount, setCartCount] = useState(0);

//   useEffect(() => {
//     const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
//     setCartCount(cartItems.reduce((acc: number, item: any) => acc + item.quantity, 0));
//   }, []);

//   const handleSearch = (searchTerm: string) => {
//     console.log("Search term:", searchTerm);
//   };

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };
//   return (
//     <>
//       <Div
//         themeDivClasses="md:fixed md:top-0 md:flex md:items-center md:w-full md:drop-shadow-md md:z-[999999]"
//         content={
//           <>
//             <div className="md:w-[1180px] md:m-auto md:h-[64px] md:flex md:justify-between md:flex-row md:items-center">
//               <div className="md:flex md:gap-4 md:flex-row md:items-center">
//                 <div className="xs:flex xs:items-center xs:justify-center xs:pt-5">
//                   <Link href="/">
//                     <Image
//                       className="h-12 items-center"
//                       src="/images/digibites.png"
//                       alt="logo"
//                     />
//                   </Link>
//                 </div>
//                 <div className="md:hidden">
//                   <Text
//                     themeDivClasses="text-xl cursor-pointer"
//                     content={<FontAwesomeIcon icon={faBars} onClick={toggleMenu} />}
//                   />
//                 </div>
//                 <div className={`navbar_menu xs:hidden duration-75 md:left-0 md:block`}>
//                   <ul className="md:flex md:gap-10 md:text-lg md:font-semibold md:items-center">
//                     <li className="md:transition-all md:duration-500 md:ease-in-out">
//                       <Link href="/shop" className={router === "/shop" ? "active" : ""}>
//                         <Text themeDivClasses="md:text-md md:font-semibold" content={"shop"} />
//                       </Link>
//                     </li>
//                     <li className="md:transition-all md:duration-500 md:ease-in-out">
//                       <Link href="/contact" className={router === "/contact" ? "active" : ""}>
//                         <Text themeDivClasses="md:text-md md:font-semibold" content={"contact"} />
//                       </Link>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//               <div className="md:flex md:items-center md:gap-5">
//                 <div className="md:flex md:items-center">
//                   <SearchInput onSearch={handleSearch} />
//                 </div>
//                 <div className="md:text-lg md:flex md:items-center md:gap-5">
//                   <Link href="/client/profile/profile" className="cursor-pointer">
//                     <Text content={<FontAwesomeIcon icon={faUser} />} themeDivClasses="" />
//                   </Link>
//                   <Link href="/client/cart" className="cursor-pointer">
//                     <Text
//                       content={
//                         <>
//                           <FontAwesomeIcon icon={faCartShopping} />
//                           {MainStore.cartCount > 0 && (
//                             <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 ml-1 relative bottom-4">
//                               {MainStore.cartCount}
//                             </span>
//                           )}
//                         </>
//                       }
//                       themeDivClasses=""
//                     />
//                   </Link>
//                   <ToggleThemeComponent />
//                 </div>
//               </div>
//             </div>
//           </>
//         }
//       />
//     </>
//   );
// };

// export default observer(HeaderComponent);

// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBars, faUser, faCartShopping } from "@fortawesome/free-solid-svg-icons";
// import ToggleThemeComponent from "../ToggleThemeButton";
// import { Image } from "react-bootstrap";
// import { usePathname } from "next/navigation";
// import Div from "../UI/Div";
// import Text from "../UI/Text";
// import { observer } from "mobx-react";

// const HeaderComponent = () => {
//   const router = usePathname();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [MainStore.cartCount, setCartCount] = useState(0);

//   useEffect(() => {
//     const updateCartCount = () => {
//       const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
//       const totalCount = cartItems.reduce((acc: number, item: any) => acc + item.quantity, 0);
//       setCartCount(totalCount);
//     };

//     // Listen for changes in localStorage
//     window.addEventListener('storage', updateCartCount);

//     // Initial count update
//     updateCartCount();

//     // Cleanup function
//     return () => {
//       window.removeEventListener('storage', updateCartCount);
//     };
//   }, []);

//   const handleSearch = (searchTerm: string) => {
//     console.log("Search term:", searchTerm);
//   };

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   return (
//     <>
//       <Div
//         themeDivClasses="md:fixed md:top-0 md:flex md:items-center md:w-full md:drop-shadow-md md:z-[999999]"
//         content={
//           <>
//             <div className="md:w-[1180px] md:m-auto md:h-[64px] md:flex md:justify-between md:flex-row md:items-center">
//               <div className="md:flex md:gap-4 md:flex-row md:items-center">
//                 <div className="xs:flex xs:items-center xs:justify-center xs:pt-5">
//                   <Link href="/">
//                     <Image
//                       className="h-12 items-center"
//                       src="/images/digibites.png"
//                       alt="logo"
//                     />
//                   </Link>
//                 </div>
//                 <div className="md:hidden">
//                   <Text
//                     themeDivClasses="text-xl cursor-pointer"
//                     content={<FontAwesomeIcon icon={faBars} onClick={toggleMenu} />}
//                   />
//                 </div>
//                 <div className={`navbar_menu xs:hidden duration-75 md:left-0 md:block`}>
//                   <ul className="md:flex md:gap-10 md:text-lg md:font-semibold md:items-center">
//                     <li className="md:transition-all md:duration-500 md:ease-in-out">
//                       <Link href="/shop" className={router === "/shop" ? "active" : ""}>
//                         <Text themeDivClasses="md:text-md md:font-semibold" content={"shop"} />
//                       </Link>
//                     </li>
//                     <li className="md:transition-all md:duration-500 md:ease-in-out">
//                       <Link href="/contact" className={router === "/contact" ? "active" : ""}>
//                         <Text themeDivClasses="md:text-md md:font-semibold" content={"contact"} />
//                       </Link>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//               <div className="md:flex md:items-center md:gap-5">
//                 <div className="md:flex md:items-center">
//                   {/* <SearchInput onSearch={handleSearch} /> */}
//                 </div>
//                 <div className="md:text-lg md:flex md:items-center md:gap-5">
//                   <Link href="/client/profile/profile" className="cursor-pointer">
//                     <Text content={<FontAwesomeIcon icon={faUser} />} themeDivClasses="" />
//                   </Link>
//                   <Link href="/client/cart" className="cursor-pointer">
//                     <Text
//                       content={
//                         <>
//                           <FontAwesomeIcon icon={faCartShopping} />
//                           {MainStore.cartCount > 0 && (
//                             <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 ml-1 relative bottom-4">
//                               {MainStore.cartCount}
//                             </span>
//                           )}
//                         </>
//                       }
//                       themeDivClasses=""
//                     />
//                   </Link>
//                   <ToggleThemeComponent />
//                 </div>
//               </div>
//             </div>
//           </>
//         }
//       />
//     </>
//   );
// };

// export default observer(HeaderComponent);


import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import ToggleThemeComponent from "../ToggleThemeButton";
import { Image } from "react-bootstrap";
import { usePathname } from "next/navigation";
import Div from "../UI/Div";
import Text from "../UI/Text";
import { observer } from "mobx-react";
import MainStoreContext from "@/store/Mainstore";

const HeaderComponent = () => {
  const router = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const MainStore = useContext(MainStoreContext);
  useEffect(() => {
    const updateCartCount = () => {
      const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
      const totalCount = cartItems.reduce((acc: number, item: any) => acc + item.quantity, 0);
      MainStore.setCartCount(totalCount);
    };

    // Listen for changes in localStorage
    window.addEventListener('storage', updateCartCount);

    // Initial count update
    updateCartCount();

    // Cleanup function
    return () => {
      window.removeEventListener('storage', updateCartCount);
    };
  }, []);

  const handleSearch = (searchTerm: string) => {
    console.log("Search term:", searchTerm);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <Div
        themeDivClasses="md:fixed md:top-0 md:flex md:items-center md:w-full md:drop-shadow-md md:z-[999999]"
        content={
          <>
            <div className="md:w-[1180px] md:m-auto md:h-[64px] md:flex md:justify-between md:flex-row md:items-center">
              <div className="md:flex md:gap-4 md:flex-row md:items-center">
                <div className="xs:flex xs:items-center xs:justify-center xs:pt-5">
                  <Link href="/">
                    <Image
                      className="h-12 items-center"
                      src="/images/digibites.png"
                      alt="logo"
                    />
                  </Link>
                </div>
                <div className="md:hidden">
                  <Text
                    themeDivClasses="text-xl cursor-pointer"
                    content={<FontAwesomeIcon icon={faBars} onClick={toggleMenu} />}
                  />
                </div>
                <div className={`navbar_menu xs:hidden duration-75 md:left-0 md:block`}>
                  <ul className="md:flex md:gap-10 md:text-lg md:font-semibold md:items-center">
                    <li className="md:transition-all md:duration-500 md:ease-in-out">
                      <Link
                        href="/client/favorite"
                        className={router === "/client/favorite" ? "active" : ""}
                      >
                        <Text
                          themeDivClasses="md:text-md md:font-semibold"
                          content={"Favorites"}
                        />
                      </Link>
                    </li>
                    <li className="md:transition-all md:duration-500 md:ease-in-out">
                      <Link href="/contact" className={router === "/contact" ? "active" : ""}>
                        <Text themeDivClasses="md:text-md md:font-semibold" content={"contact"} />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="md:flex md:items-center md:gap-5">
                <div className="md:flex md:items-center">
                  {/* <SearchInput onSearch={handleSearch} /> */}
                </div>
                <div className="md:text-lg md:flex md:items-center md:gap-5">
                  <Link
                    href={"/client/profile"}
                    className="cursor-pointer"
                  >
                    <Text
                      content={<FontAwesomeIcon icon={faUser} />}
                      themeDivClasses=""
                    />
                  </Link>
                  <Link href="/client/cart" className="cursor-pointer">
                    <Text
                      content={
                        <>
                          <FontAwesomeIcon icon={faCartShopping} />
                          {MainStore.cartCount > 0 && (
                            <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 ml-1 relative bottom-4">
                              {MainStore.cartCount}
                            </span>
                          )}
                        </>
                      }
                      themeDivClasses=""
                    />
                  </Link>
                  <ToggleThemeComponent />
                </div>
              </div >
            </div >
          </>
        }
      />
    </>
  );
};

export default observer(HeaderComponent);
