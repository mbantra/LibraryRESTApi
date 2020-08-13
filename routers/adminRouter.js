const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.json({ message: 'You are inside Admin Route'});
});

module.exports = router;