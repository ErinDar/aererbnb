const express = require('express');
const { json } = require('sequelize');
const router = express.Router();
const apiRouter = require('./api');


router.use('/api', apiRouter);
// router.get('/hello/world', function (req, res) {
//     res.cookie('XSRF-TOKEN', req.csrfToken());
//     res.send('Hello World!');
// });

router.get('/api/csrf/restore', (req, res) => {
    const csrfToken = req.csrfToken();
    res.cookie('XSRF-TOKEN', csrfToken),
        res.status(200).json({
            'XSRF-TOKEN': csrfToken
        })
})

module.exports = router;


// for testing /api route
// fetch('/api/test', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//         'XSRF-TOKEN': 'f1rBSyVx-1-tDeXaD58DRG-zajFeUwQrSRvo'
//     },
//     body: JSON.stringify({
//         hello: 'world'
//     })
// })
//     .then(res => res.json())
//     .then(data => console.log(data));