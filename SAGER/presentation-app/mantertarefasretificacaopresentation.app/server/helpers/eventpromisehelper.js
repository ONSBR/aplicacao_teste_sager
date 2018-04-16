const Client = require('node-rest-client').Client;
const util = require('../util');
const config = require('../config');

class EventPromiseHelper {

    putEventPromise(evento) {
        
        var url = config.getEventManagerUrl();
        
        return new Promise((resolve, reject) => {
            let client = new Client();
            var args = { data: evento, headers: { "Content-Type": "application/json" } };
            let request = client.put(url, args, (result) => {
                console.log('evento enviado');
                resolve();
            });
            request.on('error', function (err) {
                console.log('request error', err);
                reject(err);
            });
        });
    }

}

module.exports = EventPromiseHelper