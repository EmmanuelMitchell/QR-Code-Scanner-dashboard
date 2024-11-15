// import React, { useEffect, useState } from "react";

// const DeviceStats = () => {
//   const [stats, setStats] = useState({ iPhone: 0, Android: 0 });

//   // Function to record a scan to the backend
//   const recordScan = async (deviceType) => {
//     try {
//       await fetch("http://localhost:3000/api/scan", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ deviceType }),
//       });
//     } catch (error) {
//       console.error("Error recording scan:", error);
//     }
//   };

//   useEffect(() => {
//     const urlParams = new URL(window.location.href).searchParams;
//     const deviceType = urlParams.get("device");
//     (async function () {
//       // Redirect based on the device type in the query parameter
//       if (deviceType === "android") {
//         await recordScan("Android"); // Record Android scan
//         window.location.href =
//           "https://drive.google.com/file/d/1poiQWBIr3ZMPBLPdQ-kMj3jkHEiuVr9I/view?usp=drivesdk";
//         // return;
//       } else if (deviceType === "iphone") {
//         await recordScan("iPhone"); // Record iPhone scan
//         window.location.href = "https://testflight.apple.com/join/TyjwXqWn";
//         // return;
//       }
//     })();

//     const fetchStats = async () => {
//       try {
//         const response = await fetch("http://localhost:3000/api/stats");
//         if (!response.ok) {
//           throw new Error("Failed to fetch data from backend API");
//         }
//         const data = await response.json();
//         setStats({ iPhone: data.iphone, Android: data.android });
//       } catch (error) {
//         console.error("Error fetching device stats:", error);
//       }
//     };

//     fetchStats();
//   }, []);

//   return (
//     <div className="bg-white p-6 rounded shadow">
//       <h2 className="text-xl font-semibold mb-4">Device Statistics</h2>
//       <div className="space-y-2">
//         <div className="flex justify-between">
//           <span className="font-medium">iPhone Users:</span>
//           <span>{stats?.iPhone}</span>
//         </div>
//         <div className="flex justify-between">
//           <span className="font-medium">Android Users:</span>
//           <span>{stats?.Android}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DeviceStats;

import React, { useEffect, useState } from "react";
import config from "../pages/utils/config";

const DeviceStats = () => {
  const [stats, setStats] = useState({ iPhone: 0, Android: 0 });

  // Function to record a scan to the backend
  const recordScan = async (deviceType) => {
    try {
      await fetch(`${config.BASE_URL}/api/scan`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ deviceType }),
      });
    } catch (error) {
      console.error("Error recording scan:", error);
    }
  };

  useEffect(() => {
    const urlParams = new URL(window.location.href).searchParams;
    const deviceType = urlParams.get("device");
    (async function () {
      // Redirect based on the device type in the query parameter
      if (deviceType === "android") {
        await recordScan("Android"); // Record Android scan
        window.location.href = config.GOOGLE_DRIVE_URL;
      } else if (deviceType === "iphone") {
        await recordScan("iPhone"); // Record iPhone scan
        window.location.href = config.TESTFLIGHT_URL;
      }
    })();

    const fetchStats = async () => {
      try {
        const response = await fetch(`${config.BASE_URL}/api/stats`);
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
          <span>{stats?.iPhone}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Android Users:</span>
          <span>{stats?.Android}</span>
        </div>
      </div>
    </div>
  );
};

export default DeviceStats;
