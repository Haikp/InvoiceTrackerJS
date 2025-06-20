import mongoose from "mongoose"

const invoiceSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    subtotal: {
        type: Number,
        required: true
    },
    // is there a percentage on this?
    shipping: {
        type: Number,
        required: true
    },
    //same thing, i can just do the math here
    tax: {
        type: Number,
        requred: true
    },
    // same thing
    total: {
        type: Number,
        required: true
    },
    paid: {
        type: Boolean,
        default: false
    },
    starred: {
        type: Boolean,
        default: false
    },
    archived: {
        type: Boolean,
        default: false
    },
    trashed: {
        type: Boolean,
        default: false
    },
    trashedAt: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
})

const Invoice = mongoose.model('Invoice', invoiceSchema, 'invoices');

export default Invoice;