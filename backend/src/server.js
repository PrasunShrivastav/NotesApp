import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import notesRouter from "./routes/noteRoutes.js";
import { connectDB } from "./config/db.js";
import ratelimiter from "./middlewares/ratelimiter.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// app.use(ratelimiter);
app.use("/api/notes", notesRouter);
connectDB().then(() => {
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
});
