require('../../styles/layout.css');
require('../../styles/home/home.css');
require('../../../../../lbConf/publicRes/jsUtils/langbo/init.js');

const adminMgr = require('./home');
const loginStateLogic = require('../../../logic/loginStateLogic');

$(document).ready(() => {
    loginStateLogic.initPage();
    if ($('div[data-lb-page=adminidx]').length > 0) {
        adminMgr.initPage();
    }
});
