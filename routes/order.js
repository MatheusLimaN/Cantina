import express from 'express';
import clientController from '../src/client/controllers/client.controller';
import productController from '../src/product/controllers/product.controller';
import orderController from '../src/order/controllers/order.controller';

const router = express.Router();

router.get('/', async (req, res, next) => {
  const orders = await orderController.getAllOrders();
  res.render('order', { title: 'Vendas', orders });
});

router.get('/create', async (req, res, next) => {
  const clients = await clientController.getAllClients();
  const products = await productController.getAllProducts();
  res.render('order/create', { title: "Caixa", showReturn: true, clients, products });
});

router.get('/create/:Id', async (req, res, next) => {
  const clients = await clientController.getAllClients();
  const products = await productController.getAllProducts();
  res.render('order/create', { title: "Caixa", showReturn: true, clients, products, clientId: req.params.Id });
});

router.post('/saveOrder', orderController.saveOrder);

module.exports = router;
