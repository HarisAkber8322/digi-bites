import React from 'react';
import { Pie } from 'react-chartjs-2';
import { observer } from 'mobx-react';
import Div from '../../UI/Div';
import Text from '../../UI/Text';
import { Image } from 'react-bootstrap';

// Sample data for the pie chart
const getOrderStatusData = () => {
  return {
    labels: ['Pending', 'Ongoing', 'Delivered', 'Cancelled', 'Returned', 'Failed to deliver'],
    datasets: [
      {
        data: [36, 32, 33, 3, 2, 2], // Example data corresponding to the labels
        backgroundColor: ['#FF6384', '#FFCE56', '#36A2EB', '#FF0000', '#FF00FF', '#000000'],
        hoverBackgroundColor: ['#FF6384', '#FFCE56', '#36A2EB', '#FF0000', '#FF00FF', '#000000'],
      },
    ],
  };
};

const getPieOptions = () => ({
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'right' as const,
      labels: {
        usePointStyle: true,
      },
    },
    tooltip: {
      callbacks: {
        label: function (tooltipItem: any) {
          return `${tooltipItem.label}: ${tooltipItem.raw} Orders`;
        },
      },
    },
  },
});

const OrderStatusChart: React.FC = () => {
  return (
    <Div
      themeDivClasses=" h-[415px] col-span-1 rounded-xl shadow-xl  my-6 relative"
      darkColor="bg-pepperBlack"
      content={
        <>
          {/* Upper Corner Text */}
          <Text
            themeDivClasses="text-lg p-4 flex flex-row items-center font-medium mb-2 gap-2 border-b shadow border-ExtraLightGray"
            content={
              <>
                Order Status Statistics
              </>
            }
          />

          {/* Pie Chart Display */}
          <div className="h-[330px] w-[330px]  pl-4 pr-4">
            <Pie data={getOrderStatusData()} options={getPieOptions()}/>
          </div>

          {/* Total Orders Display */}
          <div className="absolute bottom-4 left-4 text-center pl-4 pr-4">
            <Text themeDivClasses="text-2xl font-bold" content="108 Orders" />
          </div>
        </>
      }
    />
  );
};

export default observer(OrderStatusChart);
