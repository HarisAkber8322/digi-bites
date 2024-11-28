"use client";
import React from "react";
import { observer } from "mobx-react";
import { usePathname } from "next/navigation";
import AdminLayout from "@/components/AdminLayout";
import ClientLayout from "@/components/ClientLayout";
import ClientLoginLayout from "./ClientComponent/ClientLoginLayout";
import AdminLoginLayout from "./AdminComponents/AdminLoginLayout";
import { AdminProvider } from "@/store/AdminStore";
import { CartProvider } from "@/store/CartStore";
import { ProductProvider } from "@/store/ProductStore";

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");
  const isClientAuthRoute = pathname === "/login" || pathname === "/signup";

  return (
    <ProductProvider>
      {isAdminRoute ? (
        <AdminProvider>
          {pathname === "/admin/auth" ? (
            <AdminLoginLayout>{children}</AdminLoginLayout>
          ) : (
            <AdminLayout>{children}</AdminLayout>
          )}
        </AdminProvider>
      ) : isClientAuthRoute ? (
        <CartProvider>
          <ClientLoginLayout>{children}</ClientLoginLayout>
        </CartProvider>
      ) : (
        <ClientLayout>{children}</ClientLayout>
      )}
    </ProductProvider>
  );
};

export default observer(AppLayout);
