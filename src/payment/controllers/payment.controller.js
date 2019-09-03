import Payment from '../models/payment.model';
import httpStatus from 'http-status';
import clientController from '../../client/controllers/client.controller';

const savePayment = (req, res) => {
    clientController.updateSaldo({
        Cliente: req.body.Cliente,
        Valor: -req.body.Valor,
    });

    const payment = new Payment({
        Cliente: req.body.Cliente,
        Forma_pagamento: req.body.Forma_pagamento,
        Valor: req.body.Valor,
    });

    return payment.save()
        .then(result => res.status(httpStatus.CREATED).json(result))
        .catch(result => res.status(httpStatus.BAD_REQUEST).json(result));
}


const getPaymentsByClient = (Cliente) =>
    Payment.find({ "Cliente": Cliente })
        .populate('Cliente')
        .then(result => result)
        .catch(error => { });

const getAllPayment = () =>
    Payment.find()
        .populate('Cliente')
        .sort({ createdAt: 1 })
        .then(result => result)
        .catch(error => []);

export default {
    savePayment,
    getAllPayment,
    getPaymentsByClient
};