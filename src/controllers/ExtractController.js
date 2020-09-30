const { extract, setSanitizeHtmlOptions } = require('article-parser');

module.exports = {
    async get(req, res) {
        try {
            const u = req.params.url;

            if (u) {
                var text = "";
                const url = decodeURIComponent(u);

                console.log(`:: extraindo noticia da url...`);

                const sanitizeHtmlOptions = {
                    allowedTags: [
                        'h1', 'h2', 'h3', 'h4', 'h5',
                        'u', 'b', 'i', 'em', 'strong',
                        'div', 'span', 'p', 'article', 'blockquote', 'section',
                        'pre', 'code',
                        'ul', 'ol', 'li', 'dd', 'dl',
                        'table', 'th', 'tr', 'td', 'thead', 'tbody', 'tfood',
                        'label',
                        'fieldset', 'legend',
                        //'img', 'picture',
                        'br', 'p', 'hr',
                        'a',
                    ],
                    allowedAttributes: {
                        a: ['href'],
                        // img: ['src', 'alt'],
                    },
                };
                setSanitizeHtmlOptions(sanitizeHtmlOptions);

                await extract(url).then((article) => {
                    console.log(`:: texto extraido com sucesso...`);
                    text = article;
                }).catch((err) => {
                    console.log(`:: erro ao extrair noticia da url...`);
                });

                return res.json({ text });
            } else {
                return res.status(400).json({ erros: "url para extracao invalida" });
            }
        } catch (err) {
            console.log(err);
            return res.status(400).json({ erros: "ErrorCatch" });
        }
    }
};