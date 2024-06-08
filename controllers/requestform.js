const requestDataRouter = require('express').Router();
const RequestData = require('../models/requestform');

requestDataRouter.get('/', async (request, response) => {
    const requests = await RequestData.find({});
    response.json(requests);
});

requestDataRouter.post('/', async (request, response) => {
    const {
        fullname,
        phoneNumber,
        address,
        email,
        state,
        LGA,
        date,
        status,
        gender,
        time,
        userRequest,
    } = request.body;

    const dateTransform = new Date(date + ' ' + time);
    try {
        const requestData = new RequestData({
            fullname,
            phoneNumber,
            email,
            address,
            state,
            LGA,
            status,
            gender,
            date: dateTransform.toDateString(),
            time: dateTransform.toTimeString(),
            userRequest,
        });

        const savedRequest = await requestData.save();
        response.status(201).json(savedRequest);
    } catch (error) {
        if (error.name === 'ValidationError') {
            response.status(400).json({ error: error.message });
        }
    }
});

module.exports = requestDataRouter;
