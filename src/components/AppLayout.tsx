"use client";
import React, { useEffect } from "react";
import { observer } from "mobx-react";
import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";
import AdminLayout from "@/components/AdminLayout";
import ClientLayout from "@/components/ClientLayout";
import ClientLoginLayout from "./ClientComponent/ClientLoginLayout";
import AdminLoginLayout from "./AdminComponents/AdminLoginLayout";
import { adminStore, AdminProvider } from "@/store/AdminStore";
import { CartProvider } from "@/store/CartStore";
import { ProductProvider } from "@/store/ProductStore";

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <>
      <ProductProvider>
        {isAdminRoute ? (
          <AdminProvider>
            {pathname === "/admin/auth" ? (
              <AdminLoginLayout>{children}</AdminLoginLayout>
            ) : (
              <AdminLayout>{children}</AdminLayout>
            )}
          </AdminProvider>
        ) : pathname === "/login" || pathname === "/signup" ? (
          <CartProvider>
            <ClientLoginLayout>{children}</ClientLoginLayout>
          </CartProvider>
        ) : (
          <ClientLayout>{children}</ClientLayout>
        )}
      </ProductProvider>
    </>
  );
};

export default observer(AppLayout);
