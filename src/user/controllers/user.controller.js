import User from '../models/user.model';
import httpStatus from 'http-status';

const saveUser = (req, res) => {
    const user = new User({
        Usuario: req.body.Usuario,
        Nome: req.body.Nome,
        Senha: req.body.Senha,
    });

    return user.save()
        .then(result => res.status(httpStatus.CREATED).json(result))
        .catch(result => res.status(httpStatus.BAD_REQUEST).json(result));
}

const login = (req) =>
    User.findOne({ "Usuario": req.body.Usuario, "Senha": req.body.Senha })
        .then(result => result)
        .catch(error => { });

export default {
    saveUser,
    login
};