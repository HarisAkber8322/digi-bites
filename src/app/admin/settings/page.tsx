"use client";
import Div from "@/components/UI/Div";
import SettingsPageComponent from "@/components/AdminComponents/AdminOthersComp/AdminProfileSetting";
const SettingsPage = () => {
  return (
    <Div
      themeDivClasses="grid h-[100vh] items-center !bg-transparent"
      darkColor="bg-papperBlack"
      content={
        <>
          <SettingsPageComponent />
        </>
      }
    />
  );
};
export default SettingsPage;
