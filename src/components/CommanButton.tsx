import Link from "next/link";
import React from "react";
const CommanButton = () => {
  return (
    <>
      <div>
        <Link href={`/users/add`}>
          <button className="bg-themeYellow cursor-pointer hover:bg-green-900 text-white font-bold py-2 px-4 rounded-md">
            Add User
          </button>
        </Link>
      </div>
    </>
  );
};
export default CommanButton;
