const Router = require('express')
const router = new Router()
const typeSortController = require('../controllers/typeSortController')
const checkAdminMiddleware = require('../middleware/checkAdminMiddleware')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, checkAdminMiddleware, typeSortController.create)
router.get('/', typeSortController.getAll)
router.get('/:id', typeSortController.getOne)
// router.delete('/')
// router.put('/')

module.exports = router
