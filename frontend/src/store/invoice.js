import { create } from "zustand"

export const useInvoiceStore = create((set) => ({
    invoices: [],
    setInvoices: (invoices) => set({ invoices }),
    createInvoices: async (newInvoice) => {
        if (!newInvoice.company || !newInvoice.id || !newInvoice.subtotal || !newInvoice.shipping || !newInvoice.tax || !newInvoice.total) {
            return { success: false, message: "Please fill in all fields" }
        }

        const res = await fetch("/api/invoices", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newInvoice)
        })

        const data = await res.json()
        set((state) => ({invoices: [...state.invoices, data.data] }))
        return { success: true, message: "Invoice created successfully" }
    },
    fetchInvoices: async () => {
        const res = await fetch("/api/invoice")
        const data = await res.json()
        set({ invoices: data.data })
    }
}))

}