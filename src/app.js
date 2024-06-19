import express from "express";
const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
// import path from "path";
// const __dirname = path.resolve();
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(path.join(__dirname, "../client/dist"));

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static(path.join(__dirname, "../client/dist")));
app.use(cookieParser());
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

// user routes
import userRoutes from "./routes/user.routes.js";
import blogRoutes from "./routes/blog.routes.js";

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);

export { app };
