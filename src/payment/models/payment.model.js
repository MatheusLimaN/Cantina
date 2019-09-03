import mongoose from 'mongoose';
import timestamps from 'mongoose-timestamp';

const PaymentSchema = new mongoose.Schema({
    Cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    Forma_pagamento: {
        type: String,
        required: true
    },
    Valor: {
        type: Number,
        required: true
    },
});

// Cria campos de timestamp automaticamente
PaymentSchema.plugin(timestamps);

const Payment = mongoose.model('Payment', PaymentSchema);

export default Payment;