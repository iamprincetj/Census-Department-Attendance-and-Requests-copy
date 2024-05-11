const mongoose = require('mongoose')


const mailSchema = new mongoose.Schema({
    referenceId: String,
    department: String,
    filename: String,
    category: String,
    state: String,
    LGA: String,
    mailTopic: String,
    date: String,
    time: String
})

mailSchema.set('toJSON', {
    transform: (document, returnedJson) => {
        returnedJson.id = returnedJson._id.toString()
        delete returnedJson._id
        delete returnedJson.__v
    }
})

const Mail = mongoose.model('mail', mailSchema)

module.exports = Mail