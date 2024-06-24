"use client";
import Div from "@/components/UI/Div";
import SuggestionsComponent from "@/components/ClientComponent/OtherComponents/suggestions";
const SuggestionsPage = () => {
  return (
    <Div
      themeDivClasses="grid h-[100vh] items-center !bg-transparent"
      darkColor="bg-papperBlack"
      content={
        <>
          <SuggestionsComponent/>
        </>
      }
    />
  );
};
export default SuggestionsPage;
