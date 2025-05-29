import express from "express";
import { createInvoice, deleteInvoice, getInvoices, updateInvoice } from "../controllers/invoice.controller.js";

const router = express.Router();

router.get("/", getInvoices);
router.post("/", createInvoice);
router.put("/:id", updateInvoice);
router.delete("/:id", deleteInvoice);

export default router;