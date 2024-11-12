// import React, { useEffect, useState } from "react";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const DeviceChart = () => {
//   const [data, setData] = useState({
//     labels: ["iPhone", "Android"],
//     datasets: [
//       {
//         label: "QR Code Scans",
//         data: [120, 150], // Replace with actual data fetching
//         backgroundColor: ["#1E3A8A", "#F59E0B"],
//       },
//     ],
//   });

//   useEffect(() => {
//     // Fetch data here if needed and update the chart
//   }, []);

//   return (
//     <div className="bg-white p-6 rounded shadow">
//       <h2 className="text-xl font-semibold mb-4">QR Code Scans by Device</h2>
//       <Bar
//         data={data}
//         options={{ responsive: true, plugins: { legend: { position: "top" } } }}
//       />
//     </div>
//   );
// };

// export default DeviceChart;

// src/components/DeviceChart.js

import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DeviceChart = () => {
  const [chartData, setChartData] = useState({
    labels: ["iPhone", "Android"],
    datasets: [
      {
        label: "QR Code Scans",
        data: [0, 0], // Default data, will update after fetch
        backgroundColor: ["#1E3A8A", "#F59E0B"],
      },
    ],
  });

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/stats");
        if (!response.ok) {
          throw new Error("Failed to fetch chart data");
        }
        const data = await response.json();
        setChartData({
          labels: ["iPhone", "Android"],
          datasets: [
            {
              label: "QR Code Scans",
              data: [data.iphone, data.android],
              backgroundColor: ["#1E3A8A", "#F59E0B"],
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchChartData();
  }, []);

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">QR Code Scans by Device</h2>
      <Bar
        data={chartData}
        options={{ responsive: true, plugins: { legend: { position: "top" } } }}
      />
    </div>
  );
};

export default DeviceChart;
