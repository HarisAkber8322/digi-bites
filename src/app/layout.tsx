// "use client";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "../styles/global.css";
import Layout from "@/components/ClientLayout";
import ClientLayout from "@/components/ClientLayout";
import AdminLayout from "@/components/AdminLayout";
interface JSXElementProps {
  children: ReactNode;
}

interface HTMLAttributes extends JSXElementProps {
  lang?: string;
  dir?: string;
}

interface HeadProps extends JSXElementProps {}

interface BodyProps extends JSXElementProps {}

interface HTMLProps extends JSXElementProps {
  lang?: string;
  dir?: string;
}

declare namespace JSX {
  interface IntrinsicElements {
    html: HTMLAttributes;
    head: HeadProps;
    body: BodyProps;
  }
}

const APP_NAME = "next-pwa example";
const APP_DESCRIPTION = "This is an example of using next-pwa";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_NAME,
    template: "%s - PWA App",
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_NAME,
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    // shortcut: "/favicon.ico",
    apple: [{ url: "/next.png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // @ts-ignore
    <html lang="en" dir="ltr">
      <head>
        <style>{`
            html, body, #__next {
              height: 100%;
            }
            #__next {
              margin: 0 auto;
            }
            h1 {
              text-align: center;
            }
            `}</style>
      </head>
      <body>
        <AdminLayout >{children}</AdminLayout>
        {/* <ClientLayout>{children}</ClientLayout> */}
      </body>
    </html>
  );
}
