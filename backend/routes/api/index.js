const router = require('express').Router();
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const sessionRouter = require('./session');
const usersRouter = require('./users');
const spotsRouter = require('./spots');
const reviewsRouter = require('./reviews');
const bookingsRouter = require('./bookings');

router.use(restoreUser)

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/spots', spotsRouter);
router.use('/reviews', reviewsRouter);
router.use('/bookings', bookingsRouter);

router.post('/test', (req, res) => {
    res.json({
        requestBody: req.body
    })
})

// router.get('/set-token-cookie', async (req, res) => {
//     const user = await User.findOne({
//         where: {
//             username: 'Demo-lition'
//         }
//     })
//     setTokenCookie(res, user)
//     return res.json({ user })
// })

// router.get('/restore-user', (req, res) => {
//     return res.json(req.user)
// })

// router.get('/require-auth', requireAuth, (req, res) => {
//     return res.json(req.user)
// })

module.exports = router;