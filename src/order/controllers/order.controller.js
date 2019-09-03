import Order from '../models/order.model';
import ProductController from '../../product/controllers/product.controller';
import clientController from '../../client/controllers/client.controller';
import httpStatus from 'http-status';

const saveOrder = async (req, res) => {

    const resultUpdateSaldo = await clientController.updateSaldo({
        Cliente: req.body.Cliente,
        Valor: req.body.Valor_total - req.body.Valor_pago,
    });

    console.log(resultUpdateSaldo);
    console.log(req.body);

    req.body.Produtos.map(async produto => {
        const resultUpdateQuantidade = await ProductController.updateQuantidade({
            Produto: produto._Id,
            Quantidade: produto.Quantidade,
        });

        console.log(resultUpdateQuantidade);
    });

    const order = new Order({
        Produtos: req.body.Produtos,
        Cliente: req.body.Cliente,
        Forma_pagamento: req.body.Forma_pagamento,
        Valor_total: req.body.Valor_total,
        Valor_pago: req.body.Valor_pago,
    });

    return order.save()
        .then(result => res.status(httpStatus.CREATED).json(result))
        .catch(result => res.status(httpStatus.BAD_REQUEST).json(result));
}

const getOrdersByClient = (Cliente) =>
    Order.find({ "Cliente": Cliente })
        .populate('Cliente')
        .then(result => result)
        .catch(error => { });

const getAllOrders = () =>
    Order.find()
        .populate('Cliente')
        .sort({ createdAt: 1 })
        .then(result => result)
        .catch(error => []);


export default {
    saveOrder,
    getAllOrders,
    getOrdersByClient
};