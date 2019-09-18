import express from 'express';
import client from './client';
import order from './order';
import payment from './payment';
import product from './product';
import user from './user';
import login from './login';
import dashboard from './dashboard';
import IsAuthenticated from '../src/user/controllers/auth.controller';

const router = express.Router();

/* GET home page. */
router.use('/login', login);
router.use('/', IsAuthenticated, order);
router.use('/user', IsAuthenticated, user);
router.use('/clients', IsAuthenticated, client);
router.use('/orders', IsAuthenticated, order);
router.use('/payments', IsAuthenticated, payment);
router.use('/products', IsAuthenticated, product);
router.use('/dashboard', IsAuthenticated, dashboard);

module.exports = router;