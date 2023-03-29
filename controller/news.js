const News = require('../news/news')
const ImageProcess = require('../util/handleImage')
const news = new News()
const createNews = async (req, res) => {
  const id = news.createId()
  try {
    const imageName = await ImageProcess(req, id)
    news.create(req.body, id, imageName)
    res.json({ success: true, message: 'Post created successfully !!' })
  } catch (error) {
    res.json({
      success: false,
      message: 'Something went wrong, server error !!',
    })
  }
}
const getAllNews = async (req, res) => {
  try {
    const data = await news.getAll()
    res.json({ success: true, news: data })
  } catch (error) {
    res.json({
      success: false,
      message: 'Something went wrong, server error !!',
    })
  }
}
const getSingleNews = async (req, res) => {
  try {
    const data = await news.getSingle(req.params.id)
    res.json({ success: true, news: data })
  } catch (error) {
    res.json({
      success: false,
      message: 'Something went wrong, server error !!',
    })
  }
}
const getByCategory = async (req, res) => {
  const { cate, qty } = req.params
  try {
    const data = await news.getByCategory(cate)
    if (!data) {
      return res.json({ success: false, message: 'Posts not found!' })
    }
    if (qty) {
      return res.json({ success: true, news: [...data].splice(0, qty) })
    }
    return res.json({ success: true, news: data })
  } catch (error) {
    res.json({
      success: false,
      message: 'Something went wrong, server error !!',
    })
  }
}
const searchPosts = async (req, res) => {
  try {
    const { query } = req.params
    if (query.trim()) {
      const response = await news.searchPosts(req.params.query)
      if (response.length === 0)
        return res.json({ success: false, message: 'No match found..' })
      res.json({ success: true, news: response })
    }
  } catch (error) {
    res.json({
      success: false,
      message: 'Something went wrong, server error !!',
    })
  }
}
module.exports = {
  createNews,
  getAllNews,
  getSingleNews,
  getByCategory,
  searchPosts,
}
