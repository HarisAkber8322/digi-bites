"use client";
import Div from "@/components/UI/Div";
import Text from "@/components/UI/Text";
import MainStoreContext from "@/store/Mainstore";
import { observer } from "mobx-react";
import { useContext } from "react";

const User: React.FC = () => {
  const MainStore = useContext(MainStoreContext);
  const { userList } = MainStore;
  return (
    <Div
      lightColor="bg-transparent"
      themeDivClasses={""}
      content={
        <div className="">
          <Text themeDivClasses="text-3xl font-bold mb-5" content="Users" />
          <div className="flex flex-col gap-5">
            <Div
              themeDivClasses="p-4 rounded-md shadow-sm gap-4 grid grid-cols-5 mb-5"
              content={
                <>
                  <Text themeDivClasses="" content="First name" />
                  <Text themeDivClasses="" content="Last name" />
                  <Text themeDivClasses="" content="email" />
                  <Text themeDivClasses="" content="role" />
                  <Text themeDivClasses="" content="contact #" />
                </>
              }
            />
          </div>
          <div className="flex flex-col gap-5">
            {userList.map((user, index) => {
              return (
                <Div
                  key={index}
                  themeDivClasses="p-4 rounded-md shadow-sm gap-4 grid grid-cols-5"
                  content={
                    <>
                      <Text themeDivClasses="" content={user?.fname} />
                      <Text themeDivClasses="" content={user?.lname} />
                      <Text themeDivClasses="" content={user?.email} />
                      <Text
                        themeDivClasses=""
                        content={
                          <span className="font-bold">{user?.type}</span>
                        }
                      />
                      <Text themeDivClasses="" content={user?.contact_no} />
                    </>
                  }
                />
              );
            })}
          </div>
        </div>
      }
    />
  );
};

export default observer(User);
