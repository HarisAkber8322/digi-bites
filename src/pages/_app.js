import React, { useContext } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import ThemeStoreContext from "../store/ThemeStore";
import "../styles/global.css";
import GlobalStyles from "../styles/globalStyles";
import MyApp from "./index";
import MainStoreContext from "../store/Mainstore";
import { observer } from "mobx-react";
const App = ({ Component, pageProps }) => {
  const router = useRouter();
  const isSplash = router.pathname === "/";
  const mainStore = useContext(MainStoreContext);
  const themeStore = useContext(ThemeStoreContext);
  return (
    <MainStoreContext.Provider value={mainStore}>
      <ThemeStoreContext.Provider value={themeStore}>
        {isSplash ? (
          <MyApp {...pageProps} mainStore={mainStore} />
        ) : (
          <Layout themeStore={themeStore}>
            <Component {...pageProps} mainStore={mainStore} themeStore={themeStore} />
          </Layout>
        )}
        <GlobalStyles />
      </ThemeStoreContext.Provider>
    </MainStoreContext.Provider>
  );
};
export default observer(App);
