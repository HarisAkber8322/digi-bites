"use client";
import Div from "@/components/UI/Div";
import ForgetPassFormComponent from "@/components/ClientComponent/OtherComponents/ForgetPassForm";
const ContactPage = () => {
  return (
    <Div
      themeDivClasses="grid h-[100vh] items-center !bg-transparent"
      darkColor="bg-papperBlack"
      content={
        <>
          <ForgetPassFormComponent />
        </>
      }
    />
  );
};
export default ContactPage;
