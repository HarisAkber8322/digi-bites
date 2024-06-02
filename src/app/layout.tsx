import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "../styles/global.css";
import { Poppins } from "@next/font/google";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "300", "900"], // specify weights you need
  subsets: ["latin"], // specify subsets you need
});
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
const APP_NAME = "digi-bites";
const APP_DESCRIPTION = "Cafeteria Management General Solution";
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
    shortcut: "/favicon.ico",
    icon: [{ url: "/favicon.ico", sizes: "180x180" }],
    apple: [{ url: "/favicon.ico", sizes: "180x180" }],
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
              font-family: ${poppins.style.fontFamily.replace(/'/g, '')};
            }
            #__next {
              margin: 0 auto;
            }
            h1 {
              text-align: center;
            }
            `}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}
