"use client";
import React, { useEffect, useState, useContext } from 'react';
import { Pie } from 'react-chartjs-2';
import { observer } from 'mobx-react';
import MainStoreContext from '@/store/Mainstore';
import { ChartData, ChartOptions, TooltipItem } from 'chart.js';
import Div from '@/components/UI/Div';
import Text from '@/components/UI/Text';

const OrderStatusChart: React.FC = () => {
  const mainStore = useContext(MainStoreContext);
  const [statusData, setStatusData] = useState<ChartData<'pie'>>({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
        hoverBackgroundColor: [],
      },
    ],
  });
  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      await mainStore.loadOrders();
      const orders = mainStore.orderList;

      // Process the orders to get the status distribution
      const statusCounts = orders.reduce((acc, order) => {
        acc[order.status] = (acc[order.status] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      // Prepare the data for the chart
      const labels = Object.keys(statusCounts);
      const data = Object.values(statusCounts);
      const colors = ['#FF6384', '#FFCE56', '#36A2EB', '#FF0000', '#FF00FF', '#000000'];
      const hoverColors = ['#FF6384', '#FFCE56', '#36A2EB', '#FF0000', '#FF00FF', '#000000'];

      setStatusData({
        labels,
        datasets: [
          {
            data,
            backgroundColor: colors,
            hoverBackgroundColor: hoverColors,
          },
        ],
      });

      setTotalOrders(orders.length);
    };

    fetchOrders();
  }, [mainStore]);

  const getPieOptions: () => ChartOptions<'pie'> = () => ({
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'right',
        labels: {
          usePointStyle: true,
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: TooltipItem<'pie'>) {
            return `${tooltipItem.label}: ${tooltipItem.raw} Orders`;
          },
        },
      },
    },
  });

  return (
    <Div
      themeDivClasses="h-[415px] col-span-1 flex flex-col justify-center items-center rounded-xl shadow-xl my-6 relative"
      darkColor="bg-pepperBlack"
      content={
        <>
          {/* Upper Corner Text */}
          <Text
            themeDivClasses="text-lg p-4 w-full flex flex-row items-center font-medium mb-2 gap-2 border-b shadow border-ExtraLightGray"
            content="Order Status Statistics"
          />

          {/* Pie Chart Display */}
          <div className="h-[330px] w-[330px] pl-4 pr-4">
            <Pie data={statusData} options={getPieOptions()} />
          </div>

          {/* Total Orders Display */}
          <div className="absolute bottom-4 left-4 text-center pl-4 pr-4">
            <Text themeDivClasses="text-2xl font-bold" content={`${totalOrders} Orders`} />
          </div>
        </>
      }
    />
  );
};

export default observer(OrderStatusChart);
