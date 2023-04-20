import React from "react";
import { Container, Header, List } from "semantic-ui-react";
import { QUERY_SKATESPOT } from "../../Utils/queries";
import { useQuery } from "@apollo/client";

export default function SingleSkate() {
  const { loading, data } = useQuery(QUERY_SKATESPOT);
  const skateSpot = data?.skateSpot || [];
  return (
    <>
      <div>
        {loading ? (
          <h3>Lodaing the Skate Spot...</h3>
        ) : (
          skateSpot.map((spot) => (
            <Container>
              <Header size="large">{spot.name}</Header>
              {/* <Image src='picture of spot' fluid /> */}
              <Header size="small">Username</Header>
              <List>
                <List.Item>
                  <List.Icon name="location" />
                  <List.Content>{spot.location}</List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name="police_presence" />
                  <List.Content>{spot.police_presence}</List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name="lighting" />
                  <List.Content>{spot.lighting}</List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name="pedestrians" />
                  <List.Content>{spot.pedestrians}</List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name="typeOf" />
                  <List.Content>{spot.typeof}</List.Content>
                </List.Item>
              </List>
            </Container>
          ))
        )}
      </div>
    </>
  );
}
