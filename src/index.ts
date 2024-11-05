import express from "express";
import { Connection } from "./db";
// import dotenv from "dotenv";

import userRoute from "./routes/userRoutes";
import cors from "cors";
import companyRoute from "./routes/companyRoutes";

const app = express();
const PORT = 3001;

Connection("mongodb://127.0.0.1:27017/InvoiceDB");

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api", userRoute);
app.use("/api", companyRoute);
// app.use("/api", adminRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
