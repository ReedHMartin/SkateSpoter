import React, { useState } from "react";
import { Card } from "semantic-ui-react";
import { QUERY_SKATESPOT } from "../../Utils/queries";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import "../Styles/single.css";

export default function SingleSkate() {
  // destructers ids form use params
  let { skateSpotId } = useParams();
  // gets loading and data from skate spot
  const { loading, data } = useQuery(QUERY_SKATESPOT, {
    // sets skatespotid to skatespotid
    variables: { skateSpotId: skateSpotId },
  });
  // sets skatespot to data, if there is data return data and returns object
  const skateSpot = data?.skateSpot || {};

  return (
    <>
      <div id="single">
        {/* if loading returns loading */}
        {loading ? (
          <h3 className="loading3">Lodaing the Skate Spot...</h3>
        ) : (
          <div style={{ padding: "30px" }}>
            <h2 className="key1">Key: 1=low, 10=high,</h2>
            <h3 className="key2">Green=Low, Yellow=Medium, Red=High</h3>
            <Card
              id="card"
              className="centered"
              style={{
                marginTop: "40px",
                backgroundColor:
                  skateSpot.police_presence[0] === "Green"
                    ? "#00FF00"
                    : skateSpot.police_presence[0] === "Yellow"
                    ? "#FFFF00"
                    : skateSpot.police_presence[0] === "Red"
                    ? "#FF0000"
                    : "#808080",
                paddingBottom: "10px",
              }}
            >
              <Card.Content id="name" header={skateSpot.name} />
              <Card.Content header="Address"></Card.Content>
              <Card.Content>{skateSpot.location}</Card.Content>
              <Card.Content header="Police Presence"></Card.Content>
              <Card.Content>{skateSpot.police_presence}</Card.Content>
              <Card.Content header="Lighting"></Card.Content>
              <Card.Content>{skateSpot.lighting}</Card.Content>
              <Card.Content header="Pedestrians"></Card.Content>
              <Card.Content>{skateSpot.pedestrians}</Card.Content>
              <Card.Content header="Type of Place"></Card.Content>
              <Card.Content>{skateSpot.typeOf}</Card.Content>
            </Card>
          </div>
        )}
      </div>
    </>
  );
}
