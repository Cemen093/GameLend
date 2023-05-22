const Router = require('express')
const router = new Router()
const orderListController = require('../controllers/orderListController')
const authMiddleware = require('../middleware/authMiddleware')
const checkAdminMiddleware = require('../middleware/checkAdminMiddleware')

router.get('/', authMiddleware, orderListController.getAllOrders);
router.get('/get-all-games-confirmed-orders', authMiddleware, orderListController.getAllGamesConfirmedOrders);
router.post('/', authMiddleware, orderListController.createOrder);
router.put('/confirm-payment', authMiddleware, checkAdminMiddleware, orderListController.confirmPaymentOrder);
router.delete('/:orderId', authMiddleware, checkAdminMiddleware, orderListController.deleteOrder);

module.exports = router;
