import express from "express";
import { Connection } from "./db";
import dotenv from "dotenv";

import userRoute from "./routes/userRoutes";
import cors from "cors";

const app = express();
const PORT = 3001;

Connection("mongodb://127.0.0.1:27017/InvoiceDB");

const corsOptions = {
  origin: "http://localhost:3000", // Replace with your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api", userRoute);
app.use("/api", adminRoute);
app.use("/api", companyRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
