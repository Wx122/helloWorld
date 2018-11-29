const express = require('express');
const router = new express.Router();

const auttorizer = require('../../app/authorizer');
const insideClient = require('../../interfaceClients/insideClient');

module.exports = app => {
    app.use(
        '/product/productToOrder',
        (req, res, next) => {
            auttorizer.authorize(req, res, next);
        },
        router
    );
};

router.all('/', async (req, res) => {
    return res.render('product/productToOrder', {
        ServerTestType: req.session.member.ServerTestType.join(',')
    });
});
router.get('/ajax/productCombos', async (req, res, next) => {
    try {
        const getproductCombos = (await insideClient.api.productCombo.getAllProductCombos({
            testType: parseInt(req.query.testType, 10)
        })).obj;
        res.json(getproductCombos);
    } catch (err) {
        next(err);
    }
});
router.post('/ajax/placeAnOrder', async (req, res, next) => {
    try {
        req.session.order = req.body;
        res.json({ status: 0 });
    } catch (err) {
        next(err);
    }
});
