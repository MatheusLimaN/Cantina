import mongoose from 'mongoose';
import timestamps from 'mongoose-timestamp';

const ClientSchema = new mongoose.Schema({
    CPF: {
        type: Number,
        required: true
    },
    Nome: {
        type: String,
        required: true
    },
    Sobrenome: {
        type: String,
        required: true
    },
    Celular: {
        type: String,
        required: false
    },
    Email: {
        type: String,
        required: false
    },
    Saldo: {
        type: Number,
        required: true
    },
});

// Cria campos de timestamp automaticamente
ClientSchema.plugin(timestamps);

const Client = mongoose.model('Client', ClientSchema);

export default Client;