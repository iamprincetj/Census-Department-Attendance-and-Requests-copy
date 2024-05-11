const mongoose = require('mongoose')

const requestDataSchema = new mongoose.Schema({
    fullname: String,
    phoneNumber: String,
    address: String,
    email: String,
    state: String,
    LGA: String,
    date: String,
    time: String,
    timeline: String,
    gender: String,
    user_request: String
})

requestDataSchema.set('toJSON', {
    transform: (document, returnedJson) => {
        returnedJson.id = returnedJson._id.toString()
        delete returnedJson._id
        delete returnedJson.__v
    }
})

const RequestData = mongoose.model('request', requestDataSchema)

module.exports = RequestData