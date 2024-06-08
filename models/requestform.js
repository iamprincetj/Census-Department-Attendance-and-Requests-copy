const mongoose = require('mongoose');

const requestDataSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        minlength: 5,
    },
    phoneNumber: {
        type: String,
        required: true,
        minlength: 11,
    },
    address: {
        type: String,
        required: true,
        minlength: 5,
    },
    email: {
        type: String,
        required: true,
        minlength: 11,
    },
    state: {
        type: String,
        required: true,
        minlength: 5,
    },
    LGA: {
        type: String,
        required: true,
        minlength: 5,
    },
    date: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        minlength: 5,
    },
    gender: {
        type: String,
        required: true,
        minlength: 4,
    },
    userRequest: {
        type: String,
        required: true,
        minlength: 10,
    },
});

requestDataSchema.set('toJSON', {
    transform: (document, returnedJson) => {
        returnedJson.id = returnedJson._id.toString();
        delete returnedJson._id;
        delete returnedJson.__v;
    },
});

const RequestData = mongoose.model('request', requestDataSchema);

module.exports = RequestData;
