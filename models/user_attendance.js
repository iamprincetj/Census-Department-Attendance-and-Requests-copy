const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        minlength: 3,
    },
    time: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    posting: {
        type: String,
        required: true,
    },
    long: {
        type: Number,
        required: true,
    },
    lat: {
        type: Number,
        required: true,
    },
});

userSchema.set('toJSON', {
    transform: (document, returnedJson) => {
        returnedJson.id = returnedJson._id.toString();
        delete returnedJson._id;
        delete returnedJson.__v;
    },
});

const UserAttendance = mongoose.model('user_attendance', userSchema);

module.exports = UserAttendance;
