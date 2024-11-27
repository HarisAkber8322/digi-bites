
// "use client";
// import Div from "@/components/UI/Div";
// import Text from "@/components/UI/Text";
// import MainStoreContext from "@/store/Mainstore";
// import { observer } from "mobx-react";
// import { useContext } from "react";

// const TopCustomers: React.FC = () => {
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
//                         First Name
//                       </th>
//                       <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500">
//                         Last Name
//                       </th>
//                       <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500">
//                         Email
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white dark:bg-gray-900">
//                     {userList.map((user, index) => (
//                       <tr
//                         key={index}
//                         className="hover:bg-gray-100 dark:hover:bg-gray-700 border-b border-b-lightGray h-[20px]"
//                       >
           
//                         <td className="px-4 py-2 text-center whitespace-nowrap text-sx font-medium text-gray-900 dark:text-gray-100">
//                           {user?.fname} {user?.lname}
//                         </td>
//                         <td className="px-4 py-2 text-center whitespace-nowrap text-sx font-medium text-gray-900 dark:text-gray-100">
//                           {user?.email}
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

// export default observer(TopCustomers);
// components/TopCustomers.tsx

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
                    href="/admin/users" // Use Link for navigation
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
