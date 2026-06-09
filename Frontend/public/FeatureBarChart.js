import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function FeatureBarChart({ data }) {
  const barData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: "Feature Importance",
        data: Object.values(data),
        backgroundColor: "blue",
      },
    ],
  };

  return <Bar data={barData} />;
}
