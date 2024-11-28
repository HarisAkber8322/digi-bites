import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faHouse,
  faEye,
  faEyeSlash,
  faInfoCircle,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Image } from "react-bootstrap";
import Text from "@/components/UI/Text";
import Div from "@/components/UI/Div";

const AdminProfileSetting: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });
  const [activeTab, setActiveTab] = useState("profile"); // Initialize activeTab to 'profile'

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      phone: Yup.string().required("Phone is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      currentPassword: Yup.string().required("Current password is required"),
      newPassword: Yup.string().required("New password is required"),
      confirmNewPassword: Yup.string()
        .oneOf([Yup.ref("newPassword")], "Passwords must match")
        .required("Confirm new password is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const togglePasswordVisibility = (
    field: "currentPassword" | "newPassword" | "confirmNewPassword"
  ) => {
    setShowPassword((prevShowPassword) => ({
      ...prevShowPassword,
      [field]: !prevShowPassword[field],
    }));
  };

  return (
    <Div
      themeDivClasses="p-6 rounded-lg shadow "
      content={
        <>
          <div className="flex justify-between items-center border-b  border-ExtraLightGray p-6">
            <Text
              themeDivClasses=" font-semibold flex items-center gap-2 text-2xl "
              content={
                <>
                  <span>
                    <FontAwesomeIcon icon={faGear} />
                    Settings
                  </span>
                </>
              }
            />

            <Link href="/admin">
              <button className="bg-themeYellow flex gap-2 rounded-md items-baseline text-md font-semibold text-white p-3 pr-6 pl-6">
                <FontAwesomeIcon icon={faHouse} /> Dashboard
              </button>
            </Link>
          </div>

          <div className="flex mt-6 gap-10">
            <div className="w-1/4">
              <nav className="flex flex-col gap-2 shadow-lg rounded p-3">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`flex items-center gap-2 pl-7 ease-in-out duration-200 hover:bg-themeYellow p-2 hover:text-white ${activeTab === "profile" ? "bg-themeYellow  text-white " : ""}`}
                >
                  <FontAwesomeIcon icon={faUser} /> Change Profile
                </button>
                <button
                  onClick={() => setActiveTab("basic")}
                  className={`flex items-center gap-2 pl-7 ease-in-out duration-200 hover:bg-themeYellow p-2 hover:text-white ${activeTab === "basic" ? "bg-themeYellow  text-white " : ""}`}
                >
                  <FontAwesomeIcon icon={faInfoCircle} /> Basic Information
                </button>
                <button
                  onClick={() => setActiveTab("password")}
                  className={`flex items-center gap-2 pl-7 ease-in-out duration-200 hover:bg-themeYellow p-2 hover:text-white ${activeTab === "password" ? "bg-themeYellow text-white " : ""}`}
                >
                  <FontAwesomeIcon icon={faLock} /> Password
                </button>
              </nav>
            </div>

            <div className="w-3/4 shadow-lg rounded p-4">
              {activeTab === "profile" && (
                <div>
                  <h3 className="font-semibold text-lg mb-4">
                    Edit Profile Photo
                  </h3>
                  <div className="flex justify-center mb-7 bg-ExtraLightGray pt-10 rounded ">
                    <div className="relative top-7 ">
                      <label>
                        <Image
                          src={preview || "/images/admin.png"}
                          alt="Profile"
                          className="w-32 h-32 rounded-full object-cover hover:cursor-pointer border-2 border-white duration-200 hover:border-red-500"
                        />

                        <input
                          type="file"
                          onChange={handleImageUpload}
                          className="hidden"
                          accept="image/*"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "basic" && (
                <div>
                  <h3 className="font-semibold text-lg mb-4">
                    Basic Information
                  </h3>
                  <form onSubmit={formik.handleSubmit} className="space-y-4">
                    <div className="flex flex-col">
                      <label className="font-semibold">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-lightGray rounded-md shadow-sm focus:outline-none focus:themeOrange focus:border-themeOrange sm:text-sm"
                      />
                      {formik.errors.firstName && (
                        <div className="text-themeYellow">
                          {formik.errors.firstName}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <label className="font-semibold">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-lightGray rounded-md shadow-sm focus:outline-none focus:themeOrange focus:border-themeOrange sm:text-sm"
                      />
                      {formik.errors.lastName && (
                        <div className="text-themeYellow">
                          {formik.errors.lastName}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <label className="font-semibold">Phone</label>
                      <input
                        type="text"
                        name="phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-lightGray rounded-md shadow-sm focus:outline-none focus:themeOrange focus:border-themeOrange sm:text-sm"
                      />
                      {formik.errors.phone && (
                        <div className="text-themeYellow">
                          {formik.errors.phone}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <label className="font-semibold">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-lightGray rounded-md shadow-sm focus:outline-none focus:themeOrange focus:border-themeOrange sm:text-sm"
                      />
                      {formik.errors.email && (
                        <div className="text-themeYellow">
                          {formik.errors.email}
                        </div>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="bg-themeYellow text-white rounded-md p-2 mt-4"
                    >
                      Save Changes
                    </button>
                  </form>
                </div>
              )}

              {activeTab === "password" && (
                <div>
                  <h3 className="font-semibold text-lg mb-4">
                    Change Password
                  </h3>
                  <form onSubmit={formik.handleSubmit} className="space-y-4">
                    <div className="flex flex-col relative">
                      <label className="font-semibold">Current Password</label>
                      <input
                        type={
                          showPassword.currentPassword ? "text" : "password"
                        }
                        name="currentPassword"
                        value={formik.values.currentPassword}
                        onChange={formik.handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-lightGray rounded-md shadow-sm focus:outline-none focus:themeOrange focus:border-themeOrange sm:text-sm"
                      />
                      <FontAwesomeIcon
                        icon={showPassword.currentPassword ? faEyeSlash : faEye}
                        className="absolute right-3 top-10 cursor-pointer"
                        onClick={() =>
                          togglePasswordVisibility("currentPassword")
                        }
                      />
                      {formik.errors.currentPassword && (
                        <div className="text-themeYellow">
                          {formik.errors.currentPassword}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col relative">
                      <label className="font-semibold">New Password</label>
                      <input
                        type={showPassword.newPassword ? "text" : "password"}
                        name="newPassword"
                        value={formik.values.newPassword}
                        onChange={formik.handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-lightGray rounded-md shadow-sm focus:outline-none focus:themeOrange focus:border-themeOrange sm:text-sm"
                      />
                      <FontAwesomeIcon
                        icon={showPassword.newPassword ? faEyeSlash : faEye}
                        className="absolute right-3 top-10 cursor-pointer"
                        onClick={() => togglePasswordVisibility("newPassword")}
                      />
                      {formik.errors.newPassword && (
                        <div className="text-themeYellow">
                          {formik.errors.newPassword}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col relative">
                      <label className="font-semibold">
                        Confirm New Password
                      </label>
                      <input
                        type={
                          showPassword.confirmNewPassword ? "text" : "password"
                        }
                        name="confirmNewPassword"
                        value={formik.values.confirmNewPassword}
                        onChange={formik.handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-lightGray rounded-md shadow-sm focus:outline-none focus:themeOrange focus:border-themeOrange sm:text-sm"
                      />
                      <FontAwesomeIcon
                        icon={
                          showPassword.confirmNewPassword ? faEyeSlash : faEye
                        }
                        className="absolute right-3 top-10 cursor-pointer"
                        onClick={() =>
                          togglePasswordVisibility("confirmNewPassword")
                        }
                      />
                      {formik.errors.confirmNewPassword && (
                        <div className="text-themeYellow">
                          {formik.errors.confirmNewPassword}
                        </div>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="bg-themeYellow text-white rounded-md p-2 mt-4"
                    >
                      Change Password
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </>
      }
    />
  );
};

export default AdminProfileSetting;
