const Routes = require('express')
const router = new Routes()

const userRouter = require('./userRouter')
const basketRouter = require('./basketRouter')
const wishListRouter = require('./wishListRouter')
const gameRouter = require('./gameRouter')

const initRouter = require('./initRouter')

router.use('/user', userRouter)
router.use('/basket', basketRouter)
router.use('/wishList', wishListRouter)
router.use('/game', gameRouter)

router.use('/init', initRouter)

module.exports = router
