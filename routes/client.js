import express from 'express';
import clientController from '../src/client/controllers/client.controller';
import orderController from '../src/order/controllers/order.controller';
import paymentController from '../src/payment/controllers/payment.controller';
import moment from 'moment';

const router = express.Router();

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const clients = await clientController.getAllClients();
  res.render('client', { title: 'Clientes', clients });
});

router.get('/create', (req, res, next) => {
  res.render('client/create', { title: "Cadastrar novo cliente", showReturn: true });
});

router.get('/details/:Id', async (req, res, next) => {
  const client = await clientController.getClientById(req.params.Id);
  const orders = await orderController.getOrdersByClient(req.params.Id);
  const payments = await paymentController.getPaymentsByClient(req.params.Id);

  const ordersFormated = orders.map(order => ({ isOrder: true, ...order._doc }));
  const paymentsFormated = payments.map(payment => ({ isPayment: true, ...payment._doc }));

  const historic = ordersFormated.concat(paymentsFormated);

  historic.sort(function (a, b) {
    if (moment(a.createdAt).isAfter(moment(b.createdAt))) {
      return -1;
    } else {
      return 1
    }
  });

  res.render('client/details', { title: `${client.Nome} ${client.Sobrenome}`, showReturn: true, historic });
});

router.get('/create/:Id', async (req, res, next) => {
  const client = await clientController.getClientById(req.params.Id);
  res.render('client/create', { title: 'Editar cliente', client, showReturn: true });
});

router.post('/saveClient', clientController.saveClient);

module.exports = router;
