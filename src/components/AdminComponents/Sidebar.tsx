import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faFolderTree,
  faEllipsisH, // Import the ellipsis icon
} from "@fortawesome/free-solid-svg-icons"; // Import icons
import { sidebarItems, uncategorizedItems } from "@/utills/constants";
import Div from "../UI/Div";
import Text from "../UI/Text";
import classNames from "classnames";
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
            {/* Render uncategorized items without a label */}
            {uncategorizedItems.map((item, index) => (
              <li key={index} className="duration-500">
                <Link
                  className={classNames([
                    "ease-in-out duration-300 text-base font-semibold py-2 px-5 flex gap-3 items-center",
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
                    content={<FontAwesomeIcon icon={item.icon} />}
                  />
                  <Text
                    themeDivClasses={classNames([
                      "duration-300 ease-in-out group-hover:text-white",
                      props.toggle ? "text-[0px] opacity-0" : "text-base",
                    ])}
                    lightColor={
                      router === item.link ? "text-white" : "text-themeYellow"
                    }
                    content={item.title}
                  />
                </Link>
              </li>
            ))}

            {/* Render categorized items */}
            {sidebarItems.map((category, catIndex) => (
              <React.Fragment key={catIndex}>
                {category.items.length > 0 && (
                  <>
                    <li className={classNames([])}>
                      <Text
                        themeDivClasses=
                          "pl-[6px]  px-2 duration-300 ease-in-out"
                        
                        content={props.toggle ? (
                          category.category
                        ) : (
                          <FontAwesomeIcon icon={faEllipsisH} />
                        )}
                      />
                    </li>
                    {category.items.map((item, index) => (
                      <li key={index}>
                        <Link
                          className={classNames([
                            "ease-in-out duration-300 text-base font-semibold py-2 px-5 flex gap-3 items-center",
                            props.toggle ? "pl-4" : "pl-5",
                            router === item.link ? "bg-themeYellow" : "",
                            "hover:bg-themeYellow group",
                          ])}
                          href={item.link}
                        >
                          <Text
                            themeDivClasses="group-hover:text-white"
                            lightColor={
                              router === item.link
                                ? "text-white"
                                : "text-themeYellow"
                            }
                            content={<FontAwesomeIcon icon={item.icon} />}
                          />
                          <Text
                            themeDivClasses={classNames([
                              "duration-300 ease-in-out group-hover:text-white",
                              props.toggle
                                ? "text-[0px] opacity-0"
                                : "text-base",
                            ])}
                            lightColor={
                              router === item.link
                                ? "text-white"
                                : "text-themeYellow"
                            }
                            content={item.title}
                          />
                        </Link>
                      </li>
                    ))}
                  </>
                )}
              </React.Fragment>
            ))}
          </ul>
        </>
      }
    />
  );
};

export default SideBarComponent;
