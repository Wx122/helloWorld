const express = require('express');
const router = new express.Router();

const insideClient = require('../interfaceClients/insideClient');
const loginValidator = require('../../defines/inside/loginValidator');

module.exports = app => {
    app.use('/', router);
};

/* GET home page. */
router.get('/', async (req, res, next) => {
    try {
        if (req.session.member) {
            // 已登录
            const member = req.session.member;
            res.locals.member = member;
        }
        return res.render('home/home', {});
    } catch (err) {
        next(err);
    }
    return 0;
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

router.post('/ajax/login', async (req, res, next) => {
    try {
        loginValidator.login(req.body);
        const loginResult = await insideClient.api.user.loginByLC({
            userCredential: req.body.UserCredential,
            password: req.body.Password
        });
        switch (loginResult.status) {
            case 200:
                const member = loginResult.obj;
                req.session.member = {
                    UserID: member.UserID,
                    ServerTestType: member.ServerTestType
                };
                res.json(member);
                return;
            default:
                return res.redirect('/home/home');
        }
    } catch (err) {
        next(err);
    }
});
