// cleanup.js
import Invoice from "../models/invoice.model.js";

export async function cleanupTrashedInvoices() {
  const THIRTY_DAYS_AGO = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const ONE_YEAR_AGO = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);

  try {
    const result = await Invoice.deleteMany({
      $or: [
        { trashed: true, trashedAt: { $lt: THIRTY_DAYS_AGO } },
        { paid: true, paidAt: { $lt: ONE_YEAR_AGO } }
      ]
    });

    console.log(`[CLEANUP] Deleted ${result.deletedCount} old invoices.`);
  } catch (error) {
    console.error("[CLEANUP] Failed to delete old invoices:", error.message);
  }
}
