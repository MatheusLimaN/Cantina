import mongoose from 'mongoose';
import timestamps from 'mongoose-timestamp';

const ProductSchema = new mongoose.Schema({
    Codigo: {
        type: Number,
        required: true
    },
    Nome: {
        type: String,
        required: true
    },
    Valor: {
        type: Number,
        required: true
    },
    Quantidade: {
        type: Number,
        required: true
    },
});

// Cria campos de timestamp automaticamente
ProductSchema.plugin(timestamps);

const Product = mongoose.model('Product', ProductSchema);

export default Product;