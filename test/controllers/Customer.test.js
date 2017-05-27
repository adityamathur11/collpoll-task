process.env.NODE_ENV = 'test';

var chai = require('chai')
    , app = require('../../App')
    , request = require('supertest')
    , expect = chai.expect
    , mock = require('mock-fs')
    , config = require('config');


describe('customer test cases', function () {
    describe('Successful response cases', function () {
        it('valid input file', function (done) {
            mock({
                "public": {
                    "Customer-test.json": '{"customers":[{"name":"Mohamed Coughran","id":"SyygNGLZZ","latitude":"12.9350911463","longitude":"77.61441"},{"name":"Mohamed Coughran","id":"Skl1lNf8W-","latitude":"12.9350440664","longitude":"77.61417"},{"name":"Dick Plaxico","id":"H1MryxEzIW-","latitude":67.49262,"longitude":-141.31679}]}'
                }
            });
            request(app)
                .get("/nearByUsers")
                .end(function (err, res) {
                    if (err) throw err;
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.deep.equal({
                        customers: [
                            {
                                name: 'Mohamed Coughran',
                                id: 'Skl1lNf8W-',
                                distance: 12.127576526023072
                            },
                            {
                                name: 'Mohamed Coughran',
                                id: 'SyygNGLZZ',
                                distance: 14.511767045147835
                            }]
                    });
                    done();
                    mock.restore();
                });


        });
    });
    it('empty input file', function (done) {
        mock({
            "public": {
                "Customer-test.json": ''
            }
        });
        request(app)
            .get("/nearByUsers")
            .end(function (err, res) {
                if (err) throw err;
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.deep.equal({customers: []});
                done();
                mock.restore();
            });
    });
    it('no user in radius', function (done) {
        mock({
            "public": {
                "Customer-test.json": '{"customers":[{"name":"Gwyneth Gervase","id":"rJ-41gVzLZb","latitude":48.77785,"longitude":-22.81186},{"name":"Gwyneth Gervase","id":"SJGEJlEGIWW","latitude":-137.56175,"longitude":97.89515}]}'
            }
        });
        request(app)
            .get("/nearByUsers")
            .end(function (err, res) {
                if (err) throw err;
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.deep.equal({customers: []});
                done();
                mock.restore();
            });
    });
});
describe('500 response cases', function () {
    it('invalid json file', function (done) {
        mock({
            "public": {
                "Customer-test.json": "sample"
            }
        });
        request(app)
            .get("/nearByUsers")
            .end(function (err, res) {
                if (err) throw err;
                // expect(res.body).to.deep.equal({error: 'Internal server error'});
                expect(res.statusCode).to.equal(500);
                done();
                mock.restore();
            });
    });
    it('file not found', function (done) {
        mock({
            "public": {}
        });
        request(app)
            .get("/nearByUsers")
            .end(function (err, res) {
                if (err) throw err;
                expect(res.body).to.deep.equal({error: 'Internal server error'});
                expect(res.statusCode).to.equal(500);
                done();
                mock.restore();
            });
    });
});