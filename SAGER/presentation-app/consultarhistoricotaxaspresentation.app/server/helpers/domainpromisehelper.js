const Client = require('node-rest-client').Client;
const util = require('../util');

class DomainPromiseHelper {

    getDomainPromise(url) {
        return new Promise((resolve, reject) => {
            let client = new Client();
            let args = {headers: {'Branch': 'All'}};
            let request = client.get(url, args, function (data) {
                resolve(data);
            });
            request.on('error', function (err) {
                console.log('request error', err);
                reject(err);
            });
        });
    }

}

module.exports = DomainPromiseHelper