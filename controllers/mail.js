const mailRouter = require('express').Router()


mailRouter.post('/', async (request, response) => {
    const { referenceId, department, filename, category, state, LGA, mailTopic, date, time } = request.body

    console.log(request.body)
})

module.exports = mailRouter