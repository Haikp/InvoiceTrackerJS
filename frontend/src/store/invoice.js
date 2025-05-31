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
        const res = await fetch("/api/invoices")
        const data = await res.json()
        set({ invoices: data.message })
    },
    deleteInvoice: async (id) => {
        const res = await fetch(`/api/invoices/${pid}`, {
            method: "DELETE"
        })

        const data = await res.json()
        if (!data.success) {
            return { success: false, message: data.message }
        }

        set((state) => ({ invoices: state.invoices.filter((invoice) => invoice._id !== id) }))

        return { success: true, message: data.message }
    },
    updateInvoice: async (id, updatedInvoice) => {
        const res = await fetch(`/api/invoices/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(updatedInvoice)
        })

        const data = await res.json()
        if(!data.success) {
            return { success: false, message: data.message }
        }

        set((state) => ({ invoices: state.invoices.map(invoice => invoice._id === id ? data.data : invoice) }))

        return { success: true, message: data.message }
    },
}))
