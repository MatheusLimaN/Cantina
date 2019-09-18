import express from 'express';
import dashboardController from '../src/dashboard/controllers/dashboard.controller';

const router = express.Router();

router.get('/:init/:end', async (req, res, next) => {
    const data = await dashboardController.getData({ init: req.params.init, end: req.params.end });
    res.render('dashboard', { title: 'Dashboard', data });
});

module.exports = router;
