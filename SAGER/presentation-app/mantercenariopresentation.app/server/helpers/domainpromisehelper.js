const Client = require('node-rest-client').Client;

class DomainPromiseHelper {

    getDomainPromise(url) {
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

    postDomainPromise(url, data) {
        return new Promise((resolve, reject) => {
            let client = new Client();
            var args = {
                data: data,
                headers: { "Content-Type": "application/json" }
            };
            let request = client.post(url, args, function (result) {
                resolve(result);
            });
            request.on('error', function (err) {
                console.log('request error', err);
                reject(err);
            });
        });
    }

}

module.exports = DomainPromiseHelper