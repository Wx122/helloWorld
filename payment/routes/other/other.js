const express = require('express');
const router = new express.Router();

const WeixinDefine = require('../../../../lbConf/sharedApp/weixin/weixinDefine');
const AliPayDefine = require('../../../../lbConf/sharedApp/aliPay/aliPayDefine');
const InsideDefine = require('../../../defines/inside/insideDefine');

const insideClient = require('../../interfaceClients/insideClient');
const weixinClient = require('../../interfaceClients/weixinClient');
const aliPayClient = require('../../interfaceClients/aliPayClient');

module.exports = app => {
    app.use('/other', router);
};
router.get('/enrolment', async (req, res) => {
    return res.render('other/enrolment', {});
});
// 支付宝支付完成回调页面
router.get('/payment', async (req, res, next) => {
    try {
        const member = req.session.member;
        const transCode = req.query.orderID;

        // 查询订单状态
        const orderDetail = (await insideClient.api.order.getOrderDetail({
            transCode
        })).obj;
        // 支付成功跳转支付页面, 失败则跳转失败页面
        if (orderDetail && orderDetail.OrderStatus === InsideDefine.OrderStatus.Paid) {
            if (member) {
                const findStudentsValidServices = (await insideClient.api.BIStudent.findStudentsValidServices({
                    studentID: req.session.member.UserID
                })).obj;

                const mapServices = findStudentsValidServices.map(item => {
                    return item.TestType;
                });
                member.ServerTestType = mapServices;
                res.locals.member = member;
            }
            res.render('other/success', {});
        } else {
            if (member) {
                res.locals.member = member;
            }
            res.render('other/error', {});
        }
    } catch (err) {
        next(err);
    }
});
// 微信支付成功回调页面
router.get('/payment/success', async (req, res, next) => {
    try {
        const member = req.session.member;
        if (member) {
            const findStudentsValidServices = (await insideClient.api.BIStudent.findStudentsValidServices({
                studentID: req.session.member.UserID
            })).obj;

            const mapServices = findStudentsValidServices.map(item => {
                return item.TestType;
            });
            member.ServerTestType = mapServices;
            res.locals.member = member;
        }
        res.render('other/success', {});
    } catch (err) {
        next(err);
    }
});

router.get('/payment/error', async (req, res) => {
    const member = req.session.member;
    if (member) {
        res.locals.member = member;
    }
    return res.render('other/error', {});
});

// 微信支付成功回调
router.post('/payNotify/weixin', async (req, res) => {
    req.setEncoding('utf8');
    let data = '';
    req.on('data', chunk => {
        data += chunk;
    });
    req.on('end', async () => {
        console.log('-------- 微信支付回调 -------');
        console.log(data);
        const payNotifyResponse = (await weixinClient.api.order.parseNotify({
            body: {
                Xml: data
            }
        })).obj;
        // 支付失败
        if (payNotifyResponse.TradeState === WeixinDefine.TradeState.Payerror) {
            res.send(payNotifyResponse.SuccessResponse);
            return;
        }
        // 支付成功
        if (payNotifyResponse.TradeState === WeixinDefine.TradeState.Success) {
            const transCode = payNotifyResponse.OutTradeNo;
            await insideClient.api.order.confirmCourseOrder({
                body: {
                    TransCode: transCode
                }
            });
            res.send(payNotifyResponse.SuccessResponse);
            return;
        }
    });
});

// 支付宝支付成功回调
router.post('/payNotify/alipay', async (req, res) => {
    req.setEncoding('utf8');
    console.log('-----------支付宝支付回调-----------');
    console.log(req.body);
    const body = req.body;
    const fundBillList = body.fund_bill_list.replace(/[\\]/g, '');
    body.fund_bill_list = fundBillList;
    let payNotifyResponse = '';
    try {
        payNotifyResponse = (await aliPayClient.api.order.parseNotify({
            body: {
                Json: JSON.stringify(body),
                AppName: 'pc'
            }
        })).obj;
    } catch (e) {
        res.send('fail');
        console.error(`业务编码：${body.out_trade_no},支付宝回调函数处理异常`, e);
        return;
    }

    // 支付失败
    if (
        payNotifyResponse.TradeState !== AliPayDefine.TradeState.TRADE_SUCCESS &&
        payNotifyResponse.TradeState !== AliPayDefine.TradeState.TRADE_FINISHED
    ) {
        res.send(payNotifyResponse.FailResponse);
        return;
    }

    try {
        // 支付成功
        if (
            payNotifyResponse.TradeState === AliPayDefine.TradeState.TRADE_SUCCESS ||
            payNotifyResponse.TradeState === AliPayDefine.TradeState.TRADE_FINISHED
        ) {
            const transCode = payNotifyResponse.OutTradeNo;
            await insideClient.api.order.confirmCourseOrder({
                body: {
                    TransCode: transCode
                }
            });
            res.send(payNotifyResponse.SuccessResponse);
            return;
        }
    } catch (e) {
        res.send('fail');
        console.error(`支付宝回调业务数据生成异常，业务编码：${body.out_trade_no}`, e);
        return;
    }
});
