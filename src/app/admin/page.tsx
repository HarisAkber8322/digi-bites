"use client";
import { observer } from "mobx-react";
import dynamic from "next/dynamic";

const Admin = () => {
  return <div>Admin</div>;
};

export default observer(dynamic(() => Promise.resolve(Admin),{ ssr: false }));