const insideDefine = require('../../../../defines/inside/insideDefine');
const alert = require('../../../../../lbConf/publicRes/jsUtils/langbo/alert');
const weChatMgr = {
    initPage: () => {
        weChatMgr.initPageCtrls();
        weChatMgr.initPageEvents();
    },
    initPageCtrls: () => {
        const qrcode = new QRCode(document.getElementById('qrcode'), {
            text: $('#qrcode').attr('data-pay-src'),
            width: 128,
            height: 128,
            colorDark: '#000000',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
        });
        weChatMgr.getOrderStatus();
    },
    initPageEvents: () => {
    },
    getOrderStatus: () => {
        let count = 0;
        const getOrderStatus = setInterval(() => {
            ++count;
            if (count === 1441) {
                clearInterval(getOrderStatus);
                window.location = '/other/payment/error';
                return;
            }
            $.ajax({
                type: 'GET',
                url: '/order/weChat/ajax/getOrderDetail',
                dataType: 'json',
                contentType: 'application/json;charset=utf-8',
                success: res => {
                    if (res.OrderStatus === insideDefine.OrderStatus.Paid) {
                        clearInterval(getOrderStatus);
                        window.location = '/other/payment/success';
                        return;
                    }
                },
                error: err => {
                    let contentError = err;
                    if (typeof err !== 'string') {
                        contentError = err.responseText;
                    }
                    alert.Alert({
                        title: '错误',
                        content: contentError
                    });
                    clearInterval(getOrderStatus);
                    return;
                }
            });
        }, 5000);
    }
};

module.exports = weChatMgr;
