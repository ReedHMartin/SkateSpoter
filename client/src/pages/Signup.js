import React, { useState } from "react";
import { emailAuth, userAuth } from "../Utils/helper";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../Utils/mutations";
import Author from "../Utils/auth";

export default function SignUpPage() {
  const [signupForm, setSignupForm] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [wrongThree, setWrongThree] = useState("");
  const [addUser, { error }] = useMutation(ADD_USER);

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setSignupForm({ ...signupForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      emailAuth(signupForm.email) &&
      userAuth(signupForm.username) &&
      signupForm.password
    ) {
      console.log(signupForm);
      console.log("New User made successfully!!");
      try {
        const { data } = await addUser({
          variables: { ...signupForm },
        });
        Author.login(data.createUser.token);
      } catch (error) {
        console.error(error);
        setWrongThree("something went wrong");
      }
    } else {
      setWrongThree("your email or username may not be valid");
    }
  };

  return (
    <>
      <div>
        <h2>Join and Find your Perfect Spot</h2>
        <p>Enter your nickname, email, and password to get started with us</p>
      </div>
      <div>
        <form id="signupForm" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={signupForm.username}
            onChange={handleChanges}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={signupForm.email}
            onChange={handleChanges}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={signupForm.password}
            onChange={handleChanges}
          />
          <button
            disabled={
              !(signupForm.email && signupForm.password && signupForm.username)
            }
            type="submit"
          >
            Send it!
          </button>
        </form>
        {wrongThree && <h4>{wrongThree}</h4>}
      </div>
    </>
  );
}
