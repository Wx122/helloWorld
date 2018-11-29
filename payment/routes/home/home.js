const express = require('express');
const router = new express.Router();

module.exports = app => {
    app.use(
        '/home/home',
        router
    );
};
router.get('/', async (req, res) => {
    const member = req.session.member;
    if (member) {
        res.locals.member = member;
    }
    return res.render('home/home', {});
});
