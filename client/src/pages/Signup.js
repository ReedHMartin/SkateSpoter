import React, { useState } from "react";
import { emailAuth, userAuth } from "../Utils/helper";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../Utils/mutations";
import { Form, Button } from "semantic-ui-react";
import "../components/Styles/sign.css";
import Author from "../Utils/auth";
// sets signup email
export default function SignUpPage() {
  const [signupForm, setSignupForm] = useState({
    email: "",
    username: "",
    password: "",
  });
  // sets user as deafult empty
  const [wrongThree, setWrongThree] = useState("");
  // adds user mutation
  const [addUser, { error }] = useMutation(ADD_USER);
  // handles change
  const handleChanges = (e) => {
    const { name, value } = e.target;
    setSignupForm({ ...signupForm, [name]: value });
  };
  // handles submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // if email and username mathces regex, and a password is entered
    if (
      emailAuth(signupForm.email) &&
      userAuth(signupForm.username) &&
      signupForm.password
    ) {
      // is data and adds user from the sign up form, adds user token
      try {
        const { data } = await addUser({
          variables: { ...signupForm },
        });
        Author.login(data.addUser.token);
      } catch (error) {
        console.error(error);
        setWrongThree("something went wrong");
      }
    } else {
      setWrongThree(
        "your email or username may not be valid, email must be lowercase"
      );
    }
  };

  return (
    <>
      <div>
        <h2 className="join">Join and Find Your Perfect Spot</h2>
        <p className="high">
          Enter your nickname, email, and password to get started with us
        </p>
      </div>
      <div>
        <Form className="container" id="form" onSubmit={handleSubmit}>
          <Form.Field>
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={signupForm.username}
              onChange={handleChanges}
            />
          </Form.Field>
          <Form.Field>
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={signupForm.email}
              onChange={handleChanges}
            />
          </Form.Field>
          <Form.Field>
            <label>Email</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={signupForm.password}
              onChange={handleChanges}
            />
          </Form.Field>
          <Button
            disabled={
              !(signupForm.email && signupForm.password && signupForm.username)
            }
            type="submit"
          >
            Send It!
          </Button>
          {wrongThree && <h4>{wrongThree}</h4>}
        </Form>
      </div>
    </>
  );
}
