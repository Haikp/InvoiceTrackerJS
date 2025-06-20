import { create } from "zustand"

export const useInvoiceStore = create((set, get) => ({
    invoices: [],
    filter: "all",  // "all", "starred", "archived", "trashed"
    setFilter: (filter) => set({ filter }),
    setInvoices: (invoices) => set({ invoices }),
    createInvoice: async (newInvoice) => {
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
        set({ invoices: data.data })
    },
    searchInvoices: async (query) => {
        const res = await fetch(`/api/invoices/search?q=${query}`, {
            method: "GET"
        })
        const data = await res.json()
        set({ invoices: data.data })

        return { success: true, message: data.message }
    },
    deleteInvoice: async (id) => {
        const res = await fetch(`/api/invoices/${id}`, {
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
    invoiceStatus: async (id) => {
        const invoiceToToggle = get().invoices.find(inv => inv._id === id);
        if (!invoiceToToggle) {
            return { success: false, message: "Invoice not found" };
        }
    
        const updatedInvoice = { ...invoiceToToggle, paid: !invoiceToToggle.paid };
    
        const res = await fetch(`/api/invoices/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedInvoice)
        });
    
        const data = await res.json();
        if (!data.success) {
            return { success: false, message: data.message };
        }
    
        set((state) => ({
            invoices: state.invoices.map((inv) =>
                inv._id === id ? data.data : inv
            )
        }));
    
        return { success: true, message: "Paid status toggled" };
    },
    starInvoice: async (id) => {
        const invoiceToToggle = get().invoices.find(inv => inv._id === id);
        if (!invoiceToToggle) {
            return { success: false, message: "Invoice not found" };
        }
    
        const updatedInvoice = { ...invoiceToToggle, starred: !invoiceToToggle.starred };
    
        const res = await fetch(`/api/invoices/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedInvoice)
        });
    
        const data = await res.json();
        if (!data.success) {
            return { success: false, message: data.message };
        }
    
        set((state) => ({
            invoices: state.invoices.map((inv) =>
                inv._id === id ? data.data : inv
            )
        }));
    
        return { success: true, message: "Starred status toggled" };
    },
    archiveInvoice: async (id) => {
        const invoiceToToggle = get().invoices.find(inv => inv._id === id);
        if (!invoiceToToggle) {
            return { success: false, message: "Invoice not found" };
        }
    
        const updatedInvoice = { ...invoiceToToggle, archived: !invoiceToToggle.archived };
    
        const res = await fetch(`/api/invoices/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedInvoice)
        });
    
        const data = await res.json();
        if (!data.success) {
            return { success: false, message: data.message };
        }
    
        set((state) => ({
            invoices: state.invoices.map((inv) =>
                inv._id === id ? data.data : inv
            )
        }));
    
        return { success: true, message: "Archived status toggled" };
    },
    trashInvoice: async (id) => {
        const invoiceToToggle = get().invoices.find(inv => inv._id === id);
        if (!invoiceToToggle) {
            return { success: false, message: "Invoice not found" };
        }

        const trashedStatus = !invoiceToToggle.trashed;
    
        const updatedInvoice = { 
            ...invoiceToToggle, 
            trashed: trashedStatus,
            trashedAt: trashedStatus? new Date() : null
         };
    
        const res = await fetch(`/api/invoices/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedInvoice)
        });
    
        const data = await res.json();
        if (!data.success) {
            return { success: false, message: data.message };
        }
    
        set((state) => ({
            invoices: state.invoices.map((inv) =>
                inv._id === id ? data.data : inv
            )
        }));
    
        return { success: true, message: "Trashed status toggled" };
    }
}))
