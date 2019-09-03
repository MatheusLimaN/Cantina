import Product from '../models/product.model';
import httpStatus from 'http-status';

const saveProduct = (req, res) => {
    if (req.body.Id) updateProduct(req, res);
    else createProduct(req, res);
}

const updateProduct = (req, res) => {
    const product = {
        Codigo: req.body.Codigo,
        Nome: req.body.Nome,
        Valor: req.body.Valor,
        Quantidade: req.body.Quantidade
    };

    return Product.update({ "_id": req.body.Id }, product, { upsert: true, setDefaultsOnInsert: true })
        .then(result => res.status(httpStatus.CREATED).json(result))
        .catch(result => res.status(httpStatus.BAD_REQUEST).json(result));
}

const createProduct = (req, res) => {
    const product = new Product({
        Codigo: req.body.Codigo,
        Nome: req.body.Nome,
        Valor: req.body.Valor,
        Quantidade: req.body.Quantidade
    });

    return product.save()
        .then(result => res.status(httpStatus.CREATED).json(result))
        .catch(result => res.status(httpStatus.BAD_REQUEST).json(result));
}

const getAllProducts = () =>
    Product.find()
        .sort({ createdAt: 1 })
        .then(result => result)
        .catch(error => []);

const getProductById = (Id) =>
    Product.findOne({ "_id": Id })
        .then(result => result)
        .catch(error => { });

const updateQuantidade = ({ Produto, Quantidade }) =>
    Product.update({ "_id": Produto }, { "$inc": { "Quantidade": - Quantidade } })
        .then(result => result)
        .catch(error => error);

export default {
    saveProduct,
    getAllProducts,
    updateQuantidade,
    getProductById
};