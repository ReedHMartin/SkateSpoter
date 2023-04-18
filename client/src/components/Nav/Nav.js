import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Menu } from "semantic-ui-react";
import Auth from "../../Utils/auth";

export default function Navbar() {
  const [activeItem, setActiveItem] = useState("home");

  handleItemClick = (e, { name }) => setActiveItem(name);

  return (
    <Menu fluid widths={3}>
      <Menu.Item
        name="home"
        active={activeItem === "home"}
        onClick={handleItemClick}
        as={Link}
        to="/"
      />
      {Auth.loggedIn() ? (
        <>
          <Menu.Item
            name="profile"
            active={activeItem === "profile"}
            onClick={handleItemClick}
            as={Link}
            to="/profile"
          />
          <Menu.Item
            name="new spot"
            active={activeItem === "new spot"}
            onClick={handleItemClick}
            as={Link}
            to="/newspot"
          />
          <Menu.Item>
            <Button primary onClick={Auth.logout}>
              Logout
            </Button>
          </Menu.Item>
        </>
      ) : (
        <>
          <Menu.Item
            name="new spot"
            active={activeItem === "login"}
            onClick={handleItemClick}
            as={Link}
            to="/login"
          />
          <Menu.Item
            name="sign up"
            active={activeItem === "signup"}
            onClick={handleItemClick}
            as={Link}
            to="/signup"
          />
        </>
      )}
    </Menu>
  );
}
