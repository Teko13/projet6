const postCtrl = require('../controllers/post')
const multer = require('../multer-config')
const express = require("express")
const router = express.Router();

router.get('/', postCtrl.posts)
router.get('/:id', postCtrl.post)
router.post('/', multer, postCtrl.createPost)
router.put('/:id', multer, postCtrl.updatepost)
router.delete('/:id', postCtrl.deletepost)
router.put('/review/:id', postCtrl.postReviews)

module.exports = router