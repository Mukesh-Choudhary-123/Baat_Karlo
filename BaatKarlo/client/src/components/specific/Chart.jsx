import React from "react";
import { Line, Doughnut } from "react-chartjs-2";
import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import { getLast7Days } from "../../lib/features";

ChartJS.register(
  CategoryScale,
  Tooltip,
  LineElement,
  LinearScale,
  PointElement,
  Filler,
  ArcElement,
  Legend
);

const labels = getLast7Days();

const lineChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        display: false,
      },
    },
  },
};

const LineChart = ({ value = [] }) => {
  const data = {
    labels,
    datasets: [
      {
        data: value,
        label: "Last Messages",
        fill: true,
        backgroundColor: "lightgray",
        borderColor: "black",
      },
    ],
  };

  return <Line data={data} options={lineChartOptions} />;
};

const doughnutChartOption = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  cutout: 120,
};
const DoughnutChart = ({ value = [], labels = [] }) => {
  const data = {
    labels,
    datasets: [
      {
        data: value,
        label: "Total Chats vs Group Chats",
        backgroundColor: ["lightgray", "lightgray"],
        borderColor: ["black", "black"],
        offset: 10,
      },
    ],
  };
  return (
    <Doughnut
      style={{ zIndex: 10 }}
      data={data}
      options={doughnutChartOption}
    />
  );
};

export { LineChart, DoughnutChart };
