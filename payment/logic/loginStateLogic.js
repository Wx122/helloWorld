const loginStateMgr = {
    loginState: {
        login: '登录',
        logout: '注销'
    },
    isBuyNow: false,
    initPage() {
        loginStateMgr.initPageCtrls();
        loginStateMgr.initPageEvents();
    },
    initPageCtrls() {
        $('[data-usr-field=UserCredential]').val('');
        $('[data-usr-field=UserPwd]').val('');
    },
    initPageEvents() {
        $('.j-toggle-txt').on('click', (e) => {
            if ($(e.currentTarget).text().trim() === loginStateMgr.loginState.login) {
                loginStateMgr.loginModelSlideDown();
            }
        });
        $('.j-login p span').on('click', () => {
            loginStateMgr.loginModelSlideUp();
        });
        $('.j-login').on('keydown', (e) => {
            const key = window.event ? e.keyCode : e.which;
            if (key === 13) {
                loginStateMgr.login();
            }
        });
        $('.j-login').on('click', 'div[data-usr-action=login]', () => {
            loginStateMgr.login();
        });
    },
    loginModelSlideDown() {
        $('.j-login').show();
        $('.u-login-cover').animate({ top: '50%' });
    },
    loginModelSlideUp() {
        $('.u-login-cover').animate({ top: '0%' });
        setTimeout(() => {
            $('.j-login').hide();
        }, 400);
    },
    login() {
        const userCredential = $('[data-usr-field=UserCredential]').val().trim();
        const userPwd = $('[data-usr-field=UserPwd]').val();
        if (userCredential === '' || userPwd === '') {
            $('.j-login-error').text('用户名或密码不能为空。').css('visibility', 'visible');
            return;
        }
        $('.j-login-error').css('visibility', 'hidden');

        $.cookie('userCredential', userCredential);
        $.ajax({
            type: 'POST',
            url: '/ajax/login',
            data: JSON.stringify({ UserCredential: userCredential, Password: userPwd }),
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            success(result) {
                if (result.UserID) {
                    $('.j-login').slideUp();
                    $('.j-toggle-txt').text('注销').parent('a').attr('href', '/logout');
                    if (loginStateMgr.isBuyNow === true) {
                        window.location = '/product/productToOrder';
                    }
                } else {
                    $('.j-login-error').text('登录失败，请检查用户名或密码是否正确。').css('visibility', 'visible');
                }
            },
            error(ex) {
                $('.j-login-error').text(ex.responseText).css('visibility', 'visible');
            }
        });
    }
};
module.exports = loginStateMgr;
