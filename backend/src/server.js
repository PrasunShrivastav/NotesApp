import express from "express";
import dotenv from "dotenv";
import path from "path";

import notesRouter from "./routes/noteRoutes.js";
import { connectDB } from "./config/db.js";
import ratelimiter from "./middlewares/ratelimiter.js";
import userRouter from "./routes/userRouter.js"

dotenv.config();
const __dirname = path.resolve();

const app = express();

app.use(express.json());

// app.use(ratelimiter);
app.use("/api/user", userRouter);
app.use("/api/notes", notesRouter);

// Static files and SPA routing only in production
if (process.env.NODE_ENV === "production") {
  app.use(
    express.static(path.join(__dirname, "../frontend/dist"), {
      index: false, // Don't automatically serve index.html
    })
  );

  // Manual fallback for SPA routing
  app.use((req, res, next) => {
    // If it's an API route, skip
    if (req.path.startsWith("/api/")) {
      return next();
    }
    // For all other routes, serve index.html
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}
connectDB().then(() => {
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
});
