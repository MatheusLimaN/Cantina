import express from 'express';
import moment from 'moment';
import dashboardController from '../src/dashboard/controllers/dashboard.controller';

const router = express.Router();

router.get('/', async (req, res, next) => {
    let init = req.query.init;
    let end = req.query.end;

    if (init && end) {
        init = moment(init);
        end = moment(end);
    } else {
        init = moment().subtract(1, 'months');
        end = moment();
    }

    const data = await dashboardController.getData({ init: init.toISOString(), end: end.toISOString() });
    res.render('dashboard', { title: 'Dashboard', data, init: init.format('YYYY-MM-DD'), end: end.format('YYYY-MM-DD') });
});

router.get('/:init/:end', async (req, res, next) => {
    const data = await dashboardController.getData({ init: req.params.init, end: req.params.end });
    res.render('dashboard', { title: 'Dashboard', data });
});

module.exports = router;
