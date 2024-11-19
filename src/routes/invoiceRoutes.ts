import express, { Router } from "express";
import { invoiceListing } from "@/controllers/invoiceListingController";
import { createInvoice } from "@/controllers/invoiceController";
const invoiceRouter = express.Router();

invoiceRouter.get("/invoiceList/:id", invoiceListing);
invoiceRouter.post("/invoices/:id", createInvoice);

export default invoiceRouter;
