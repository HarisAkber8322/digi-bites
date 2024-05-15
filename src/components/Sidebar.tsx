import React from "react";
import * as style from "../styles/globalStyles";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { observer } from "mobx-react";
import {
  faBars,
  faContactBook,
  faHome,
  faShop,
  faUser,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { usePathname, useRouter } from "next/navigation";
import Div from "./UI/Div";
import classNames from "classnames";
const SideBarComponent = ({ toggle }: { toggle: boolean }) => {
  const router = usePathname();
  return (
    <>
      <div className={classNames(["w-[250px] bg-slate-100 h-[100vh] pt-[70px] ease-in-out duration-300", toggle ? "ml-[-250px]" : "ml-0"])}>
        <ul className="flex gap-4 flex-col">
          <li>
            <Link
              href="/users"
              className={classNames([" px-4 py-2 text-lg gap-4 flex items-center", router === "/users" ? "active" : ""])}            >

              <span>
                <FontAwesomeIcon icon={faUser} />
              </span>
              <span className="list_text"> User </span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};
export default observer(SideBarComponent);
