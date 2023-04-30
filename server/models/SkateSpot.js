const mongoose = require("mongoose");
const { Schema, model } = mongoose;
// sets up skatespots schemas

const spotSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
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
    anyOf: [["Red"], ["Yellow"], ["Green"]],
  },
  pedestrians: {
    type: Number,
    maxlength: 10,
  },
  typeOf: {
    type: String,
    maxlength: 50,
  },
});

const skateSpot = model("skateSpot", spotSchema);

module.exports = skateSpot;
