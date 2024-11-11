import express, { Router } from "express";
import { invoiceListing } from "@/controllers/invoiceListingController";
const invoiceRouter = express.Router()

invoiceRouter.get('/invoiceList/:id',invoiceListing);

export default invoiceRouter;
