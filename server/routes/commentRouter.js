const Router = require('express')
const router = new Router()
const commentController = require('../controllers/commentController')
const authMiddleware = require('../middleware/checkAuthMiddleware')
const checkGameIdMiddleware = require('../middleware/checkGameIdMiddleware')
const checkAdminMiddleware = require('../middleware/checkAdminMiddleware')

router.get('/', commentController.getAllComments);
router.get('/game/:gameId', commentController.getAllCommentsForGame);
router.get('/:id', commentController.getCommentById);
router.post('/', authMiddleware, commentController.createComment);
router.put('/:id', commentController.updateComment);
router.delete('/:id',authMiddleware, checkAdminMiddleware, commentController.deleteComment);

module.exports = router;
