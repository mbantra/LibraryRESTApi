const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/signup', passport.authenticate('signup', { session : false }), 
    async (req, res, next) => {
        res.json({
            message: 'Signup Successful',
            user: req.user
        });
    });

router.post('/login', async(req, res, next) => {

    passport.authenticate('login', async (err, user, info) => {
        try {
            if(err || !user) {
                const error = new Error('Error Occurred');
                return next(error);
            }

            req.login(user, { session: false }, async (error) => {
                if(error) {
                    return next(error);
                }

                const payload = { _id: user._id, email: user.email, roles: ['Portal User'] };
                const token = jwt.sign({ payload }, process.env.JWT_SECRET);
                return res.json({ token });
            })
        } catch (error) {
            return next(error);
        }
    })(req, res, next);
});

module.exports = router;