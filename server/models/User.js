const mongoose = require("mongoose");

const { Schema } = mongoose;
const bcrypt = require("bcrypt");
// sets up user schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  skateSpot: [
    {
      type: Schema.Types.ObjectId,
      ref: "skateSpot",
    },
  ],
});

userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
