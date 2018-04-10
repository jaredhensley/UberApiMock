const assert = require('assert');
const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
const Driver = mongoose.model('driver');

describe('Drivers controller', () => {
    it('Post to /api/drivers creates a new driver', (done) => {
        Driver.count().then((count) => {
            request(app)
                .post('/api/drivers')
                .send({ email: 'test@test.com' })
                .end((err, response) => {
                    Driver.count().then((newCount) => {
                        assert(count + 1 === newCount);
                        done();
                    });
                    
                });
        })
        .catch((err) => {
            console.log(err);
        })
    });

    it('PUT to /api/drivers/id edits an existing driver', (done) => {
        // create edit read assert
        const driver = new Driver({ email: 't@t.com', driving: false});
        driver.save().then(() => {
            request(app)
                .put('/api/drivers/' + driver._id)
                .send({ driving: true })
                .end(() => {
                    Driver.findOne({ email: 't@t.com' })
                        .then(driver => {
                            console.log(driver);
                            assert(driver.driving === true);
                            done();
                        })
                })
        });
    });
});