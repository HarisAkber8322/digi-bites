import React from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import ThemeProvider from "../components/ThemeContext";
import "../styles/global.css";
import GlobalStyles from "../styles/globalStyles";
import MyApp from "./index";
import MainStoreContext from "@/store/Mainstore";
import { observer } from "mobx-react";
const App = ({ Component, pageProps }) => {
  const router = useRouter();
  const isSplash = router.pathname === "/";
  const mainStore = React.useContext(MainStoreContext);
  return (
    <ThemeProvider>
      {isSplash ? (
        <MyApp {...pageProps} mainStore={mainStore} />
      ) : (
        <Layout>
          <Component {...pageProps} mainStore={mainStore} />
        </Layout>
      )}
      <GlobalStyles />
    </ThemeProvider>
  );
};
export default observer(App);
