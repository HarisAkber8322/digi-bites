
// "use client";
// import Div from "@/components/UI/Div";
// import Text from "@/components/UI/Text";
// import MainStoreContext from "@/store/Mainstore";
// import { observer } from "mobx-react";
// import { useContext } from "react";

// const User: React.FC = () => {
//   const MainStore = useContext(MainStoreContext);
//   const { userList } = MainStore;

//   return (
//     <Div
//       themeDivClasses="pb-20"
//       darkColor="bg-dullBlack"
//       lightColor="bg-bgGrey"
//       content={
//         <>
//           <Text
//             themeDivClasses="text-3xl font-bold block"
//             lightColor="text-black"
//             darkColor="text-white"
//             content="Users List"
//           />

//           <Div
//             themeDivClasses="shadow-lg mt-10 rounded-2xl overflow-hidden pb-14"
//             darkColor="bg-dullblack"
//             content={
//               userList.length === 0 ? (
//                 <Text
//                   themeDivClasses="text-center mt-10"
//                   lightColor="text-black"
//                   darkColor="text-white"
//                   content="No users available."
//                 />
//               ) : (
//                 <table className="min-w-full rounded-lg">
//                   <thead className="bg-lightGray">
//                     <tr className="py-3">
//                       <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500">
//                         SL
//                       </th>
//                       <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500">
//                         First Name
//                       </th>
//                       <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500">
//                         Email
//                       </th>
//                       <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500">
//                         Role
//                       </th>
//                       <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500">
//                         Contact Number
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white dark:bg-gray-900">
//                     {userList.map((user, index) => (
//                       <tr
//                         key={index}
//                         className="hover:bg-gray-100 dark:hover:bg-gray-700 border-b border-b-lightGray h-[20px]"
//                       >
//                         <td className="px-4 py-2 text-center whitespace-nowrap text-sx font-medium text-gray-900 dark:text-gray-100 w-[80px]">
//                           {index + 1}
//                         </td>
//                         <td className="px-4 py-2 text-center whitespace-nowrap text-sx font-medium text-gray-900 dark:text-gray-100">
//                           {user?.fname}   {user?.lname}
//                         </td>
//                         <td className="px-4 py-2 text-center whitespace-nowrap text-sx font-medium text-gray-900 dark:text-gray-100">
//                           {user?.email}
//                         </td>
//                         <td className="px-4 py-2 text-center whitespace-nowrap text-sx font-medium text-gray-900 dark:text-gray-100">
//                           <span className="font-bold">{user?.type}</span>
//                         </td>
//                         <td className="px-4 py-2 text-center whitespace-nowrap text-sx font-medium text-gray-900 dark:text-gray-100">
//                           {user?.contact_no}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               )
//             }
//           />
//         </>
//       }
//     />
//   );
// };

// export default observer(User);


"use client";
import Div from "@/components/UI/Div";
import Text from "@/components/UI/Text";
import MainStoreContext from "@/store/Mainstore";
import { observer } from "mobx-react";
import { useContext, useState } from "react";

const User: React.FC = () => {
  const MainStore = useContext(MainStoreContext);
  const { userList } = MainStore;
  const [searchTerm, setSearchTerm] = useState(""); // State to hold search input

  // Filter users based on the search term
  const filteredUsers = userList.filter((user) => {
    const fullName = `${user.fname} ${user.lname}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <Div
      themeDivClasses="pb-20"
      darkColor="bg-dullBlack"
      lightColor="bg-bgGrey"
      content={
        <>
          <Text
            themeDivClasses="text-3xl font-bold block"
            lightColor="text-black"
            darkColor="text-white"
            content="Users List"
          />

          {/* Search Bar */}
          <div className="flex justify-center mt-6">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Users..."
className="p-2 border rounded-lg w-full text-black"
            />
          </div>

          <Div
            themeDivClasses="shadow-lg mt-10 rounded-2xl overflow-hidden pb-14"
            darkColor="bg-dullblack"
            content={
              filteredUsers.length === 0 ? (
                <Text
                  themeDivClasses="text-center mt-10"
                  lightColor="text-black"
                  darkColor="text-white"
                  content="No users available."
                />
              ) : (
                <table className="min-w-full rounded-lg">
                  <thead className="bg-lightGray">
                    <tr className="py-3">
                      <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500">
                        SL
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500">
                        First Name
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500">
                        Email
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500">
                        Role
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500">
                        Contact Number
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-900">
                    {filteredUsers.map((user, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-100 dark:hover:bg-gray-700 border-b border-b-lightGray h-[20px]"
                      >
                        <td className="px-4 py-2 text-center whitespace-nowrap text-sx font-medium text-gray-900 dark:text-gray-100 w-[80px]">
                          {index + 1}
                        </td>
                        <td className="px-4 py-2 text-center whitespace-nowrap text-sx font-medium text-gray-900 dark:text-gray-100">
                          {user?.fname} {user?.lname}
                        </td>
                        <td className="px-4 py-2 text-center whitespace-nowrap text-sx font-medium text-gray-900 dark:text-gray-100">
                          {user?.email}
                        </td>
                        <td className="px-4 py-2 text-center whitespace-nowrap text-sx font-medium text-gray-900 dark:text-gray-100">
                          <span className="font-bold">{user?.type}</span>
                        </td>
                        <td className="px-4 py-2 text-center whitespace-nowrap text-sx font-medium text-gray-900 dark:text-gray-100">
                          {user?.contact_no}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )
            }
          />
        </>
      }
    />
  );
};

export default observer(User);
