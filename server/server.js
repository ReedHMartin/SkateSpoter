const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const { authMiddleware } = require("./utils/auth");
const { typeDefs, resolvers } = require("./Schemas");
const db = require("./config/config");
const ap = express();
const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

ap.use(express.urlencoded({ extended: false }));
ap.use(express.json());

if (process.env.NODE_ENV === "production") {
  ap.use(express.static(path.join(__dirname, "../client/build")));
}

ap.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

const apolloServerRun = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app: ap });
  db.once("open", () => {
    ap.listen(PORT, () => {
      console.log(`API on ${PORT}`);
      console.log(`GraphQl on http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
};

apolloServerRun(typeDefs, resolvers);
