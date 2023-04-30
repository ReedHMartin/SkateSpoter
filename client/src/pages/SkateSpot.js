import React from "react";
import { useQuery } from "@apollo/client";
import { Card, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { QUERY_SKATESPOTS } from "../Utils/queries";
import "../components/Styles/skate.css";
// renders skate spors
export default function SkateSpots() {
  // Queries skate spots
  const { loading, data } = useQuery(QUERY_SKATESPOTS);
  // if there is data return skatespots, if not, return empty array
  const skateSpots = data?.skateSpots || [];
  return (
    <div id="homepage">
      <h2 className="group">Skate Spots!</h2>
      {/* if loading, display loading */}
      {loading ? (
        <h3 className="loading2">Loading Skate Spots...</h3>
      ) : (
        // maps skate spot
        <div className="card-container">
          {skateSpots.map((skateSpot) => (
            <Card.Group className="centered" itemsPerRow={2} key={skateSpot.id}>
              <Card
                className="sk8card"
                style={{
                  backgroundColor: "#d4a0a7",
                  borderRadius: "80px",
                  marginTop: "40px",
                }}
              >
                <Card.Content>
                  <Card.Header>{skateSpot.name}</Card.Header>
                  <Card.Meta>Posted by {skateSpot.userId.username}</Card.Meta>
                  <Card.Description>{skateSpot.location}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <div className="ui centered alligned container">
                    <Link to={`/skateSpots/${skateSpot._id}`}>
                      <Button
                        style={{ backgroundColor: "green" }}
                        class="cardBtn"
                      >
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
