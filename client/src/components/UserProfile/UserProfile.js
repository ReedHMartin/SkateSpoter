import React from "react";
import { useQuery } from "@apollo/client";
import { Card, Button } from "semantic-ui-react";
import { QUERY_PROFILE } from "../../Utils/queries";
import { Link } from "react-router-dom";

export default function Profile() {
  const { loading, data } = useQuery(QUERY_PROFILE);
  const user = data?.user || [];
  return (
    <div>
      {loading ? (
        <h3>Setting Up Your Profile...</h3>
      ) : (
        <div>
          <h2>Welcome {user.username}</h2>
          {user.map((use) => (
            <Card.Group key={use._id}>
              <Card>
                <Card.Content>
                  <Card.Header>{use.skateSpots.name}</Card.Header>
                  <Card.Description>{use.skateSpots.location}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <div className="ui button">
                    <Link to={`/${use.skateSpots.id}`}>
                      <Button basic color="blue">
                        See more
                      </Button>
                    </Link>
                  </div>
                </Card.Content>
              </Card>
            </Card.Group>
          ))}
        </div>
      )}
    </div>
  );
}
