import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Div from "../UI/Div";
import Text from "../UI/Text";
import classNames from "classnames";
import { sidebarItems } from "@/utills/constants";
import { usePathname } from "next/navigation";
interface SideBarProps {
  toggle: boolean;
  // Add other props if needed
}
const SideBarComponent: React.FC<SideBarProps> = (props) => {
  const router = usePathname();
  return (
    <Div
      themeDivClasses={classNames([
        "ease-in-out duration-300 h-screen pt-24 fixed",
        props.toggle ? "!w-[50px]" : "w-[220px]",
      ])}
      darkColor="bg-black !shadow-yellow"
      content={
        <>
          <ul className="w-full flex flex-col gap-2">
            {sidebarItems.map((item, index) => (
              <li key={index} className="duration-500">
                <Link
                  className={classNames([
                    "ease-in-out duration-300 text-base font-semibold py-2 px-5 flex gap-3 items-center  ",
                    props.toggle ? "pl-4" : "pl-5",
                    router === item.link ? "bg-themeYellow" : "",
                    "hover:bg-themeYellow group",
                  ])}
                  href={item.link}
                >
                  <Text
                    themeDivClasses="group-hover:text-white"
                    lightColor={
                      router === item.link ? "text-white" : "text-themeYellow"
                    }
                    content={
                      <>
                        <FontAwesomeIcon
                          // className="text-themeYellow"
                          icon={item.icon}
                        />
                      </>
                    }
                  />
                  <Text
                    themeDivClasses={classNames([
                      "duration-300 ease-in-out group-hover:text-white",
                      ,
                      props.toggle ? "text-[0px]" : "text-base",
                    ])}
                    lightColor={
                      router === item.link ? "text-white" : "text-themeYellow"
                    }
                    content={<>{item.title}</>}
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
