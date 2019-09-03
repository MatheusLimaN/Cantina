import express from 'express';
import client from './client';
import order from './order';
import payment from './payment';
import product from './product';

const router = express.Router();

/* GET home page. */
router.use('/clients', client);
router.use('/orders', order);
router.use('/payments', payment);
router.use('/products', product);

module.exports = router;