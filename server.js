const express = require('express')
require("dotenv-safe").config()

//iniciando
const app = express()
app.use(express.json())

//rotas
app.get('/', (req, res) => {
	res.json({api: "meus-trends-v1"})
})
app.use('/v1', require('./src/routes/routes'))


//porta
app.listen(process.env.PORT || 8000, () => {
	console.log('Server is On (8000)!');
})