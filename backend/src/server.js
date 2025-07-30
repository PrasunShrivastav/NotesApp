import express from "express";
import dotenv from "dotenv";
import path from "path";

import notesRouter from "./routes/noteRoutes.js";
import { connectDB } from "./config/db.js";
import ratelimiter from "./middlewares/ratelimiter.js";

dotenv.config();
const __dirname = path.resolve();

const app = express();

app.use(express.json());

// app.use(ratelimiter);
app.use("/api/notes", notesRouter);
// Static files and SPA routing only in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}
connectDB().then(() => {
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
});
