const axios = require('axios')

module.exports = {
    async show(req, res){
        try {
            
            const stringDeBusca = req.params.q

            if (stringDeBusca.length < 2)
                return res.status(400).json({erros: "string de busca invalida" })

            console.log(`:: coletando noticias no gnews...`)

            const url_gnews = `https://gnews.io/api/v4/search?q=${stringDeBusca}&token=${process.env.GNEWS_TOKEN}`
            const requestGNews = await axios.get(url_gnews)
            
            console.log(` : request GNews ok!`)

            res.json(requestGNews.data)

        } catch (err) {
            console.log(err)
            return res.status(400).json({erros: "ErrorCatch" })
        }
    }
}
