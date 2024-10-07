import express from "express";
import { Connection } from "./db";
import userRoute from "./routes/userRoutes";

const app = express();
const PORT = 3000;

Connection("mongodb://127.0.0.1:27017/InvoiceDB");

app.use(express.json());
app.use("/api", userRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
