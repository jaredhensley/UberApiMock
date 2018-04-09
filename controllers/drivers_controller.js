const Driver = require('../models/driver');

module.exports = {
    greeting(req, res) {
        res.send({ hi: 'there' });
    },
    create(req, res) {
        const driverProps = req.body;
        Driver.create(driverProps)
            .then(driver => res.status(201).send(driver))
            .catch(err => res.status(500).send(err));
    }
}