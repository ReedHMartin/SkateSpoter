const { AuthenticationError } = require("apollo-server-express");
const { User, skateSpot } = require("../models");
const { signToken } = require("../utils/auth");
// resolvers
const resolvers = {
  Query: {
    // finds one user by their user id if they are logged in, populates skatespot, if not logged in through error
    user: async (parent, args, context) => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id }).populate(
          "skateSpot"
        );
      }
      throw new AuthenticationError("please login");
    },
    // finds all skatespots and populates user id
    skateSpots: async () => {
      return await skateSpot.find().populate("userId");
    },
    // finds a skatespot by skatespoid and populates user id
    skateSpot: async (parent, { skateSpotId }) => {
      return await skateSpot.findOne({ _id: skateSpotId }).populate("userId");
    },
  },

  Mutation: {
    // creates user with username, email, password, gives user a token, returns the token and user
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);

      if (!user) {
        throw new AuthenticationError("error");
      }
      return { token, user };
    },
    // finds user by email, if correct, checks password and returns token
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error("Incorrect email or password");
      }

      const correctPassword = await user.isCorrectPassword(password);

      if (!correctPassword) {
        throw new Error("Incorrect email or password");
      }

      const token = signToken(user);
      return { token, user };
    },
    // addSkateSpots with info, if the user is logged in, it creates skatespot, then gets skatespot by user id and updates skatespot.
    addSkateSpot: async (
      parent,
      {
        userId,
        location,
        name,
        lighting,
        police_presence,
        pedestrians,
        typeOf,
      },
      context
    ) => {
      if (context.user) {
        const newSkateSpot = await skateSpot.create({
          userId,
          location,
          name,
          lighting,
          police_presence,
          pedestrians,
          typeOf,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { skateSpot: newSkateSpot._id } },
          { new: true }
        );

        return newSkateSpot;
      }
      throw new Error("You must be logged in to add a skate spot.");
    },
    // deletes skatespot and pulls skate spot from the user with the user id
    deleteSkateSpot: async (parent, { skateSpotId }, context) => {
      if (context.user) {
        const skateSpotdelete = await skateSpot.findOneAndDelete({
          _id: skateSpotId,
        });
        await User.findOneAndUpdate(
          { id: context.user._id },
          { $pull: { skateSpots: skateSpotdelete._id } }
        );
        return User;
      }
    },
  },
};

module.exports = resolvers;
