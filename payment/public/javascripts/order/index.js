require('../../styles/layout.css');
require('../../styles/order/order.css');
require('../../../../../lbConf/publicRes/jsUtils/langbo/init.js');

const paymentMgr = require('./payment');
const weChatMgr = require('./weChat');

$(document).ready(() => {
    if ($('div[data-lb-page=payment]').length > 0) {
        paymentMgr.initPage();
    }
    if ($('div[data-lb-page=weChat]').length > 0) {
        weChatMgr.initPage();
    }
});
