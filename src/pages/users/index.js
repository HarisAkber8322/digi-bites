// pages/users/index.js
import React, { useContext, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CommanButton from "../../components/CommanButton";
import {
  faArrowsUpDown,
  faCaretLeft,
  faCaretRight,
  faEdit,
  faEye,
  faTrash,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { observer } from "mobx-react";
// import { MainStoreContext } from "@/store/Mainstore";
const User = ({ users, totalCount , mainStore}) => {
  const router = useRouter();
  // const MainStore = useContext(MainStoreContext);
  // console.log("im here: ",mainStore.userList);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const PAGE_SIZE = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const handleSortByName = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
  };
  const filteredUsers = mainStore.userList
    .filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();

      if (sortOrder === "asc") {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/users/${id}`);
      router.replace(router.asPath);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    router.push(`/users?page=${newPage}`);
  };

  // const startIndex = (currentPage - 1) * PAGE_SIZE;
  // const endIndex = startIndex + PAGE_SIZE;

  // const visibleUsers = users.slice(startIndex, endIndex);
  return (
    <main>
      <div>
        <div className="user_title flex p-4 justify-between">
          <h1 className="text-4xl font-semibold">USER LIST</h1>
          <input
            type="text"
            placeholder="Search by name"
            className="table_tile font-medium flex justify-start items-center text-[#000] text-lg px-4 py-2 rounded-sm outline-none focus:ring focus:border-[#000]"
            value={searchQuery}
            onChange={handleSearch}
          />
          <CommanButton />
        </div>
        <div className="flex justify-center p-2">
          <div className="user_table border-solid flex flex-col w-[100%]">
            <div className="user_table_titles h-[70px] grid grid-cols-[1fr_1fr_1fr_1fr_1fr] items-center  bg-[#dd8188]  mb-[15px] rounded  ">
              <h2
                className="table_tile font-bold  flex justify-start items-center text-[#eeeeee] text-xl pl-10 cursor-pointer"
                onClick={handleSortByName}
              >
                Name
                <span className="pl-2">
                  <FontAwesomeIcon icon={faArrowsUpDown} />
                </span>
              </h2>
              <h2 className="table_tile font-bold flex justify-start items-center text-[#eeeeee] text-xl ">
                Father Name
              </h2>
              <h2 className="table_tile font-bold  flex justify-start items-center  text-[#eeeeee] text-xl">
                Role
              </h2>
              <h2 className="table_tile font-bold flex justify-start items-center text-[#eeeeee] text-xl">
                Phone Number
              </h2>
              <h2 className="table_tile font-bold  flex justify-center items-center text-[#eeeeee] text-xl">
                Action Icons
              </h2>
            </div>
            <div className="user_table_list duration-75 shadow-sm bg-white rounded overflow-hidden">
              {filteredUsers.map((user) => (
                <div
                  key={user._id}
                  className="table_list grid grid-cols-[1fr_1fr_1fr_1fr_1fr] h-[70px] items-center border-b border-b-gray delay-75 ease-in hover:bg-[#e9e9e9] hover:cursor-pointer"
                >
                  <p className="table_list_item flex justify-start  gap-4 items-center">
                    <span className="text-3xl pl-10">
                      <FontAwesomeIcon
                        color="#000000"
                        icon={faUser}
                        cursor="pointer"
                      />
                    </span>
                    {user.name}
                  </p>
                  <p className="table_list_item flex justify-start  items-center">
                    {user.fname}
                  </p>
                  <p className="table_list_item flex justify-start  items-center">
                    {user.role}
                  </p>
                  <p className="table_list_item flex justify-start  items-center">
                    {user.phoneNumber}
                  </p>
                  <div className="action_icons flex justify-center  items-center  gap-4">
                    <Link href={`/users/${user._id}`}>
                      <FontAwesomeIcon
                        color="gray"
                        icon={faEye}
                        cursor="pointer"
                      />
                    </Link>
                    <Link href={`/users/edit/${user._id}`}>
                      <FontAwesomeIcon
                        color="green"
                        icon={faEdit}
                        cursor="pointer"
                      />
                    </Link>
                    <span>
                      <FontAwesomeIcon
                        color="#740000"
                        icon={faTrash}
                        cursor="pointer"
                        onClick={() => handleDeleteUser(user._id)}
                      />
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end items-center mt-4 shadow-sm bg-white rounded p-3">
              {/* Previous Button */}
              <button
                className=" text-black   hover:text-[#157347]"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <FontAwesomeIcon icon={faCaretLeft} />
              </button>

              {/* Page Buttons */}
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  className={`mx-2 px-2 text-black rounded-md ${
                    currentPage === index + 1
                      ? "!text-red-600"
                      : "text-[#343541]"
                  }`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}

              {/* Next Button */}
              <button
                className=" text-black rounded-md  hover:text-[#157347] pr-5"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <FontAwesomeIcon icon={faCaretRight} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
// export const getServerSideProps = async ({ query }) => {
//   const page = parseInt(query.page, 10) || 1;

//   try {
//     const response = await axios.get(
//       `http://localhost:3001/api/users?page=${page}`
//     );
//     const { users, totalCount } = response.data;

//     if (!Array.isArray(users)) {
//       throw new Error("Users data is not an array");
//     }

//     return {
//       props: {
//         users: JSON.parse(JSON.stringify(users)), // Convert ObjectId to strings
//         totalCount,
//       },
//     };
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     return {
//       props: {
//         users: [],
//         totalCount: 0,
//       },
//     };
//   }
// };

export default observer(User);
