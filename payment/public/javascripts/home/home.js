const loginStateLogic = require('../../../logic/loginStateLogic');
const adminMgr = {
    initPage: () => {
        adminMgr.initPageCtrls();
        adminMgr.initPageEvents();
    },
    initPageCtrls: () => {
        $('.main').css('background', '#FFFFFF');
        $('.j-disflex').show();
        $('.u-list-li span').first().css('font-size', '24px');
        $('.j-disflexI').hide();
        $('.u-list-li span').first().addClass('spanFont');
    },
    initPageEvents: () => {
        $('.u-list-li').on('click', 'span', (e) => {
            $(e.currentTarget).addClass('spanFont').siblings().removeClass('spanFont');
            $(e.currentTarget).removeClass('u-span').siblings().addClass('u-span');
            if ($(e.target).text() === '托福智能学习系统') {
                $('.u-list-li span').first().css('font-size', '24px');
                $('.j-disflex').show();
                $('.j-disflexI').hide();
                $('.u-text-border').animate({ left: '18%' });
            } else {
                $('.u-list-li span').first().css('font-size', '18px');
                $('.j-disflex').hide();
                $('.j-disflexI').show();
            }
            if ($(e.target).text() === '雅思智能学习系统') {
                $('.u-list-li span').last().css('font-size', '24px');
                $('.j-disflex').hide();
                $('.j-disflexI').show();
                $('.u-text-border').animate({ left: '68%' });
            } else {
                $('.u-list-li span').last().css('font-size', '18px');
                $('.j-disflex').show();
                $('.j-disflexI').hide();
            }
        });
        $('.j-btn-purchase, .j-button-btn').on('click', () => {
            if ($('.j-toggle-txt').text().trim() === '登录') {
                // 向父插件传值
                loginStateLogic.isBuyNow = true;
                loginStateLogic.loginModelSlideDown();
            } else {
                window.location = '/product/productToOrder';
            }
        });
    }
};

module.exports = adminMgr;
