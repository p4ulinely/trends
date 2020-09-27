const express = require('express')
const router = express.Router()
const verificacao = require('./../middlewares/auth')

const TrendsController = require('./../controllers/TrendsController')
const NewsController = require('./../controllers/NewsController')


router.get('/trends/:regiao?', verificacao, TrendsController.index)
router.get('/gnews/:q', verificacao, NewsController.show)

module.exports = router