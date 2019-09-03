import express from 'express';
import userController from '../src/user/controllers/user.controller';
import jwt from 'jsonwebtoken';

const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  var error = req.query.error;
  res.render('user/login', { layout: false, error });
});

router.post('/', async (req, res, next) => {
  const user = await userController.login(req);
  if (user) {
    var token = jwt.sign({ id: user._Id }, process.env.JWT_SECRET, {
      expiresIn: 7200 // expires in 120min
    });

    res.cookie('token', token, { maxAge: 1000 * 60 * 120, httpOnly: true });
    res.redirect('/');
  } else {
    res.redirect(`/login?error=Usuário e/ou Senha inválidos!`);
  }
});

module.exports = router;
