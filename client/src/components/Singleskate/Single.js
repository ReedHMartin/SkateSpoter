import React from "react";
import { Container, Header } from "semantic-ui-react";
import Navbar from "../Nav/Nav";
import Header from "../Header/Header";

export default function SingleSkate() {
  return (
  <>
    <div>
      ${Header}
    </div>
    <div>
      ${Navbar}
    </div>
    <div>
      <Container>
        <Header size='large'>Name of Spot</Header>
        <Image src='picture of spot' fluid />
        <Header size='small'>Username</Header>
        <List>
          <List.Item>
            <List.Icon name="location" />
            <List.Content>Location</List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="police_presence" />
            <List.Content>Police Presence</List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="lighting" />
            <List.Content>Lighting</List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="pedestrians" />
            <List.Content>Pedestrians</List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="typeOf" />
            <List.Content>typeOf</List.Content>
          </List.Item>
        </List>
      </Container>
    </div>
  </>
  );
}
