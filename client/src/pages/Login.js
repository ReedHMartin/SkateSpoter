import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../Utils/mutations";
import { Form, Button } from "semantic-ui-react";
import "../components/Styles/login.css";
import Author from "../Utils/auth";

export default function Login() {
  const [loginInf, setLogin] = useState({
    email: "",
    password: "",
  });
  const [wrongOne, setWrongOne] = useState("");

  const [login, { error }] = useMutation(LOGIN);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...loginInf, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...loginInf },
      });
      if (data) {
        Author.login(data.login.token);
      }
    } catch (error) {
      console.error(error);
      setWrongOne("something is wrong");
    }

    console.log("Email:", loginInf.email, "Password:", loginInf.password);
  };

  return (
    <div>
      <h2 className="login1">Login</h2>
      <Form className="container" id="form" onSubmit={handleSubmit}>
        <Form.Field>
          <label>Email</label>
          <input
            name="email"
            type="text"
            value={loginInf.email}
            onChange={handleLoginChange}
            placeholder="Email"
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input
            name="password"
            type="password"
            value={loginInf.password}
            onChange={handleLoginChange}
            placeholder="Password"
          />
        </Form.Field>
        <Button disabled={!(loginInf.email && loginInf.password)} type="submit">
          Login
        </Button>
        {wrongOne && <h4>{wrongOne}</h4>}
      </Form>
    </div>
  );
}
