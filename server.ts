import express from "express";
import cors from "cors";
import path from "path";
import { INITIAL_VEHICLES, CITIES_AND_MOHALLAS, CATEGORIES_CONFIG } from "./src/data/mockData";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // In-memory store for offline phone auth & OTP codes
  const otpStore = new Map<string, { code: string; expiresAt: number }>();

  // In-memory vehicle storage initialized from default mock data
  let vehiclesList = [...INITIAL_VEHICLES];

  // API Health Check
  app.get("/api/health", (req, res) => {
    res.json({
      status: "ok",
      server: "Node.js Express Standalone Backend",
      offlineReady: true,
      timestamp: new Date().toISOString(),
    });
  });

  // --- Offline Authentication & OTP Endpoints ---
  app.post("/api/auth/send-otp", (req, res) => {
    try {
      const { phone } = req.body;
      if (!phone) {
        return res.status(400).json({ success: false, error: "Phone number is required" });
      }
      const cleaned = phone.replace(/\D/g, "");
      if (cleaned.length < 10) {
        return res.status(400).json({ success: false, error: "Valid 10-digit mobile number required" });
      }

      // Generate local 6-digit OTP code (offline default 123456)
      const code = "123456";
      otpStore.set(cleaned, { code, expiresAt: Date.now() + 10 * 60 * 1000 });

      console.log(`[Offline Node Backend] OTP for +91 ${cleaned}: ${code}`);

      return res.json({
        success: true,
        message: `Offline SMS OTP sent to +91 ${cleaned}`,
        phone: cleaned,
        otpCode: code,
        isOfflineMode: true,
      });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err.message || "Server error sending OTP" });
    }
  });

  app.post("/api/auth/verify-otp", (req, res) => {
    try {
      const { phone, otpCode } = req.body;
      const cleaned = phone ? phone.replace(/\D/g, "") : "";
      const record = otpStore.get(cleaned);

      if (otpCode === "123456" || (record && record.code === otpCode)) {
        return res.json({
          success: true,
          message: "OTP Verified successfully via Node.js Backend!",
          user: {
            phone: cleaned,
            id: `usr_${cleaned}`,
            authTime: new Date().toISOString(),
          },
        });
      }

      return res.status(400).json({
        success: false,
        error: "Incorrect OTP code. Enter 123456 for offline testing.",
      });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err.message || "Server error verifying OTP" });
    }
  });

  // --- Offline Vehicles & Directory Endpoints ---
  app.get("/api/vehicles", (req, res) => {
    let results = [...vehiclesList];
    const { city, category, query } = req.query;

    if (city && typeof city === "string" && city !== "All") {
      results = results.filter((v) => v.city.toLowerCase() === city.toLowerCase());
    }
    if (category && typeof category === "string" && category !== "All Categories") {
      results = results.filter((v) => v.category.toLowerCase() === category.toLowerCase());
    }
    if (query && typeof query === "string" && query.trim() !== "") {
      const q = query.toLowerCase();
      results = results.filter(
        (v) =>
          v.driverName.toLowerCase().includes(q) ||
          v.city.toLowerCase().includes(q) ||
          v.mohalla.toLowerCase().includes(q) ||
          v.category.toLowerCase().includes(q) ||
          (v.vehicleNumber && v.vehicleNumber.toLowerCase().includes(q))
      );
    }

    return res.json({ success: true, count: results.length, vehicles: results });
  });

  app.post("/api/vehicles", (req, res) => {
    try {
      const vehicleData = req.body;
      if (!vehicleData.driverName || !vehicleData.phone || !vehicleData.city) {
        return res.status(400).json({ success: false, error: "Missing driverName, phone or city" });
      }

      const newVehicle = {
        ...vehicleData,
        id: `v-local-${Date.now()}`,
        registeredDate: new Date().toISOString().split("T")[0],
        totalViews: 1,
        searchAppearances: 1,
        phoneClicks: 0,
        rating: 5.0,
        reviewCount: 1,
        isVerified: true,
        isFounderCaptain: true,
      };

      vehiclesList.unshift(newVehicle);
      return res.json({ success: true, vehicle: newVehicle });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err.message || "Failed to register vehicle" });
    }
  });

  app.post("/api/vehicles/:id/click", (req, res) => {
    const { id } = req.params;
    const vehicle = vehiclesList.find((v) => v.id === id);
    if (vehicle) {
      vehicle.phoneClicks = (vehicle.phoneClicks || 0) + 1;
      return res.json({ success: true, phoneClicks: vehicle.phoneClicks });
    }
    return res.status(404).json({ success: false, error: "Vehicle not found" });
  });

  app.get("/api/meta", (req, res) => {
    return res.json({
      success: true,
      cities: CITIES_AND_MOHALLAS,
      categories: CATEGORIES_CONFIG,
    });
  });

  // --- Serve Frontend Application via Vite Middleware in Dev, Static in Prod ---
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[MyTirri Node.js Backend] Running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
