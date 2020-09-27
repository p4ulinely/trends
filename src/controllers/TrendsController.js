const twitter = require('twitter-lite')

const client = new twitter({
    subdomain: "api", // "api" is the default (change for other subdomains)
    version: "1.1", // version "1.1" is the default (change for other subdomains)
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
})

module.exports = {
    async index(req, res){
        try {
            
            const regiao = req.params.regiao || 1

            /*
            * TRENDS TWITTER
            */
            console.log(":: coletando trends do twitter...")

            woeidRegiao = {
                1: 23424768, // brazil
                2: 455827, // sao paulo
                3: 455825, // rio de janeiro
                4: 455824 // recife
            }

            const woeid = woeidRegiao[regiao]

            const requestTwitter = await client.get("trends/place", {
                id: woeid
            })

            console.log(" : request twitter ok!")
            
            let meusTrends = []
            const trendsTwitter = requestTwitter[0].trends

            console.log(":: concatenando trends...")

            for (const item of trendsTwitter) {
                meusTrends.push({
                    nome: item.name,
                    query: item.query,
                    url: item.url,
                    fonte: "twitter"
                })
            }

            /*
            * TRENDS YOUTUBE
            */

            return res.json(meusTrends)

        } catch(err) {
            console.log(err)
            return res.status(400).json({err: "ErrorCatch" })
        }
    }
}