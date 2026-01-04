import "dotenv/config";
import express from "express";
import eventRoutes from "./routes/eventRoutes.js";
import { db } from "./config/db.js";

const app = express();
app.use(express.json());
app.use("/uploads", express.static("uploads"));

async function startServer() {
  await db();

  app.use("/api/v3/app", eventRoutes);

  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
}

startServer();
