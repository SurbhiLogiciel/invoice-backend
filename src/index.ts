import express from "express";
import dotenv from "dotenv";
import { Connection } from "./db";

import userRoute from "./routes/userRoutes";
import cors from "cors";
import companyRoute from "./routes/companyRoutes";
import invoiceRouter from "./routes/invoiceRoutes";
dotenv.config();
const PORT = process.env.PORT;

const app = express();

Connection(process.env.URL);

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api", userRoute);
app.use("/api", companyRoute);
app.use("/api", invoiceRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
