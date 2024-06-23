"use client";
import Div from "@/components/UI/Div";
import SignupFormComponent from "@/components/ClientComponent/OtherComponents/SignupForm";
const ContactPage = () => {
  return (
    <Div
      themeDivClasses="grid h-[100vh] items-center !bg-transparent"
      darkColor="bg-papperBlack"
      content={
        <>
          <SignupFormComponent />
        </>
      }
    />
  );
};
export default ContactPage;
