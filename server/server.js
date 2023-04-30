const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const { authMiddleware } = require("./utils/auth");
const { typeDefs, resolvers } = require("./Schemas");
const db = require("./config/config");
const ap = express();
const PORT = process.env.PORT || 3001;
// sets up apollo server using tyepdefs, resolvers and the auth middlewear
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});
// uses urlencoded false
ap.use(express.urlencoded({ extended: false }));
// uses express.json
ap.use(express.json());
// if node is production sets up the path from the client build
if (process.env.NODE_ENV === "production") {
  ap.use(express.static(path.join(__dirname, "../client/build")));
}
// gets pages
ap.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});
// runs the apollo server and opens connection to the database
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
