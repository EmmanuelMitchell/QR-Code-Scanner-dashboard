// import React from "react";
// import DeviceStats from "./DeviceStats";
// import DeviceChart from "./DeviceChart";

// const Dashboard = () => {
//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-2xl font-bold mb-4">QR Code Scan Dashboard</h1>
//       <div className="grid gap-4 md:grid-cols-2">
//         <DeviceStats />
//         <DeviceChart />
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React from "react";
import DeviceStats from "./DeviceStats";
import DeviceChart from "./DeviceChart";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">QR Code Scan Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <DeviceStats />
        <DeviceChart />
      </div>
    </div>
  );
};

export default Dashboard;
