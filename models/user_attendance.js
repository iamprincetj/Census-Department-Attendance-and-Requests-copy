const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullname: String,
    time: String,
    date: String,
    posting: String,
    long: Number,
    lat: Number
})

userSchema.set('toJSON', {
    transform: (document, returnedJson) => {
        returnedJson.id = returnedJson._id.toString()
        delete returnedJson._id
        delete returnedJson.__v
    }
})

const UserAttendance = mongoose.model('user_attendance', userSchema)


module.exports = UserAttendance