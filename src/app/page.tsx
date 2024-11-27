// "use client";
// import CardGrid from "@/components/ClientComponent/OtherComponents/CardGrid";
// import Slider from "@/components/ClientComponent/OtherComponents/slider";
// import { observer } from "mobx-react";
// import dynamic from "next/dynamic";
// import CompleteMenu from "@/components/ClientComponent/OtherComponents/CompleteMenu";
// // import CategorySlider from "@/components/ClientComponent/OtherComponents/CategorySlider";

// const App = () => {
//   return (
//     <>
//       <div className="mt-[28px] w-full md:w-[1180px] m-auto xs:w-[250px]">
//         <Slider />
//       </div>
//       <div className="w-full m-auto py-[28px]">
//         <CardGrid />
//       </div>
//       <div className="w-full md:w-[1180px] m-auto py-[28px]">
//         <CompleteMenu />
//       </div>
//     </>
//   );
// };

// export default observer(dynamic(() => Promise.resolve(App), { ssr: false }));

"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { observer } from "mobx-react";
import CardGrid from "@/components/ClientComponent/OtherComponents/CardGrid";
import Slider from "@/components/ClientComponent/OtherComponents/slider";
import CompleteMenu from "@/components/ClientComponent/OtherComponents/CompleteMenu";

const App = () => {


  return (
    <>
      <div className="mt-[28px] w-full md:w-[1180px] m-auto xs:w-[250px]">
        <Slider />
      </div>
      <div className="w-full m-auto py-[28px]">
        {/* <CardGrid /> */}
      </div>
      <div className="w-full md:w-[1180px] m-auto py-[28px]">
        <CompleteMenu />
      </div>
    </>
  );
};

export default observer(dynamic(() => Promise.resolve(App), { ssr: false }));
