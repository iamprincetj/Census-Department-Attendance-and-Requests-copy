const mongoose = require('mongoose');

const mailSchema = new mongoose.Schema({
    referenceId: {
        type: String,
        required: true,
        minlength: 3,
    },
    department: {
        type: String,
        required: true,
        minlength: 3,
    },
    receiptDate: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        minlength: 3,
    },
    request: {
        type: String,
        required: true,
        minlength: 5,
    },
    sender: {
        type: String,
        required: true,
        minlength: 5,
    },
    mailDate: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
});

mailSchema.set('toJSON', {
    transform: (document, returnedJson) => {
        returnedJson.id = returnedJson._id.toString();
        delete returnedJson._id;
        delete returnedJson.__v;
    },
});

const Mail = mongoose.model('mail', mailSchema);

module.exports = Mail;
