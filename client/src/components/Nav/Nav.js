import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import Auth from "../../Utils/auth";
import "../Styles/nav.css";

export default function Navbar() {
  const [activeItem, setActiveItem] = useState("");

  const handleItemClick = (e, { name }) => setActiveItem(name);

  return (
    <div className="nav">
      <Menu className="nav" fluid widths={4}>
        <Menu.Item
          name="Home"
          active={activeItem === "Home"}
          onClick={handleItemClick}
          as={Link}
          to="/"
          id="home"
        />
        {Auth.loggedIn() ? (
          <>
            <Menu.Item
              name="Profile"
              active={activeItem === "Profile"}
              onClick={handleItemClick}
              as={Link}
              to="/profile"
              id="profile"
            />
            <Menu.Item
              name="New Spot"
              active={activeItem === "New Spot"}
              onClick={handleItemClick}
              as={Link}
              to="/newspot"
              id="newspot"
            />
            <Menu.Item
              name="Logout"
              active={activeItem === "Logout"}
              onClick={Auth.logout}
              id="logout"
            />
          </>
        ) : (
          <>
            <Menu.Item
              name="Login"
              active={activeItem === "login"}
              onClick={handleItemClick}
              as={Link}
              to="/login"
              id="login"
            />
            <Menu.Item
              name="Sign Up"
              active={activeItem === "signup"}
              onClick={handleItemClick}
              as={Link}
              to="/signup"
              id="signup"
            />
          </>
        )}
      </Menu>
    </div>
  );
}
