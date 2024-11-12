// import React, { useEffect, useState } from "react";

// const DeviceStats = () => {
//   const [stats, setStats] = useState({ iPhone: 0, Android: 0 });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("http://localhost:3000/api/stats");
//         if (!response.ok) {
//           throw new Error("Failed to fetch data");
//         }
//         const data = await response.json();
//         setStats({ iPhone: data.iphone, Android: data.android });
//       } catch (error) {
//         console.error("Error fetching device stats:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="bg-white p-6 rounded shadow">
//       <h2 className="text-xl font-semibold mb-4">Device Statistics</h2>
//       <div className="space-y-2">
//         <div className="flex justify-between">
//           <span className="font-medium">iPhone Users:</span>
//           <span>{stats.iPhone}</span>
//         </div>
//         <div className="flex justify-between">
//           <span className="font-medium">Android Users:</span>
//           <span>{stats.Android}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DeviceStats;

import React, { useEffect, useState } from "react";

const DeviceStats = () => {
  const [stats, setStats] = useState({ iPhone: 0, Android: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch data from your backend API
        const response = await fetch("http://localhost:3000/api/stats");
        if (!response.ok) {
          throw new Error("Failed to fetch data from backend API");
        }
        const data = await response.json();
        setStats({ iPhone: data.iphone, Android: data.android });
      } catch (error) {
        console.error("Error fetching device stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Device Statistics</h2>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="font-medium">iPhone Users:</span>
          <span>{stats.iPhone}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Android Users:</span>
          <span>{stats.Android}</span>
        </div>
      </div>
    </div>
  );
};

export default DeviceStats;
