import express from "express";
const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// user routes
import userRoutes from "./routes/user.routes.js";
import blogRoutes from "./routes/blog.routes.js";

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);

export { app };
