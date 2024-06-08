const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
    },

    passwordChanged: {
        type: Boolean,
        default: false,
    },
});

adminSchema.set('toJSON', {
    transform: (document, returnedJson) => {
        returnedJson.id = returnedJson._id.toString();
        delete returnedJson._id;
        delete returnedJson.__v;
    },
});

const Admin = mongoose.model('admin', adminSchema);

module.exports = Admin;
