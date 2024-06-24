"use client";
import React from "react";
import { observer } from "mobx-react";
import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";
import AdminLayout from "@/components/AdminLayout";
import ClientLayout from "@/components/ClientLayout";
import ClientLoginLayout from "./ClientComponent/ClientLoginLayout";

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");
  return (
    <>
      {isAdminRoute ? (
        <AdminLayout>{children}</AdminLayout>
      ) : pathname === "/login" ||  pathname === "/signup" ? (
        <ClientLoginLayout>{children}</ClientLoginLayout>
      ) : (
        <ClientLayout>{children}</ClientLayout>
      )}
    </>
  );
};

export default observer(
  dynamic(() => Promise.resolve(AppLayout), { ssr: false })
);
