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
        type: Float32Array,
        required: true
    },
    // is there a percentage on this?
    shipping: {
        type: Float32Array,
        required: true
    },
    //same thing, i can just do the math here
    tax: {
        type: Float32Array,
        requred: true
    },
    // same thing
    total: {
        type: Float32Array,
        required: true
    }
}, {
    timestamps: true
})

const Invoice = mongoose.model('Invoice', invoiceSchema);

export default Invoice;