const axios = require('axios');
const htmlparser2 = require("htmlparser2");



// const config = {
//     method: 'GET',
//     url: 'https://demo-detect-troll-images.glitch.me/',
//     headers: {}
// };

var routes = function(app, request) {
    

    app.options('/*', function(req, res) {
        res.status(200);
        res.send({});
    });

    app.get('/content_images', async (req, res) => {
        let respArray = []

let parser = new htmlparser2.Parser({
    onopentag(name, attributes) {
        if (name === "img" && attributes.src) {
            respArray.push(attributes)
        }
    },
});
        
        let config = {
            method: 'GET',
            url: req.query.url,
            headers: {}
        }
        

        
        try {
           const response = await axios(config)
           parser.write(response.data);
           parser.end();
           res.send(respArray)
            
        } catch (error) {
            console.log(error);
            
        }
            // .then(function(response) {
            // })
            // .catch(function(error) {
            // });
    });

    app.get('/*', function(req, res) {

        var esc = encodeURIComponent
        var query = Object.keys(req.query)
            .map(k => esc(k) + '=' + esc(req.query[k]))
            .join('&')

        var options = {
            method: 'GET',
            url: 'https://serpapi.com/search.json' + req.path + (query ? '?' : '') + query,
            headers: {
                'Authorization': req.header('Authorization'),
                'X-API-Version': req.header('X-API-Version') ? req.header('X-API-Version') : 2,
                'X-Application': 'Proxy-Powered-By-LiveChat-L2-Team'
            }
        };

        request(options, function(error, response, body) {
            res.status(response.statusCode);
            res.set('Content-Type', response.headers['content-type']);
            res.send(error ? error : body);
        });
    });

    app.post('/*', function(req, res) {

        var query = Object.keys(req.query)
            .map(k => esc(k) + '=' + esc(req.query[k]))
            .join('&')

        var options = {
            method: 'POST',
            url: 'https://serpapi.com/search.json' + req.path + (query ? '?' : '') + query,
            headers: {
                'Authorization': req.header('Authorization'),
                'X-API-Version': req.header('X-API-Version') ? req.header('X-API-Version') : 2,
                'X-Application': 'Proxy-Powered-By-LiveChat-L2-Team'
            }
        };

        if (req.header('content-type') == 'application/json') {
            options.json = true;
            options.body = req.body;
        } else if (req.header('content-type') == 'application/x-www-form-urlencoded') {
            options.headers['content-type'] = 'application/x-www-form-urlencoded';
            options.form = req.body;
        } else {
            res.status(400);
            res.set('Content-Type', 'application/json');
            res.send({ error: 'bad request' });
            return;
        }

        request(options, function(error, response, body) {
            res.status(response.statusCode);
            res.set('Content-Type', response.headers['content-type']);
            res.send(error ? error : body);
        });

    });


    app.put('/*', function(req, res) {

        var query = Object.keys(req.query)
            .map(k => esc(k) + '=' + esc(req.query[k]))
            .join('&')

        var options = {
            method: 'PUT',
            url: 'https://serpapi.com/search.json' + req.path + (query ? '?' : '') + query,
            headers: {
                'Authorization': req.header('Authorization'),
                'X-API-Version': req.header('X-API-Version') ? req.header('X-API-Version') : 2,
                'X-Application': 'Proxy-Powered-By-LiveChat-L2-Team'
            }
        };

        if (req.header('content-type') == 'application/json') {
            options.json = true;
            options.body = req.body;
        } else if (req.header('content-type') == 'application/x-www-form-urlencoded') {
            options.headers['content-type'] = 'application/x-www-form-urlencoded';
            options.form = req.body;
        } else {
            res.status(400);
            res.set('Content-Type', 'application/json');
            res.send({ error: 'bad request' });
            return;
        }

        request(options, function(error, response, body) {
            res.status(response.statusCode);
            res.set('Content-Type', response.headers['content-type']);
            res.send(error ? error : body);
        });

    });

    app.delete('/*', function(req, res) {

        var esc = encodeURIComponent
        var query = Object.keys(req.query)
            .map(k => esc(k) + '=' + esc(req.query[k]))
            .join('&')

        var options = {
            method: 'DELETE',
            url: 'https://serpapi.com/search.json' + req.path + (query ? '?' : '') + query,
            headers: {
                'Authorization': req.header('Authorization'),
                'X-API-Version': req.header('X-API-Version') ? req.header('X-API-Version') : 2,
                'X-Application': 'Proxy-Powered-By-LiveChat-L2-Team'
            }
        };

        request(options, function(error, response, body) {
            res.status(response.statusCode);
            res.set('Content-Type', response.headers['content-type']);
            res.send(error ? error : body);
        });
    });

};

module.exports = routes;