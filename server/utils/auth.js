const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET;
const expiration = "2h";

module.exports = {
  authMiddleware: function ({ req }) {
    // lets token be a body, a query, and headers
    let token = req.body.token || req.query.token || req.headers.authorization;
    //  if it headers split at space and returns the token
    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    if (!token) {
      return req;
    }
    //  verifys the token, secret, and maxage
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log("Invalid token");
    }

    return req;
  },
  // returns payload if token is valid.
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
