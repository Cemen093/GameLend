const Router = require('express')
const router = new Router()
const wishListController = require('../controllers/wishlistController')
const authMiddleware = require("../middleware/checkAuthMiddleware");
const checkGameIdMiddleware = require("../middleware/checkGameIdMiddleware");

router.get('/', authMiddleware, wishListController.getAllGameFromWishList);
router.post('/', authMiddleware, checkGameIdMiddleware, wishListController.addGameToWishList);
router.delete('/:gameId', authMiddleware, wishListController.removeGameFromWishList);
router.post('/moveToBasket', authMiddleware, checkGameIdMiddleware, wishListController.moveGameToBasket);

module.exports = router
