"use client";
import Div from "@/components/UI/Div";
import Text from "@/components/UI/Text";
import MainStoreContext from "@/store/Mainstore";
import { observer } from "mobx-react";
import { useContext } from "react";
import Link from "next/link";

const TopCustomers: React.FC = () => {
  const MainStore = useContext(MainStoreContext);
  const { userList } = MainStore;

  return (
    <Div
      themeDivClasses="relative rounded-xl shadow-md"
      darkColor="bg-pepperBlack"
      lightColor="bg-white"
      content={
        <>
          <Text
            themeDivClasses="text-base font-medium"
            lightColor="text-black"
            darkColor="text-white"
            content={
              <>
                <div className="w-full flex flex-row justify-between items-center p-2 border-b-[1px] !border-zinc-100">
                  <div>Top Customers</div>
                  <Link
                    href="/admin/users"
                    className="text-blue-500 hover:text-themeYellow text-xs font-semibold"
                  >
                    {"View All"}
                  </Link>
                </div>

                <div className="flex flex-col space-y-[10px] p-4">
                  {userList.length > 0 ? (
                    userList.map((user, index) => (
                      <Div
                        key={index}
                        themeDivClasses="rounded-lg"
                        lightColor="bg-ExtraLightGray"
                        darkColor="bg-black"
                        content={
                          <div className="flex flex-row items-center w-full rounded-lg shadow h-[50px]">
                            <div className="flex items-center px-4 w-full justify-between">
                              <h3 className="text-xs font-medium">
                                {user.fname} {user.lname}
                              </h3>
                              <span className="text-xs font-light ml-2">
                                {user.email}
                              </span>
                            </div>
                          </div>
                        }
                      />
                    ))
                  ) : (
                    <div>No top customers available.</div>
                  )}
                </div>
              </>
            }
          />
        </>
      }
    />
  );
};

export default observer(TopCustomers);
