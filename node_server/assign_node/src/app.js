import express from "express";
import "dotenv/config";
import cors from "cors";

import connectDB from "./db/config.js";
import syncDb from "./db/sync.js";
import allRoutes, { mainRouter } from "./routes/routes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:4200",
  })
);

app.use(express.json());

app.use(mainRouter);

// Connect and sync database
await connectDB();

app.use(allRoutes);
app.use(express.static("src/uploads"));

// http://localhost:3000/images/mujtaba/subjectImg-1740490239415.jpeg

app.get("/", (req, res) => {
  console.log("API hit");
  res.send("API live");
});

export default app;
