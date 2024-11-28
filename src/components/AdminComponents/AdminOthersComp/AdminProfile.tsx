import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faGear } from "@fortawesome/free-solid-svg-icons";
import { Image } from "react-bootstrap";
import classNames from "classnames";
import Div from "../../UI/Div";
import Text from "../../UI/Text";
import Link from "next/link";
import AdminStoreContext from "@/store/AdminStore";

const AdminProfile: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const AdminStore = useContext(AdminStoreContext);

  return (
    <div className="relative inline-block text-left">
      <div
        onClick={toggleDropdown}
        className="cursor-pointer flex items-center gap-2"
      >
        <div className="flex flex-col">
          <Text themeDivClasses="text-xs font-semibold" content="Admin" />
          <Text themeDivClasses="text-xs" content="Master Admin" />
        </div>
        <Image
          className="h-10 w-10 rounded-full"
          src="/images/admin.png" // Replace with actual profile photo path
          alt="Admin Profile Photo"
        />
      </div>

      {dropdownOpen && (
        <div
          className={classNames(
            "absolute right-0 mt-5 transition duration-300 ease-in-out w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5",
            {
              "transform opacity-0 scale-95": !dropdownOpen,
              "transform opacity-100 scale-100": dropdownOpen,
            },
            "transition ease-out duration-100"
          )}
        >
          <div className="py-1">
            <div className="px-4 py-5 text-sm text-gray-700 flex gap-3 items-start   border-b  border-ExtraLightGray">
              <Image
                className="h-8 w-8 rounded-full"
                src="./images/admin.png" // Replace with actual profile photo path
                alt="Admin Profile Photo"
              />
              <div className="flex flex-col gap-2">
                {" "}
                <span>admin</span>
                <span className="font-normal text-slate-400">
                  a*******@admin.com
                </span>
              </div>
            </div>
            <Link
              href={"/admin/settings"}
              className="px-4 py-3 text-sm text-gray-700 flex items-center  border-b  border-ExtraLightGray"
            >
              <FontAwesomeIcon icon={faGear} className="mr-2" />
              <span>Settings</span> {/* Replace with actual email */}
            </Link>

            <div
              onClick={() => AdminStore.logout()}
              className="px-4 py-3 text-sm text-gray-700 flex items-center cursor-pointer hover:bg-gray-100 "
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
              <span>Logout</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProfile;
