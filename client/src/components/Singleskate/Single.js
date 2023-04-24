import React, { useState } from "react";
import { Card } from "semantic-ui-react";
import { QUERY_SKATESPOT } from "../../Utils/queries";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import "../Styles/single.css";

export default function SingleSkate() {
  let { skateSpotId } = useParams();
  const { loading, data } = useQuery(QUERY_SKATESPOT, {
    variables: { skateSpotId: skateSpotId },
  });
  const [cardColor, setCardColor] = useState("#808080");

  const handleColor = (e) => {
    if (skateSpot.police_presence === "Green") {
      setCardColor("#00FF00");
    } else if (skateSpot.police_presence === "Yellow") {
      setCardColor("#FFFF00");
    } else if (skateSpot.police_presence === "Red") {
      setCardColor("#FF0000");
    }
  };

  const skateSpot = data?.skateSpot || {};
  return (
    <>
      <div>
        {loading ? (
          <h3 className="loading3">Lodaing the Skate Spot...</h3>
        ) : (
          <div>
            <h2 className="key1">Key: 1=low, 10=high,</h2>
            <h3 className="key2">Green=Low, Yellow=Medium, Red=High</h3>
            <Card
              className="centered"
              style={{
                marginTop: "40px",
                backgroundColor: { cardColor },
                paddingBottom: "10px",
              }}
            >
              <Card.Content header={skateSpot.name} />
              <Card.Content header="Adress"></Card.Content>
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
