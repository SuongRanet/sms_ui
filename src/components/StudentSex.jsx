import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ["Male", "Female"],
  datasets: [
    {
      label: "of Students",
      data: [67, 53],
      backgroundColor: ["rgba(54, 162, 235, 0.5)", "rgba(255, 99, 132, 0.5)"],
      borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
      borderWidth: 1,
    },
  ],
};

const options = {
  rotation: 190,
  cutout: "55%",
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        usePointStyle: true, //
        padding: 20,
      },
    },
  },
};

const StudentSex = () => {
  return (
    <div className="bg-white1 p-3 rounded-lg shadow-md flex flex-col gap-4">
      <h1>Student Sex Distribution</h1>

      <div className="h-64 w-full">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default StudentSex;
