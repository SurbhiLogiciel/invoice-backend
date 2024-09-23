import express from "express";
import { Connection } from "./db";
import dotenv from "dotenv";

import userRoute from "./routes/userRoutes";
import adminRoute from "./routes/adminRoutes";
import companyRoute from "./routes/companyRoutes";

const app = express();
const PORT = 3000;

Connection("mongodb://127.0.0.1:27017/InvoiceDB");

app.use(express.json());
app.use("/api", userRoute);
app.use("/api", adminRoute);
app.use("/api", companyRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
dotenv.config();
