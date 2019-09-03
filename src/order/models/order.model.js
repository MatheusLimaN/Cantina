import mongoose from 'mongoose';
import timestamps from 'mongoose-timestamp';

const OrderSchema = new mongoose.Schema({
    Produtos: {
        type: Array,
        required: true
    },
    Cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    Forma_pagamento: {
        type: String,
        required: true
    },
    Valor_total: {
        type: Number,
        required: true
    },
    Valor_pago: {
        type: Number,
        required: true
    },
});

// Cria campos de timestamp automaticamente
OrderSchema.plugin(timestamps);

const Order = mongoose.model('Order', OrderSchema);

export default Order;