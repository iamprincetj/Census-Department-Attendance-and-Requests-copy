const mongoose = require('mongoose');

const userTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
});

userTokenSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

const UserToken = mongoose.model('UserToken', userTokenSchema);

module.exports = UserToken;
