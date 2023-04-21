import React from "react";
import { Container, Header, List } from "semantic-ui-react";
import { QUERY_SKATESPOT } from "../../Utils/queries";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

export default function SingleSkate() {
  let { skateSpotId } = useParams();
  const { loading, data } = useQuery(QUERY_SKATESPOT, {
    variables: { skateSpotId: skateSpotId },
  });
  const skateSpot = data?.skateSpot || {};
  return (
    <>
      <div>
        {loading ? (
          <h3>Lodaing the Skate Spot...</h3>
        ) : (
          <Container>
            <Header size="large">{skateSpot.name}</Header>
            <List>
              <List.Item>
                <List.Icon name="location" />
                <List.Content>{skateSpot.location}</List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name="police_presence" />
                <List.Content>{skateSpot.police_presence}</List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name="lighting" />
                <List.Content>{skateSpot.lighting}</List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name="pedestrians" />
                <List.Content>{skateSpot.pedestrians}</List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name="typeOf" />
                <List.Content>{skateSpot.typeOf}</List.Content>
              </List.Item>
            </List>
          </Container>
        )}
      </div>
    </>
  );
}
