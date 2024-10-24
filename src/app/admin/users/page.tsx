"use client";
import Div from "@/components/UI/Div";
import Text from "@/components/UI/Text";
import MainStoreContext from "@/store/Mainstore";
import { observer } from "mobx-react";
import { useContext } from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import DataGridComponent from "@/components/UI/DataGridComponent";
const formatHeader = (key: string) => {
  return key
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
const User: React.FC = () => {
  const MainStore = useContext(MainStoreContext);
  const { userList } = MainStore;

  const columns: GridColDef[] = Object.keys(userList[0]).map((key) => {
    return {
      field: key,
      headerName: formatHeader(key),
      width: 150,
    };
  });

  // Convert userList into rows for the DataGrid
  const rows: GridRowsProp = userList.map((user, index) => {
    return {
      id: index, // Use sequential index as the ID
      ...user,
      // Flatten social links for display
      social_links: user.social_links
        ?.map((link) => `${link.name}: ${link.link}`)
        .join(", "),
    };
  });
  return (
    <>
      {/* <div>
        <Text themeDivClasses="text-3xl font-bold block mb-5" content="Users" />
        <Div
          themeDivClasses={"flex flex-col !bg-transparent"}
          content={
            <>
              <DataGridComponent rows={rows} columns={columns} pageSize={5} pagination={true} />
            </>
          }
        />
      </div> */}
      <div>
        <Text
          themeDivClasses="text-3xl font-bold block mb-5"
          content="Orders"
        />
        <Div
          themeDivClasses={"flex flex-col !bg-transparent"}
          content={
            <>
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
            </>
          }
        />
      </div>
    </>
  );
};

export default observer(User);
