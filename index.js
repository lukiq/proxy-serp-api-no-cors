const axios = require('axios');


const htmlparser2 = require("htmlparser2");

const parser = new htmlparser2.Parser({
    onopentag(name, attributes) {
        if (name === "img") {
            console.log(attributes, name);
        }
    },
});


const config = {
    method: 'GET',
    url: 'https://demo-detect-troll-images.glitch.me/',
    headers: {}
};

axios(config)
    .then(function(response) {
        parser.write(response.data);
        parser.end();

    })
    .catch(function(error) {
        console.log(error);
    });