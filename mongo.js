/* eslint-disable no-undef */
const mongoose = require('mongoose');

if (process.argv.length < 5) {
    console.log('input should be : node <filename> <yourpassword> <yourname> <yournumber>');
    process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];
//const url = `mongodb+srv://princetj:${password}@cluster0.mt7dkux.mongodb.net/noteApp?retryWrites=true&w=majority`
const url = `mongodb://localhost/${password}`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const noteScheme = new mongoose.Schema({
    content: String,
    important: Boolean,
});

const Note = mongoose.model('Note', noteScheme);

const note = new Note({
    content: name,
    important: number,
});

note.save().then(result => {
    console.log(result);
    mongoose.connection.close();
});


/*Note.find({content: name}).then(result => {
    result.forEach((val) => {
        console.log(val)
    })

    mongoose.connection.close()
})*/