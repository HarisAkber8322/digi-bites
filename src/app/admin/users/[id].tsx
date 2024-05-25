// pages/users/[id].js
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { MainStoreContext } from "@/store/Mainstore";
// import { observer } from "mobx-react";
const ViewUser = ({ user }) => {
  console.log("User prop:", user);

  const [userData, setUserData] = useState(null);
  // const MainStore = useContext(MainStoreContext);
  // console.log(MainStore.userList);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/users/${user._id}`,
        );
        setUserData(response.data);
      } catch (error) {
        console.error(`Error fetching user with ID ${user._id}:`, error);
      }
    };

    if (user) {
      fetchUser();
    }
  }, [user]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <h1 className="text-3xl font-bold mb-4 text-black">User Details</h1>
      <p className="text-lg text-gray-900 mb-2">
        <span className="font-semibold">Name:</span> {userData.name}
      </p>
      <p className="text-lg text-gray-900 mb-2">
        <span className="font-semibold">Father Name:</span> {userData.fname}
      </p>
      <p className="text-lg text-gray-900 mb-2">
        <span className="font-semibold">Role:</span> {userData.role}
      </p>
      <p className="text-lg text-gray-900 mb-2">
        <span className="font-semibold">Phone Number:</span> 
        {userData.phoneNumber}
      </p>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/api/users/${params.id}`,
    );
    const user = response.data;

    return {
      props: {
        user: JSON.parse(JSON.stringify(user)), // Convert ObjectId to strings
      },
    };
  } catch (error) {
    console.error(`Error fetching user with ID ${params.id}:`, error);
    return {
      props: {
        user: {}, // Provide an empty object or handle error state as needed
      },
    };
  }
};

export default ViewUser;
