const sharedUtils = require('../../../../../lbConf/publicRes/jsUtils/langbo/sharedUtils');
const alert = require('../../../../../lbConf/publicRes/jsUtils/langbo/alert');
const paymentMgr = {
    initPage: () => {
        paymentMgr.initPageCtrls();
        paymentMgr.initPageEvents();
    },
    initPageCtrls: () => {
    },
    initPageEvents: () => {
        $('.j-pay-submit').on('click', () => {
            const payway = $('.j-pay-way-radio input:checked').val();
            paymentMgr.generateCourseOrder(payway);
        });
        $('.j-pay-way-radio').on('click', () => {
            $('.j-pay-way-radio input').siblings('label').removeClass('u-label-active');
            $('.j-pay-way-radio input:checked').next('label').addClass('u-label-active');
        });
    },
    generateCourseOrder: (payway) => {
        const form = sharedUtils.serializeDataToObj($('.j-detail-form'));
        form.PaymentType = payway;
        $.ajax({
            type: 'POST',
            url: '/order/payment/ajax/generateCourseOrder',
            data: JSON.stringify(form),
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            success: res => {
                if (payway === 'WeiXin_PC') {
                    window.location = '/order/payment/weChat';
                } else {
                    window.location.href = res.PayUrl;
                }
            },
            error: err => {
                alert.Alert({
                    title: '错误',
                    content: err.responseText
                });
            }
        });
    }
};

module.exports = paymentMgr;
