const { User, skateSpot } = require("./models");
const { signToken, authMiddleware } = require("./utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return await User.find();
    },
    user: async (parent, { username }) => {
      return await User.findOne({ username });
    },
    skateSpots: async () => {
      return await skateSpot.find();
    },
    skateSpot: async (parent, { name }) => {
      return await skateSpot.findOne({ name });
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
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
    addSkateSpot: async (parent, { location, name, lighting, police_presence, pedestrians, typeOf }, context) => {
      if (context.user) {
        const newSkateSpot = await skateSpot.create({ location, name, lighting, police_presence, pedestrians, typeOf });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { skateSpot: newSkateSpot._id } },
          { new: true }
        );

        return newSkateSpot;
      }
      throw new Error("You must be logged in to add a skate spot.");
    },
  },
};

module.exports = resolvers;
