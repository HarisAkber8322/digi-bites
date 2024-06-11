"use client";
import Div from "@/components/UI/Div";
import LoginFoamComponent from "../../components/ClientComponent/OtherComponents/LoginFoam";
const ContactPage = () => {
  return (
    <Div
      themeDivClasses="mt-6"
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
