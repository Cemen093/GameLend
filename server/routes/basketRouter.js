const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')
const authMiddleware = require('../middleware/authMiddleware')
const checkGameIdMiddleware = require('../middleware/checkGameIdMiddleware')

router.get('/', authMiddleware, basketController.getAllGameFromBasket);
router.post('/', authMiddleware, checkGameIdMiddleware, basketController.addGameToBasket);
router.put('/', authMiddleware, checkGameIdMiddleware, basketController.updateGameQuantity);
router.delete('/:gameId', authMiddleware, basketController.removeGameFromBasket);
router.post('/buy',authMiddleware,  basketController.buy);

module.exports = router;
