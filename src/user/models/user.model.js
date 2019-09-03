import mongoose from 'mongoose';
import timestamps from 'mongoose-timestamp';

const UserSchema = new mongoose.Schema({
    Usuario: {
        type: String,
        required: true
    },
    Nome: {
        type: String,
        required: true
    },
    Senha: {
        type: String,
        required: true
    },
});

// Cria campos de timestamp automaticamente
UserSchema.plugin(timestamps);

const User = mongoose.model('User', UserSchema);

export default User;