import express from "express";
import dotenv from "dotenv";
import { PORT } from "./config/config";
import { Connection } from "./db";

import userRoute from "./routes/userRoutes";
import cors from "cors";
import companyRoute from "./routes/companyRoutes";
dotenv.config();

const app = express();

Connection(process.env.URL);

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  methods: process.env.CORS_METHODS?.split(","),
  allowedHeaders: process.env.CORS_HEADERS?.split(","),
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api", userRoute);
app.use("/api", companyRoute);
// app.use("/api", adminRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
