import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../Utils/mutations";
import Author from "../Utils/auth";

export default function Login() {
  const [loginInf, setLogin] = useState({
    username: "",
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

    console.log("Username:", loginInf.username, "Password:", loginInf.password);
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            name="username"
            type="text"
            value={loginInf.username}
            onChange={handleLoginChange}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            name="password"
            type="password"
            value={loginInf.password}
            onChange={handleLoginChange}
          />
        </label>
        <br />
        <button
          disabled={!(loginInf.username && loginInf.password)}
          type="submit"
        >
          Login
        </button>
        {wrongOne && <h4>{wrongOne}</h4>}
      </form>
    </div>
  );
}
