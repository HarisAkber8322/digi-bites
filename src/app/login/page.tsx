"use client";
import Div from "@/components/UI/Div";
import LoginFoamComponent from "../../components/ClientComponent/OtherComponents/LoginFoam";
const ContactPage = () => {
  return (
    <Div
      themeDivClasses="grid h-[100vh] items-center !bg-transparent"
      darkColor="bg-papperBlack"
      content={
        <>
          <LoginFoamComponent />
        </>
      }
    />
  );
};
export default ContactPage;
