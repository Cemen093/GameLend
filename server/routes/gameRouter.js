const Router = require('express')
const router = new Router()
const gameController = require('../controllers/gameController')
const checkAdminMiddleware = require('../middleware/checkAdminMiddleware')
const authMiddleware = require('../middleware/checkAuthMiddleware')

router.post('/', authMiddleware, checkAdminMiddleware, gameController.create)
router.get('/', gameController.getAll)
router.get('/:id', gameController.getOne)
// router.delete('/')
// router.put('/')

module.exports = router
