const DomainPromiseHelper = require('../../helpers/domainpromisehelper');

describe('domainpromisehelperspec deve:', function () {

    it('Gerar uma promise para realizar um get:', (done) => {
        let domainPromiseHelper = new DomainPromiseHelper();
        let promise = domainPromiseHelper.getDomainPromise('urlTeste');

        expect(promise).toBeDefined();
        promise.catch(error => {
            expect(error).toBeDefined();
            done();
        });
    });

    it('Gerar uma promise para realizar um post:', () => {
        let domainPromiseHelper = new DomainPromiseHelper();
        let promise = domainPromiseHelper.postDomainPromise('urlTeste');

        expect(promise).toBeDefined();
        promise.catch(error => {
            expect(error).toBeDefined();
            done();
        });
    });

});



