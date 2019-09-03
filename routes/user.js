import express from 'express';
import userController from '../src/user/controllers/user.controller';

const router = express.Router();

router.post('/saveUser', userController.saveUser);


module.exports = router;
