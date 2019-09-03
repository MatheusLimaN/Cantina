import Client from '../models/client.model';
import httpStatus from 'http-status';

const saveClient = (req, res) => {
    const client = new Client({
        CPF: req.body.CPF,
        Nome: req.body.Nome,
        Sobrenome: req.body.Sobrenome,
        Celular: req.body.Celular,
        Email: req.body.Email,
        Saldo: req.body.Saldo,
    });

    return client.save()
        .then(result => res.status(httpStatus.CREATED).json(result))
        .catch(result => res.status(httpStatus.BAD_REQUEST).json(result));
}

const getAllClients = (req, res) => {
    Client.find()
        .sort({ createdAt: 1 })
        .then((result) => {
            res.status(httpStatus.OK).json(result);
        })
        .catch(error => res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error));
};

export default {
    saveClient,
    getAllClients
};