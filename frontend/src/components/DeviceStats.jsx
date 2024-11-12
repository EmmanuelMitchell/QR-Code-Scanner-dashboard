// import React, { useEffect, useState } from "react";

// const DeviceStats = () => {
//   const [stats, setStats] = useState({ iPhone: 0, Android: 0 });

//   const param = new URl(location.href().searchParams.get("device"));
//   if (param == "andriod") {
//     location.href("https://www.w3schools.com/");
//   } else if (param == "iphone") {
//     location.href("https://www.youtube.com/");
//   }

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         // Fetch data from your backend API
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
  // Fetch the query parameter 'device' from the URL
  const urlParams = new URL(window.location.href).searchParams;
  const deviceType = urlParams.get("device");

  // Redirect based on the device type in the query parameter
  if (deviceType === "android") {
    window.location.href =
      "https://drive.google.com/file/d/1poiQWBIr3ZMPBLPdQ-kMj3jkHEiuVr9I/view?usp=drivesdk"; // Redirect to Android page
  } else if (deviceType === "iphone") {
    window.location.href = ": https://testflight.apple.com/join/TyjwXqWn"; // Redirect to iPhone page
  }

  useEffect(() => {
    // Fetch stats from the backend
    const fetchStats = async () => {
      try {
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
  }, []); // Only run once on mount

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
