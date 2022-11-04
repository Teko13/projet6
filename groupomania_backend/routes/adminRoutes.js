const postCtrl = require('../controllers/post')
const auth = require('../auth');
const admin = require('../admin');
const multer = require('../multer-config')
const express = require("express")
const router = express.Router();

router.get('/', admin, postCtrl.posts)
router.get('/:author/', admin, postCtrl.authorPosts)
router.get('/:id', admin, postCtrl.post)
router.post('/', admin, auth, multer, postCtrl.createPost)
router.put('/:id', admin, auth, multer, postCtrl.updatepost)
router.delete('/:id', admin, auth, postCtrl.deletepost)
router.put('/', admin, auth, postCtrl.postReviews)

module.exports = router;