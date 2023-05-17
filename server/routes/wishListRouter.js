const Router = require('express')
const router = new Router()
const wishListController = require('../controllers/wishListController')
const authMiddleware = require("../middleware/authMiddleware");
const checkGameIdMiddleware = require("../middleware/checkGameIdMiddleware");

router.get('/', authMiddleware, wishListController.getWishList);
router.post('/', authMiddleware, checkGameIdMiddleware, wishListController.addGameToWishList);
router.put('/', authMiddleware, checkGameIdMiddleware, wishListController.moveGameToBasket);
router.delete('/', authMiddleware, checkGameIdMiddleware, wishListController.removeGameFromWishList);

module.exports = router
