import React from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import ThemeProvider from "../components/ThemeContext";
import "../styles/global.css";
import GlobalStyles from "../styles/globalStyles"
import MyApp from "./index";

const App = ({ Component, pageProps}) => {
  const router = useRouter();
  const isSplash = router.pathname === "/";
  return (
    <ThemeProvider>
      {isSplash ? (
        <MyApp {...pageProps} />
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
      <GlobalStyles/>
    </ThemeProvider>
  );
};
export default App;
