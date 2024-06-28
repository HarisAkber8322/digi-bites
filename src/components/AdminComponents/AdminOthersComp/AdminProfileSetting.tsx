// import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUser, faEnvelope, faLock, faHouse, faGears, faGear } from "@fortawesome/free-solid-svg-icons";
// import Div from "@/components/UI/Div";
// import Text from "@/components/UI/Text";
// import Link from "next/link";

// const AdminProfileSetting: React.FC = () => {
//   const handleSaveProfileChanges = () => {
//     // Handle saving profile changes
//   };

//   const handleChangePassword = () => {
//     // Handle changing password
//   };

//   return (
//     <>
//       <Div
//         themeDivClasses=" rounded-md"
//         content=
//         {<>
//     <Div
//         themeDivClasses="flex justify-between p-6 items-center border-b border-ExtraLightGray"
//         content=
//         {<>
//             <Text themeDivClasses="font-semibold flex items-center gap-2 text-2xl" content={<><FontAwesomeIcon icon={faGear} /> Settings</>}
//              />
//             <Link href={"/admin"}><button className="bg-yellow-400 flex gap-2 rounded-md items-baseline text-md font-semibold text-white p-3 pr-6 pl-6"> <FontAwesomeIcon icon={faHouse}/> DashBoard </button></Link>
//         </>}
//       />

//         </>}
//       />
//     </>
//   );
// };

// export default AdminProfileSetting;
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock, faHouse, faGear, faCamera, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Div from "@/components/UI/Div";
import Text from "@/components/UI/Text";
import Link from "next/link";

const AdminProfileSetting: React.FC = () => {
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [coverPhoto, setCoverPhoto] = useState<File | null>(null);
  const [basicInfo, setBasicInfo] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: ''
  });
  const [password, setPassword] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmNewPassword: false
  });

  const handleSaveProfileChanges = () => {
    // Handle saving profile changes
    console.log("Profile changes saved");
  };

  const handleChangePassword = () => {
    // Handle changing password
    console.log("Password changed");
  };

  const handleProfilePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProfilePhoto(e.target.files[0]);
    }
  };

  const handleCoverPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setCoverPhoto(e.target.files[0]);
    }
  };

  const handleBasicInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBasicInfo(prevInfo => ({ ...prevInfo, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPassword(prevPassword => ({ ...prevPassword, [name]: value }));
  };

  const togglePasswordVisibility = (field: string) => {
    setShowPassword(prevShowPassword => ({ ...prevShowPassword, [field]: !prevShowPassword[field] }));
  };

  return (
    <>
      <Div themeDivClasses="rounded-md" content={
        <>
          <Div
            themeDivClasses="flex justify-between p-6 items-center border-b border-ExtraLightGray"
            content={
              <>
                <Text themeDivClasses="font-semibold flex items-center gap-2 text-2xl" content={<><FontAwesomeIcon icon={faGear} /> Settings</>} />
                <Link href={"/admin"}>
                  <button className="bg-yellow-400 flex gap-2 rounded-md items-baseline text-md font-semibold text-white p-3 pr-6 pl-6">
                    <FontAwesomeIcon icon={faHouse} /> DashBoard
                  </button>
                </Link>
              </>
            }
          />

          <Div themeDivClasses="p-6" content={
            <>
              <Div themeDivClasses="mb-4" content={
                <>
                  <Text themeDivClasses="font-semibold text-lg" content="Edit Profile and Cover Photo" />
                  <Div themeDivClasses="flex items-center gap-4 mt-4" content={
                    <>
                      <label className="cursor-pointer flex flex-col items-center">
                        {profilePhoto ? (
                          <img
                            src={URL.createObjectURL(profilePhoto)}
                            alt="Profile"
                            className="rounded-full w-24 h-24 object-cover"
                          />
                        ) : (
                          <FontAwesomeIcon icon={faUser} className="text-5xl" />
                        )}
                        <input type="file" className="hidden" onChange={handleProfilePhotoChange} />
                        <Text themeDivClasses="text-sm mt-2" content="Change Profile Photo" />
                      </label>
                      <label className="cursor-pointer flex flex-col items-center">
                        <FontAwesomeIcon icon={faCamera} className="text-2xl" />
                        <input type="file" className="hidden" onChange={handleCoverPhotoChange} />
                        <Text themeDivClasses="text-sm mt-2" content="Change Cover Photo" />
                      </label>
                    </>
                  }
                  />
                </>
              }
              />

              <Div themeDivClasses="mb-8" content={
                <>
                  <Text themeDivClasses="font-semibold text-lg" content="Basic Information" />
                  <form className="mt-4 space-y-4">
                    <div className="flex flex-col">
                      <label className="font-semibold">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={basicInfo.firstName}
                        onChange={handleBasicInfoChange}
                        className="border border-gray-300 rounded-md p-2"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="font-semibold">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={basicInfo.lastName}
                        onChange={handleBasicInfoChange}
                        className="border border-gray-300 rounded-md p-2"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="font-semibold">Phone</label>
                      <input
                        type="text"
                        name="phone"
                        value={basicInfo.phone}
                        onChange={handleBasicInfoChange}
                        className="border border-gray-300 rounded-md p-2"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="font-semibold">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={basicInfo.email}
                        onChange={handleBasicInfoChange}
                        className="border border-gray-300 rounded-md p-2"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleSaveProfileChanges}
                      className="bg-blue-500 text-white rounded-md p-2 mt-4"
                    >
                      Save Changes
                    </button>
                  </form>
                </>
              }
              />

              <Div themeDivClasses="mb-8" content={
                <>
                  <Text themeDivClasses="font-semibold text-lg" content="Change Password" />
                  <form className="mt-4 space-y-4">
                    <div className="flex flex-col relative">
                      <label className="font-semibold">Current Password</label>
                      <input
                        type={showPassword.currentPassword ? "text" : "password"}
                        name="currentPassword"
                        value={password.currentPassword}
                        onChange={handlePasswordChange}
                        className="border border-gray-300 rounded-md p-2"
                      />
                      <FontAwesomeIcon
                        icon={showPassword.currentPassword ? faEyeSlash : faEye}
                        className="absolute right-3 top-10 cursor-pointer"
                        onClick={() => togglePasswordVisibility("currentPassword")}
                      />
                    </div>
                    <div className="flex flex-col relative">
                      <label className="font-semibold">New Password</label>
                      <input
                        type={showPassword.newPassword ? "text" : "password"}
                        name="newPassword"
                        value={password.newPassword}
                        onChange={handlePasswordChange}
                        className="border border-gray-300 rounded-md p-2"
                      />
                      <FontAwesomeIcon
                        icon={showPassword.newPassword ? faEyeSlash : faEye}
                        className="absolute right-3 top-10 cursor-pointer"
                        onClick={() => togglePasswordVisibility("newPassword")}
                      />
                    </div>
                    <div className="flex flex-col relative">
                      <label className="font-semibold">Confirm New Password</label>
                      <input
                        type={showPassword.confirmNewPassword ? "text" : "password"}
                        name="confirmNewPassword"
                        value={password.confirmNewPassword}
                        onChange={handlePasswordChange}
                        className="border border-gray-300 rounded-md p-2"
                      />
                      <FontAwesomeIcon
                        icon={showPassword.confirmNewPassword ? faEyeSlash : faEye}
                        className="absolute right-3 top-10 cursor-pointer"
                        onClick={() => togglePasswordVisibility("confirmNewPassword")}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleChangePassword}
                      className="bg-red-500 text-white rounded-md p-2 mt-4"
                    >
                      Change Password
                    </button>
                  </form>
                </>
              }
              />
            </>
          }
          />
        </>
      }
      />
    </>
  );
};

export default AdminProfileSetting;
