const express = require('express');
const router = new express.Router();

const auttorizer = require('../../app/authorizer');
const insideClient = require('../../interfaceClients/insideClient');

module.exports = app => {
    app.use(
        '/order',
        (req, res, next) => {
            auttorizer.authorize(req, res, next);
        },
        router
    );
};
router.get('/payment', async (req, res) => {
    const orderInfo = req.session.order;
    if (!orderInfo) {
        return res.redirect('/product/productToOrder');
    }
    if (orderInfo.ProductName === '') {
        orderInfo.ProductName = '-';
    }
    if (orderInfo.ProductTest === '') {
        orderInfo.ProductTest = '-';
    }

    return res.render('order/payment', { Order: req.session.order });
});

router.get('/payment/weChat', async (req, res) => {
    if (!req.session.courseOrder) {
        return res.redirect('/product/productToOrder');
    }
    return res.render('order/weChat', {
        PayUrl: req.session.courseOrder.PayUrl,
        ProductActualPrice: req.session.order.ProductActualPrice
    });
});

router.get('/weChat/ajax/getOrderDetail', async (req, res, next) => {
    try {
        const getOrderDetail = (await insideClient.api.order.getOrderDetail({
            transCode: req.session.courseOrder.OrderID
        })).obj;
        res.json(getOrderDetail);
    } catch (err) {
        next(err);
    }
});

router.post('/payment/ajax/generateCourseOrder', async (req, res, next) => {
    try {
        const generateCourseOrder = (await insideClient.api.order.generateCourseOrder({
            body: {
                TestType: parseInt(req.body.TestType, 10),
                UserID: req.session.member.UserID,
                PaymentType: req.body.PaymentType,
                OrderType: parseInt(req.body.OrderType, 10),
                ProductID: parseInt(req.body.ProductID, 10),
                CourseDuration: parseFloat(req.body.CourseDuration)
            }
        })).obj;
        if (req.body.PaymentType === 'WeiXin_PC') {
            req.session.courseOrder = generateCourseOrder;
        }
        res.json(generateCourseOrder);
    } catch (err) {
        next(err);
    }
});
