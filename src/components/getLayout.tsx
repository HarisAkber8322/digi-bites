// /page.ts
"use client";
import React from "react";
import { observer } from "mobx-react";
import dynamic from "next/dynamic";

// Import layout components
import RootLayout from "@/components/RootLayout";
import AdminLayout from "@/components/AdminLayout";

// Import page components
import RootPage from "@/app/client/page";
import AdminPage from "@/app/admin/page";

// Define the layout for each page
const getLayout = (page: React.ReactNode) => {
  // Check if the current page is an admin page
  const isAdminPage = typeof window !== 'undefined' && window.location.pathname.startsWith('/admin');
  
  // Return the appropriate layout
  return isAdminPage ? <AdminLayout>{page}</AdminLayout> : <RootLayout>{page}</RootLayout>;
};

// Export the layout-aware page components
export default {
  "/": observer(dynamic(() => Promise.resolve(RootPage), { ssr: false })),
  "/admin": observer(dynamic(() => Promise.resolve(AdminPage), { ssr: false })),
  getLayout,
};
