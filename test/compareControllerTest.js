// /questionnaire-sets
url = serviceConfig.prefix + routing.compare;
describe(url, function() {

    it('GET ', (done) => {
        chai.request(server).get(url).end((err, res) => {
            expect(res).have.status(200);
            done()
        });
    });

    it('OPTIONS ', (done) => {
        chai.request(server).options(url).end((err, res) => {
            expect(res).have.status(200);
            done()
        });
    });

    it('POST with empty body', (done) => {
        chai.request(server).post(url).set('content-type', 'application/json').send(postBody).end((err, res) => {
            expect(res).have.status(200);
            expect(res.body).have.property("Specification");
            done()
        });
    });
});