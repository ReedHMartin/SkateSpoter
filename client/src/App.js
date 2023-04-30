import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import Header from "./components/Header/Header";
import Navbar from "./components/Nav/Nav";
import Profile from "../src/components/UserProfile/UserProfile";
import SkateSpots from "./pages/SkateSpot";
import NewSkateSpot from "./pages/New";
import Login from "./pages/Login";
import Sign from "./pages/Signup";
import SingleSkate from "./components/Singleskate/Single";
// creates link using graphql uri
const httpLink = createHttpLink({
  uri: "/graphql",
});
// sets context gets id token from local storage
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});
// sets up in memory cahce concat httplink
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
// renders the app and sets up the rotues
function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />
        <Navbar />
        <Routes>
          <Route path={"/"} element={<SkateSpots />} />
          <Route path={"/profile"} element={<Profile />} />
          <Route path={"/skateSpots/:skateSpotId"} element={<SingleSkate />} />
          <Route path={"/newspot"} element={<NewSkateSpot />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/signup"} element={<Sign />} />
          <Route path={"*"} element={<h1>Nothing here</h1>} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
