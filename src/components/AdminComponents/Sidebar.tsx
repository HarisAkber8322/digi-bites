import React, { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";
import { sidebarItems, uncategorizedItems } from "@/utills/constants";
import Div from "../UI/Div";
import Text from "../UI/Text";
import classNames from "classnames";

interface SideBarProps {
  toggle: boolean;
}

const SideBarComponent: React.FC<SideBarProps> = (props) => {
  const router = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleDropdownToggle = (title: string) => {
    setOpenDropdown(openDropdown === title ? null : title);
  };

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
            {uncategorizedItems.map((item, index) => (
              <li key={index} className="duration-300">
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

            {sidebarItems.map((category, catIndex) => (
              <React.Fragment key={catIndex}>
                {category.items.length > 0 && (
                  <>
                    <li className="duration-300 ease-in-out h-[30px]">
                      <Text
                        themeDivClasses="ease-in-out duration-300 text-xs text-gray font-semibold py-2 px-4 h-[30px] flex gap-3 items-center"
                        content={
                          <>
                            <div
                              className={classNames([
                                props.toggle ? "text-base" : "text-[0px]",
                                " font-semibold ",
                              ])}
                            >
                              <FontAwesomeIcon icon={faEllipsisH} />
                            </div>
                            <span
                              className={classNames([
                                props.toggle ? "text-[0px]" : "text-xs",
                                "ease-in-out duration-300 px-0",
                              ])}
                            >
                              {category.category}
                            </span>
                          </>
                        }
                      />
                    </li>

                    {category.items.map((item, index) => (
                      <React.Fragment key={index}>
                        {item.subItems ? (
                          <>
                            <li>
                              <button
                                onClick={() => handleDropdownToggle(item.title)}
                                className={classNames([
                                  "ease-in-out duration-300 text-sm font-semibold py-2 px-5 flex gap-3 items-center w-full text-left",
                                  props.toggle ? "pl-4" : "pl-5",
                                  router === item.link ? "bg-themeYellow" : "",
                                  "hover:bg-themeYellow group",
                                ])}
                              >
                                <Text
                                  themeDivClasses="group-hover:text-white "
                                  lightColor={
                                    router === item.link
                                      ? "text-white"
                                      : "text-themeYellow"
                                  }
                                  content={<FontAwesomeIcon icon={item.icon} />}
                                />
                                <Text
                                  themeDivClasses={classNames([
                                    "duration-300 ease-in-out  group-hover:text-white ",
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
                                {!props.toggle && (
                                  <FontAwesomeIcon
                                    icon={
                                      openDropdown === item.title
                                        ? faChevronUp
                                        : faChevronDown
                                    }
                                    className="ml-auto text-xs font-bold text-gray duration-300 ease-in-out group-hover:text-white"
                                  />
                                )}
                              </button>
                            </li>
                            {openDropdown === item.title &&
                              !props.toggle &&
                              item.subItems.map((subItem, subIndex) => (
                                <li key={subIndex} className="pl-8">
                                  <Link
                                    className={classNames([
                                      "ease-in-out duration-300 text-xs font-semibold p-2 flex gap-2 items-center",
                                      props.toggle ? "pl-4" : "pl-5",
                                    ])}
                                    href={subItem.link}
                                  >
                                    <Text
                                      themeDivClasses=" text-xs group-hover:text-white "
                                      lightColor={
                                        router === subItem.link
                                          ? "text-white"
                                          : "text-themeYellow"
                                      }
                                      content={
                                        <FontAwesomeIcon icon={subItem.icon} />
                                      }
                                    />
                                    <Text
                                      themeDivClasses={classNames([
                                        "duration-300 ease-in-out group-hover:text-themeYellow",
                                        props.toggle
                                          ? "text-[0px] opacity-0"
                                          : "text-xs",
                                      ])}
                                      lightColor={
                                        router === subItem.link
                                          ? "text-white"
                                          : "text-themeYellow"
                                      }
                                      content={subItem.title}
                                    />
                                  </Link>
                                </li>
                              ))}
                          </>
                        ) : (
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
                        )}
                      </React.Fragment>
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
