const SummaryTool = require('node-summary');

module.exports = {
    async do(req, res) {
        
        try {

            console.log(`:: endpoint de resumo...`);

            if(!(req.body.text))
                return res.status(400).json({ erros: "nao foi possivel obter o texto do body da requisicao" })

            let text = req.body.text;
            text = decodeURIComponent(text);

            let resumo = undefined;
            let erro = undefined;

            await SummaryTool.summarize(null, text, (err, summary) => {
                if (err) {
                    erro = err;
                    console.log(":: Deu algo errado", err);
                }
                console.log(`:: Resumido com sucesso...`);

                resumo = summary;

                console.log("Original Length " + text.length);
                console.log("Summary Length " + summary.length);
                console.log("Summary Ratio: " + (100 - (100 * (summary.length / (text.length)))));
            });

            if (resumo) {
                res.json({ text: resumo });
            } else {
                return res.status(400).json({ erros: "erro ao gerar resumo: " + erro })
            }

        } catch (err) {
            console.log(err)
            return res.status(400).json({ erros: "ErrorCatch" });
        }
    }
};