import express from 'express';
import paymentController from '../src/payment/controllers/payment.controller';
import clientController from '../src/client/controllers/client.controller';
const router = express.Router();

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const payments = await paymentController.getAllPayment();
  res.render('payment', { title: 'Pagamentos', payments });
});

router.get('/create', async (req, res, next) => {
  const clients = await clientController.getAllClients();
  res.render('payment/create', { title: "Cadastrar novo pagamento", showReturn: true, clients });
});

router.post('/savePayment', paymentController.savePayment);

module.exports = router;
