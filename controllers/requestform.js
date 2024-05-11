const requestDataRouter = require('express').Router()
const RequestData = require('../models/requestform')


requestDataRouter.post('/', async (request, response) => {
    const { fullname, phoneNumber, address, email, state, LGA, date, timeline, gender, time, user_request } = request.body

    const dateTransform = new Date(date+ ' '+ time)

    const requestData = new RequestData({
        fullname,
        phoneNumber,
        email,
        address,
        state,
        LGA,
        timeline,
        gender,
        date: dateTransform.toDateString(),
        time: dateTransform.toTimeString(),
        user_request
    })

    const savedRequest = await requestData.save()
    response.status(201).json(savedRequest)
})


module.exports = requestDataRouter