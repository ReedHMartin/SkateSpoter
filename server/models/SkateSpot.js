const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const spotSchema = new Schema({
    location: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        unique: true,
        required: true,
    },
    lighting: {
        type: Number,
        maxlength: 10,
    },
    police_presence: {
        type: Array,
        anyOf: [
            ["Red"],
            ["Yellow"],
            ["Green"]
        ]
    },
    pedestrians: {
        type: Number,
        maxlength: 10,
    },
    typeOf: {
        type: String,
        maxlength: 50,
    }
})