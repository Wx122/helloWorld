require('../../styles/layout.css');
require('../../styles/product/productToOrder.css');
require('../../../../../lbConf/publicRes/jsUtils/langbo/init.js');

const purchaseMgr = require('./productToOrder');

$(document).ready(() => {
    if ($('div[data-lb-page=purchase]').length > 0) {
        purchaseMgr.initPage();
    }
});
