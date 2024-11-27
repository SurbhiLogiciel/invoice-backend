import express from "express";
import { deleteInvoice, getInvoiceData, getUserFullName, invoiceListing, updateInvoice } from "@/controllers/invoiceListingController";
import { createInvoice } from "@/controllers/invoiceController";
const invoiceRouter = express.Router();

invoiceRouter.post("/invoices/:id", createInvoice);
invoiceRouter.get("/invoiceList", invoiceListing);
invoiceRouter.get("/invoiceData/:userId/:invoiceId", getInvoiceData);
invoiceRouter.put("/invoices/:userId/:invoiceId", updateInvoice);

invoiceRouter.get("/userName/:userId", getUserFullName);
invoiceRouter.delete("/deleteInvoice/:userId/:invoiceId", deleteInvoice);

export default invoiceRouter;
