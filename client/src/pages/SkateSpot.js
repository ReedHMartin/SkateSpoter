import React from "react";
import { useQuery } from "@apollo/client";
import { Card, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { QUERY_SKATESPOTS } from "../Utils/queries";

export default function SkateSpots() {
  const { loading, data } = useQuery(QUERY_SKATESPOTS);
  const skateSpots = data?.skateSpots || [];
  return (
    <div>
      <h2>Skate Spots!</h2>
      {loading ? (
        <h3>Loading Skate Spots...</h3>
      ) : (
        skateSpots.map((skateSpot) => (
          <Card.Group key={skateSpot.id}>
            <Card>
              <Card.Content>
                <Card.Header>{skateSpot.name}</Card.Header>
                <Card.Meta>Posted by {skateSpot.userId.username}</Card.Meta>
                <Card.Description>{skateSpot.location}</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div className="ui button">
                  <Link to={`/skateSpots/${skateSpot._id}`}>
                    <Button basic color="blue">
                      See more
                    </Button>
                  </Link>
                </div>
              </Card.Content>
            </Card>
          </Card.Group>
        ))
      )}
    </div>
  );
}
