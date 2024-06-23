"use client";
import Div from "@/components/UI/Div";
import SignupFormComponent from "@/components/ClientComponent/OtherComponents/SignupForm";
const SignUpPage = () => {
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
export default SignUpPage;
