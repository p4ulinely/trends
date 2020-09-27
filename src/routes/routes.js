const express = require('express')
const router = express.Router()
const verificacao = require('./../middlewares/auth')

const TrendsController = require('./../controllers/TrendsController')

router.get('/trends/:regiao?', verificacao, TrendsController.index)

module.exports = router