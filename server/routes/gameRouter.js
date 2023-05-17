const Router = require('express')
const router = new Router()
const gameController = require('../controllers/gameController')
const checkRoleMiddleware = require('../middleware/checkAdminMiddleware')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, checkRoleMiddleware, gameController.create)
router.get('/', gameController.getAll)
router.get('/:id', gameController.getOne)
// router.delete('/')
// router.put('/')

module.exports = router
