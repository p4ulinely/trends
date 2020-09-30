const express = require('express')
const router = express.Router()
const verificacao = require('./../middlewares/auth')

const TrendsController = require('./../controllers/TrendsController')
const NewsController = require('./../controllers/NewsController')
const ExtractController = require('./../controllers/ExtractController')


router.get('/trends/:regiao?', verificacao, TrendsController.index)
router.get('/gnews/:q', verificacao, NewsController.show)
router.get('/extract/:url', verificacao, ExtractController.get)

module.exports = router