import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

const data = {
  labels,
  datasets: [
    {
      label: "Present Students",
      data: [80, 85, 90, 88, 92, 87, 95],
      backgroundColor: "rgba(75, 192, 192, 0.6)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 2,
    },
    {
      label: "Absent Students",
      data: [20, 15, 10, 12, 8, 13, 5],
      backgroundColor: "rgba(255, 99, 132, 0.6)",
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 2,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        usePointStyle: true,
        padding: 20,
      },
    },
  },
};

const StudentAttended = () => {
  return (
    <div className="bg-white1 p-3 rounded-lg shadow-md flex flex-col gap-4 w-full">
      <h1>Student Attendance by Month</h1>

      <div className="h-full w-full">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default StudentAttended;
