"use client";
import Div from "@/components/UI/Div";
import LoginFoamComponent from "../../components/ClientComponent/OtherComponents/LoginFoam";
const LoginPage = () => {
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
export default LoginPage;
