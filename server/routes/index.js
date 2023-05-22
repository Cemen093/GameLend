const Routes = require('express')
const router = new Routes()

const userRouter = require('./userRouter')
const basketRouter = require('./basketRouter')
const wishlistRouter = require('./wishlistRouter')
const gameRouter = require('./gameRouter')
const platformRouter = require('./platformRouter')
const typeSortRouter = require('./typeSortRouter')
const orderList = require('./orderListRouter')

const initRouter = require('./initRouter')

router.use('/user', userRouter)
router.use('/basket', basketRouter)
router.use('/wishlist', wishlistRouter)
router.use('/game', gameRouter)
router.use('/platform', platformRouter)
router.use('/typeSort', typeSortRouter)
router.use('/orderList', orderList)

router.use('/init', initRouter)

module.exports = router
