import React, { useState } from "react";
import Div from "../../UI/Div";
import Text from "../../UI/Text";
import { Line } from "react-chartjs-2";
import { observer } from "mobx-react";
import 'chart.js/auto';
import { Image } from "react-bootstrap";

type Period = "Year" | "Month" | "Week";
const getGraphData = (period: Period) => {
    
  switch (period) {
    case "Year":
      return {
        labels: Array.from({ length: 12 }, (_, i) => `Month ${i + 1}`),
        datasets: [
          {
            label: "Yearly Data",
            data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 100)),
            borderColor: "rgba(251, 188, 9, 1)",
            borderWidth: 1,
            borderDash: [5, 5],
            fill: false,
          },
        ],
      };
    case "Month":
      return {
        labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
        datasets: [
          {
            label: "Monthly Data",
            data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 100)),
            borderColor: "rgba(251, 188, 9, 1)",
            borderWidth: 1,
            borderDash: [5, 5],
            fill: false,
          },
        ],
      };
    case "Week":
      return {
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" 
        ],
        datasets: [
          {
            label: "Weekly Data",
            data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 100)),
            borderColor: "rgba(251, 188, 9, 1)",
            borderWidth: 1,
            borderDash: [5, 5],
            fill: false,
          },
        ],
      };
    default:
      return { labels: [], datasets: [] };
  }
};

const getGraphOptions = (period: Period) => ({
  scales: {
    x: {
      title: {
        display: true,
        text: period === "Year" ? "Months" : period === "Month" ? "Days" : "Days of the Week",
      },
    },
    y: {
      title: {
        display: true,
        text: period === "Year" ? "Year" : period === "Month" ? "Month" : "Week",
      },
    },
  },
  plugins: {
    legend: {
      display: true,
      position: 'top' as const, // Correctly typing position as 'top'
    },
  },
});

const OrderStatistics: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>("Year");

  const handleButtonClick = (period: Period) => {
    setSelectedPeriod(period);
  };

  return (
    <Div
      themeDivClasses="col-span-2 h-[415px] rounded-xl shadow-xl p-6 mr-6  relative "
      darkColor="bg-pepperBlack"
      content={
        <>
          {/* Upper Corner Text */}
          <Text
            themeDivClasses="text-lg flex flex-row items-center font-medium mb-6 gap-2"
            content={
              <>
                <Image
                  src={"/images/Icons/icons8-total-sales-96.png"}
                  alt="name"
                  className="h-8 w-8"
                />
                Earning Statistics
              </>
            }
          />

          {/* Period Selection Buttons */}
          <div className="absolute top-4 right-4 space-x-2 text-black ">
            {["Year", "Month", "Week"].map((period) => (
              <button
                key={period}
                className={`px-4 py-2 rounded ${
                  selectedPeriod === period
                    ? "bg-themeYellow text-white"
                    : "bg-gray-200 text-black"
                }`}
                onClick={() => handleButtonClick(period as Period)}
              >
                {period}
              </button>
            ))}
          </div>

          {/* Graph Display */}
          <div className="mt-8">
            <Line data={getGraphData(selectedPeriod)} options={getGraphOptions(selectedPeriod)} />
          </div>
        </>
      }
    />
  );
};

export default observer(OrderStatistics);
