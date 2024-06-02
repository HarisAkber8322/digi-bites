// // import React, { useState } from "react";
// // import Link from "next/link";
// // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // import { faHome, faBars } from "@fortawesome/free-solid-svg-icons";
// // import { Image } from "react-bootstrap";
// // import Div from "../UI/Div";
// // import Text from "../UI/Text";
// // import classNames from "classnames";
// // import { link } from "fs";

// // interface SideBarProps {
// //   toggle: boolean;
// //   // Add other props if needed
// // }

// // const SideBarComponent: React.FC<SideBarProps> = (props) => {


// //   return (
// //     <Div
// //       themeDivClasses={classNames([
// //         "ease-in-out duration-300 h-screen  border-r border-lightGray pt-32 fixed",
// //         props.toggle ? "w-[80px]" : "!w-[250px]",
// //       ])}
// //       content={
// //         <>
// //           <ul className="w-full">
// //             <li className=" duration-500">
// //               <Link
// //                 className={classNames([
// //                   "ease-in-out duration-300 h-screen text-base font-semibold py-5 px-8  items-center ",
// //                   props.toggle ? "pl-7" : "pl-12",
// //                 ])}
// //                 href="/admin/dashboard"
// //               >
// //                 <Text
// //                   themeDivClasses=""
// //                   content={
// //                     <>
// //                       <FontAwesomeIcon icon={faHome} />{" "}
// //                     </>
// //                   }
// //                 />
// //                 <Text
// //                   themeDivClasses={classNames([
// //                     " duration-300 ease-in-out",
// //                     ,
// //                     props.toggle ? "text-[0px]" : "text-base",
// //                   ])}
// //                   content={<>Dashboard</>}
// //                 />
// //               </Link>
// //             </li>
// //           </ul>
// //         </>
// //       }
// //     />
// //   );
// // };

// // export default SideBarComponent;

// import React, { useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHome } from "@fortawesome/free-solid-svg-icons";
// import classNames from "classnames";
// import Div from "../UI/Div";
// import Text from "../UI/Text";

// interface SideBarProps {
//   toggle: boolean;
//   // Add other props if needed
// }

// const SideBarComponent: React.FC<SideBarProps> = (props) => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const router = useRouter();

//   const links = [
//     { href: "/admin/dashboard", label: "Dashboard", icon: faHome },
//     // Add more links here
//   ];

//   const filteredLinks = links.filter((link) =>
//     link.label.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <Div
//       themeDivClasses={classNames([
//         "ease-in-out duration-300 h-screen border-r border-lightGray pt-32 fixed",
//         props.toggle ? "w-[80px]" : "!w-[250px]",
//       ])}
//       content={
//         <>
//           <div className="px-4 py-2">
//             <input
//               type="text"
//               placeholder="Search..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full py-2 px-4 rounded-md border border-gray-300"
//             />
//           </div>
//           <ul className="w-full">
//             {filteredLinks.map((link) => (
//               <li key={link.href} className="duration-500">
//                 <Link
//                   href={link.href}
//                   className={classNames([
//                     "ease-in-out duration-300 text-base font-semibold py-5 px-8 items-center flex",
//                     props.toggle ? "pl-7" : "pl-12",
//                     router.pathname === link.href ? "bg-gray-200" : "",
//                   ])}
//                 >
//                   <Text
//                     themeDivClasses=""
//                     content={
//                       <>
//                         <FontAwesomeIcon icon={link.icon} />{" "}
//                       </>
//                     }
//                   />
//                   <Text
//                     themeDivClasses={classNames([
//                       "duration-300 ease-in-out",
//                       props.toggle ? "text-[0px]" : "text-base",
//                     ])}
//                     content={link.label}
//                   />
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </>
//       }
//     />
//   );
// };

// export default SideBarComponent;
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import Div from "../UI/Div";
import Text from "../UI/Text";

interface SideBarProps {
  toggle: boolean;
  // Add other props if needed
}

const SideBarComponent: React.FC<SideBarProps> = (props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const links = [
    { href: "/admin/dashboard", label: "Dashboard", icon: faHome },
    // Add more links here
  ];

  const filteredLinks = links.filter((link) =>
    link.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Div
      themeDivClasses={classNames([
        "ease-in-out duration-300 h-screen border-r border-lightGray pt-32 fixed",
        props.toggle ? "w-[80px]" : "!w-[250px]",
      ])}
      content={
        <>
          <div className="px-4 py-2">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2 px-4 rounded-md border border-gray-300"
            />
          </div>
          <ul className="w-full">
            {filteredLinks.map((link) => (
              <li key={link.href} className="duration-500">
                <Link
                  href={link.href}
                  className={classNames([
                    "ease-in-out duration-300 text-base font-semibold py-5 px-8 items-center flex",
                    props.toggle ? "pl-7" : "pl-12",
                    isMounted && router.pathname === link.href ? "bg-gray-200" : "",
                  ])}
                >
                  <Text
                    themeDivClasses=""
                    content={
                      <>
                        <FontAwesomeIcon icon={link.icon} />{" "}
                      </>
                    }
                  />
                  <Text
                    themeDivClasses={classNames([
                      "duration-300 ease-in-out",
                      props.toggle ? "text-[0px]" : "text-base",
                    ])}
                    content={link.label}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </>
      }
    />
  );
};

export default SideBarComponent;
