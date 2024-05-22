import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useState } from "react";

type ChartProps = {
  title: string;
  trendLine: number[][];
  factLine: number[][];
};

export const Chart: React.FC<ChartProps> = ({ title, trendLine, factLine }) => {
  const [isOpen, setIsOpen] = useState(false);

  const options = {
    title: {
      text: title || "Thermistor Chain Data",
    },
    xAxis: {
      type: "datetime",
      title: {
        text: "Date",
      },
    },
    yAxis: {
      title: {
        text: "Value",
      },
    },
    series: [
      {
        name: "Trend line",
        data: trendLine,
        tooltip: {
          valueDecimals: 3,
        },
      },
      {
        name: "Fact line",
        data: factLine,
        tooltip: {
          valueDecimals: 3,
        },
      },
    ],
  };

  return (
    <div className="mt-10">
      <button
        className="border border-black px-8 py-6 duration-300 hover:bg-blue-300 mb-5"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "Close" : "Open"} chart
      </button>
      <div className={isOpen ? "block" : "hidden"}>
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
        ></HighchartsReact>
      </div>
    </div>
  );
};
