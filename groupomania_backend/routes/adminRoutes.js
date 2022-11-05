const postCtrl = require('../controllers/post')
const adminCtrl = require('../controllers/admin')
const admin = require('../admin');
const multer = require('../multer-config')
const express = require("express")
const router = express.Router();

router.get('/', admin, postCtrl.posts)
router.get('/:author/', admin, postCtrl.authorPosts)
router.get('/:id', admin, postCtrl.post)
router.post('/', admin, multer, postCtrl.createPost)
router.put('/:id', admin, multer, adminCtrl.updatepost)
router.delete('/:id', admin, adminCtrl.deletepost)
router.put('/', admin, postCtrl.postReviews)

module.exports = router;