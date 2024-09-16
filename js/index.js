"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const app = (0, express_1.default)();
const PORT = 3000;
(0, db_1.Connection)("mongodb://127.0.0.1:27017/InvoiceDB");
app.use(express_1.default.json());
app.use("/api", userRoutes_1.default);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
