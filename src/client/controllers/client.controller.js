import Client from '../models/client.model';
import httpStatus from 'http-status';

const saveClient = (req, res) => {
    if (req.body.Id) updateClient(req, res);
    else createClient(req, res);
}

const updateClient = (req, res) => {
    const client = {
        CPF: req.body.CPF,
        Nome: req.body.Nome,
        Sobrenome: req.body.Sobrenome,
        Celular: req.body.Celular,
        Email: req.body.Email,
        Saldo: req.body.Saldo || 0,
    };

    return Client.update({ "_id": req.body.Id }, client, { upsert: true, setDefaultsOnInsert: true })
        .then(result => res.status(httpStatus.CREATED).json(result))
        .catch(result => res.status(httpStatus.BAD_REQUEST).json(result));
}

const createClient = (req, res) => {
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

const getAllClients = () =>
    Client.find()
        .sort({ Nome: 1, Sobrenome: 1 })
        .then(result => result)
        .catch(error => []);


const getClientById = (Id) =>
    Client.findOne({ "_id": Id })
        .then(result => result)
        .catch(error => { });

const updateSaldo = ({ Cliente, Valor }) => Client.update({ "_id": Cliente }, { "$inc": { "Saldo": -Valor } })
    .then(result => result)
    .catch(error => error);

export default {
    saveClient,
    getClientById,
    getAllClients,
    updateSaldo
};