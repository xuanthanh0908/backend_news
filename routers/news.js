const express = require('express')
const router = express.Router()
const upload = require('../middleware/multer')
const {
  createNews,
  getAllNews,
  getSingleNews,
  getByCategory,
  searchPosts,
} = require('../controller/news')
const { validator, result, ValidateFile } = require('../middleware/validator')

router.post(
  '/create',
  upload.single('thumbnail'),
  validator,
  result,
  ValidateFile,
  createNews,
)
router.get('/news', getAllNews)
router.get('/news/single/:id', getSingleNews)
router.get('/news/:cate', getByCategory)
router.get('/news/:cate/:qty', getByCategory)
router.post('/news/search/:query', searchPosts)
module.exports = router
