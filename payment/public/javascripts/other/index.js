require('../../styles/layout.css');
require('../../styles/other/other.css');
require('../../styles/other/success.css');
require('../../../../../lbConf/publicRes/jsUtils/langbo/init.js');

const enrolmentMgr = require('./enrolment');

$(document).ready(() => {
    if ($('div[data-lb-page=enrolment]').length > 0) {
        enrolmentMgr.initPage();
    }
});
