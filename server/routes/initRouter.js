const Router = require('express')
const router = new Router()
const initController = require('../controllers/initController')

router.post('/', initController.create)

module.exports = router
