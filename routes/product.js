import express from 'express';
import productController from '../src/product/controllers/product.controller';
import httpStatus from 'http-status';
const router = express.Router();

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const products = await productController.getAllProducts();
  res.render('product', { title: 'Produtos', products });
});

router.get('/create', (req, res, next) => {
  res.render('product/create', { title: "Cadastrar novo produto", showReturn: true });
});

router.get('/create/:Id', async (req, res, next) => {
  const product = await productController.getProductById(req.params.Id);
  res.render('product/create', { title: 'Editar produto', product, showReturn: true });
});

router.get('/getAllProducts', async (req, res, next) => {
  const products = await productController.getAllProducts();
  res.status(httpStatus.OK).json(products);
});

router.post('/saveProduct', productController.saveProduct);

module.exports = router;
