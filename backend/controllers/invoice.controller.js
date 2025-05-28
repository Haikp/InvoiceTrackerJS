import mongoose from "mongoose"
import Invoice from "../models/invoice.model.js"

export const getInvoice = async (req, res) => {
    try {
        const invoices = Invoice.find({});
        res.status(200).json({ success: true, message: invoices })
    } catch (error) {
        console.log("Error in fetching invoices:", error.message)
        res.status(404).json({ success: false, message: "There are no invoices" })
    }
}

export const createInvoice = async (req, res) => {
    const invoice = req.body
        
    if (!invoice.company || !invoice.id || !invoice.subtotal || !invoice.shipping || !invoice.tax || !invoice.total) {
        return res.json({ success: false, message: "Please provice all fields" })
    }

    const newInvoice = new Invoice(invoice)

    try {
        await newInvoice.save()
        res.status(201).json({ success: true, message: newInvoice })
    } catch (error) {
        console.error("Error in creating new invoice:", error.message)
        res.status(500).json({ success: false, message: "Server Error" })
    }
}

export const updateInvoice = async (req, res) => {
    
}