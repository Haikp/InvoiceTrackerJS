import express from "express";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db.js";
import InvoiceRoutes from "./routes/invoice.route.js";
import { cleanupTrashedInvoices } from "./cron/cleanup.js";
import cron from "node-cron";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

const __dirname = path.resolve();
console.log(__dirname)

app.use(express.json()); //allows us to take JSON data in the req.body

app.use("/api/invoices", InvoiceRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

app.listen(PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:" + PORT);
});

// Run cleanup once at server start
await cleanupTrashedInvoices();

// Schedule daily cron
cron.schedule("0 0 * * *", cleanupTrashedInvoices);