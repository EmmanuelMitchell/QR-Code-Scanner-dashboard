const express = require("express");
require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");
const app = express();
const prisma = new PrismaClient();
const PORT = 3000;

// enable cors for the frontend
app.use(
  cors({
    origin: "*",
  })
);
// Middleware to parse JSON requests
app.use(express.json());

/**
 * POST /api/scan
 * Endpoint to record a new QR code scan.
 * Expects a JSON body with "deviceType" (either "iPhone" or "Android").
 */
app.post("/api/scan", async (req, res) => {
  const { deviceType } = req.body;

  // Check if deviceType is provided and is valid
  if (!deviceType || (deviceType !== "iPhone" && deviceType !== "Android")) {
    return res.status(400).json({ error: "Invalid device type" });
  }

  try {
    // Create a new scan record in the database
    const scan = await prisma.scan.create({
      data: {
        deviceType,
      },
    });
    res.status(201).json(scan);
  } catch (error) {
    res.status(500).json({ error: "Failed to record scan" });
  }
});

/**
 * GET /api/stats
 * Endpoint to retrieve statistics on QR code scans.
 * Returns the total count of scans for iPhone and Android devices.
 */
app.get("/api/stats", async (req, res) => {
  try {
    // Count the number of scans for each device type
    const iphoneCount = await prisma.scan.count({
      where: { deviceType: "iPhone" },
    });
    const androidCount = await prisma.scan.count({
      where: { deviceType: "Android" },
    });

    // Send response with counts
    res.json({
      iphone: iphoneCount,
      android: androidCount,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve stats" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// const express = require("express");
// const { PrismaClient } = require("@prisma/client");
// const cors = require("cors");
// const app = express();
// const prisma = new PrismaClient();
// const PORT = 3000;

// // Enable CORS for the frontend
// app.use(
//   cors({
//     origin: "*",
//   })
// );

// // Middleware to parse JSON requests
// app.use(express.json());

// /**
//  * POST /api/scan
//  * Endpoint to record a new QR code scan.
//  * Expects a JSON body with "deviceType" (either "iPhone" or "Android").
//  */
// app.post("/api/scan", async (req, res) => {
//   const { deviceType } = req.body;

//   // Check if deviceType is provided and is valid
//   if (!deviceType || (deviceType !== "iPhone" && deviceType !== "Android")) {
//     return res.status(400).json({ error: "Invalid device type" });
//   }

//   try {
//     // Create a new scan record in the database
//     const scan = await prisma.scan.create({
//       data: {
//         deviceType,
//       },
//     });

//     // Redirect to a download link based on the device type
//     if (deviceType === "iPhone") {
//       return res.redirect("https://example.com/iphone-download"); // iPhone download URL
//     } else if (deviceType === "Android") {
//       return res.redirect("https://example.com/android-download"); // Android download URL
//     }
//   } catch (error) {
//     res.status(500).json({ error: "Failed to record scan" });
//   }
// });

// /**
//  * GET /api/stats
//  * Endpoint to retrieve statistics on QR code scans.
//  * Returns the total count of scans for iPhone and Android devices.
//  */
// app.get("/api/stats", async (req, res) => {
//   try {
//     // Count the number of scans for each device type
//     const iphoneCount = await prisma.scan.count({
//       where: { deviceType: "iPhone" },
//     });
//     const androidCount = await prisma.scan.count({
//       where: { deviceType: "Android" },
//     });

//     // Send response with counts
//     res.json({
//       iphone: iphoneCount,
//       android: androidCount,
//     });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to retrieve stats" });
//   }
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
