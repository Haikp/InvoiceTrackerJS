// cleanup.js
import Invoice from "../models/invoice.model.js";

export async function cleanupTrashedInvoices() {
  const THIRTY_DAYS_AGO = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  try {
    const result = await Invoice.deleteMany({
      trashed: true,
      trashedAt: { $lt: THIRTY_DAYS_AGO }
    });

    console.log(`[CLEANUP] Deleted ${result.deletedCount} old trashed invoices.`);
  } catch (error) {
    console.error("[CLEANUP] Failed to delete trashed invoices:", error.message);
  }
}
