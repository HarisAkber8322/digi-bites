import React, { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";
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

            {sidebarItems.map((item, index) => (
              <React.Fragment key={index}>
                {item.items.length > 0 && (
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
                              {item.category}
                            </span>
                          </>
                        }
                      />
                    </li>

                    {item.items.map((item, index) => (
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
