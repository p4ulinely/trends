const express = require('express')
const router = express.Router()
const verificacao = require('./../middlewares/auth')

const TrendsController = require('./../controllers/TrendsController')
const NewsController = require('./../controllers/NewsController')
const ExtractController = require('./../controllers/ExtractController')
const SummaryController = require('./../controllers/SummaryController')


router.get('/trends/:regiao?', verificacao, TrendsController.index)
router.get('/gnews/:q', verificacao, NewsController.show)
router.post('/extract/', verificacao, ExtractController.get)
router.post('/summary/', verificacao, SummaryController.do)

module.exports = router