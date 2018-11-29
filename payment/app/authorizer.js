const InsideDefine = require('../../defines/inside/insideDefine');
module.exports = {
    authorize: (req, res, next, levelArr) => {
        res.locals.time = new Date().getTime();
        const member = req.session.member;
        if (member) {
            res.locals.member = member;
            next();
        } else if (req.url.indexOf('/ajax/') > -1) {
            throw new Error('请重新登录！');
        } else {
            return res.redirect('/home/home');
        }
    }
};
