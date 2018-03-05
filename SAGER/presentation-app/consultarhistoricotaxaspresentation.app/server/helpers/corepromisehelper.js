const Client = require('node-rest-client').Client;
const util = require('../util');
const config = require('../config');

class CorePromiseHelper {

    getCorePromise(entityCore, filter) {

        var url = config.getCoreUrl(entityCore, filter);

        return new Promise((resolve, reject) => {
            let client = new Client();
            let request = client.get(url, function (data) {
                resolve(data);
            });
            request.on('error', function (err) {
                console.log('request error', err);
                reject(err);
            });
        });
    }

}

module.exports = CorePromiseHelper