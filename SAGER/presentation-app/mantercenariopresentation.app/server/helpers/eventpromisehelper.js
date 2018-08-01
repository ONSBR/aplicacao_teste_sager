const Client = require('node-rest-client').Client;
const config = require('../config');

class EventPromiseHelper {

    putEventPromise(evento) {
        
        var url = 'http://event_manager:8081/sendevent';
        
        return new Promise((resolve, reject) => {
            let client = new Client();
            var args = { data: evento, headers: { "Content-Type": "application/json" } };
            let request = client.put(url, args, (result) => {
                console.log('evento enviado');
                console.log(evento);
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