import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import urlRoutes from "./routes/urlRoutes.js";
import { redirectUrl } from "./controllers/urlController.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// CONNECT DATABASE
connectDB();

// API ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/url", urlRoutes);

// REDIRECT ROUTE (VERY IMPORTANT — MUST BE LAST)
app.get("/:shortId", redirectUrl);

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("URL Shortener Backend Running");
});

// START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
