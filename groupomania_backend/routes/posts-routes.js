const postCtrl = require('../controllers/post')
const multer = require('../multer-config')
const express = require("express")
const router = express.Router();

router.get('/', postCtrl.post)
router.get('/:id', postCtrl.post)
router.post('/', multer, postCtrl.createPost)
router.post('/:id', multer, postCtrl.updatepost)
router.delete('/:id', postCtrl.deletepost)
router.post('/review/:id', postCtrl.postReviews)

module.exports = router