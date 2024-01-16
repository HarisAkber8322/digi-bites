// user/add.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
const AddEditUser = ({ initialUserData, submitButtonText, isEdit, title }) => {
  const router = useRouter();
  const [user, setUser] = useState(
    isEdit
      ? initialUserData || {}
      : {
          name: "",
          fname: "",
          role: "",
          phoneNumber: "",
        }
  );
  const handleInputChange = (e) => {
    if (e.target.name) {
      setUser({
        ...user,
        [e.target.name]: e.target.value,
      });
    }
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Updating user with ID:", user._id);
      if (isEdit) {
        await axios.put(`http://localhost:3001/api/users/${user._id}`, user, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else {
        await axios.post("http://localhost:3001/api/users", user, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setUser({
          name: "",
          fname: "",
          role: "",
          phoneNumber: "",
        });
      }
      router.push("/users");
    } catch (error) {
      console.error(`Error ${isEdit ? "updating" : "adding"} user:`, error);
    }
  };
  useEffect(() => {
    setUser(isEdit ? initialUserData || {} : {});
  }, [initialUserData, isEdit]);
  return (
    <div className="container mx-auto p-8">
      <form
        className="bg-white p-6 rounded shadow-md"
        onSubmit={handleFormSubmit}
      >
        <h2 className="text-2xl font-bold mb-6">
          {isEdit ? title : "Add User"}
        </h2>
        <label className="block mb-4">
          <span className="text-gray-600">Name:</span>
          <input
            className="w-full p-2 border border-gray-300 rounded"
            type="text"
            name="name"
            value={user.name}
            onChange={handleInputChange}
            required
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-600">Father Name:</span>
          <input
            className="w-full p-2 border border-gray-300 rounded"
            type="text"
            name="fname"
            value={user.fname}
            onChange={handleInputChange}
            required
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-600">Role:</span>
          <input
            className="w-full p-2 border border-gray-300 rounded"
            type="text"
            name="role"
            value={user.role}
            onChange={handleInputChange}
            required
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-600">Phone Number:</span>
          <input
            className="w-full p-2 border border-gray-300 rounded"
            type="text"
            name="phoneNumber"
            value={user.phoneNumber}
            onChange={handleInputChange}
            required
          />
        </label>
        <button
          type="submit"
          className="bg-[#157347] cursor-pointer hover:bg-green-900 text-white font-bold py-2 px-4 rounded-md"
        >
          {isEdit ? submitButtonText : "Add User"}
        </button>
      </form>
    </div>
  );
};
export default AddEditUser;
