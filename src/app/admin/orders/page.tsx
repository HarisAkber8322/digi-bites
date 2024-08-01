"use client";
import Div from "@/components/UI/Div";
import Text from "@/components/UI/Text";
import MainStoreContext from "@/store/Mainstore";
import { observer } from "mobx-react";
import { useContext } from "react";

const Orders: React.FC = () => {
  const MainStore = useContext(MainStoreContext);
  const { orderList } = MainStore;
  console.log(orderList)
  return (
    <div>
      <Text themeDivClasses="text-3xl font-bold block mb-5" content="Orders" />
      <Div
        themeDivClasses={"flex flex-col !bg-transparent"}
        content={
          <>
            <div className="flex flex-col gap-5">
              <Div
                themeDivClasses="p-4 rounded-md shadow-sm gap-4 grid grid-cols-5 mb-5"
                content={
                  <>
                    <Text themeDivClasses="" content="order name" />
                    <Text themeDivClasses="" content="price" />
                    <Text themeDivClasses="" content="total amount" />
                    <Text themeDivClasses="" content="status" />
                  </>
                }
              />
            </div>
            <div className="flex flex-col gap-5">
              {orderList.map((order, index) => {
                return (
                  <Div
                    key={index}
                    themeDivClasses="p-4 rounded-md shadow-sm gap-4 grid grid-cols-5"
                    content={
                      <>
                        {/* <Text themeDivClasses="" content={order?.items[0].name} />
                        <Text themeDivClasses="" content={order?.items[0].price} />
                        <Text themeDivClasses="" content={order?.total} />
                        <Text
                          themeDivClasses=""
                          content={
                            <span className="font-bold">{order?.status}</span>
                          }
                        /> */}
                      </>
                    }
                  />
                );
              })}
            </div>
          </>
        }
      />
    </div>
  );
};

export default observer(Orders);
