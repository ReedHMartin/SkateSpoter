import React, { useState } from "react";

export default 
    function SignUpPage() {
      const [username, setUsername] = useState("")
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      
      const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
      }
      
      const validateUsername = (username) => {
        const regex = /^[a-zA-Z0-9]+$/;
        return regex.test(username);
      }

      const handleUsernameChange = (e) => {
        setUsername(e.target.value);
      }
    
      const handleEmailChange = (e) => {
        setEmail(e.target.value);
      }
    
      const handlePasswordChange = (e) => {
        setPassword(e.target.value);
      }
    
      const handleSubmit = (e) => {
        if(validateEmail && validateUsername == true){
          console.log('New User made successfully!!');

          e.preventDefault();}
      }
    
      return (
        <><div>
          <h2>Join and Find your Perfect Spot</h2>
          <p>Enter your nickname, email, and password to get started with us</p>
        </div>
        <div>
            <form id="signupForm" onSubmit={handleSubmit}>
              <input type="text" name="username "placeholder="Username" value={username} onChange={handleUsernameChange} />
              <input type="email" name="email" placeholder="Email" value={email} onChange={handleEmailChange} />
              <input type="password" name="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
              <button type="submit">Send it!</button>
            </form>
          </div></>
      );
    }
