const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
    },
    passwordHash: {
        type: String,
        required: true,
        minlength: 5,
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
