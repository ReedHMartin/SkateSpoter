import React, { useState } from "react";
import { Form } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { ADD_SKATESPOT } from "../Utils/mutations";
import Auth from "../Utils/auth";

export default function NewSkateSpot() {
  const [formInfoState, setforminfo] = useState({
    location: "",
    name: "",
    lighting: "",
    police_presence: "",
    pedestrian: "",
    typeOf: "",
  });
  const [wrongTwo, setWrongTwo] = useState("");
  const [addSkateSpot, { error }] = useMutation(ADD_SKATESPOT);

  const handleSkateSpot = async (e) => {
    e.preventDefault();
    try {
      await addSkateSpot({
        variables: { ...formInfoState },
      });
    } catch (error) {
      console.error(error);
      setWrongTwo("please make sure you have filled the info out correctly");
    }
    console.log(formInfoState);
  };

  const handleSelect = (e) => {
    let element = e.currentTarget;
    if (element.matches("div.checkbox")) {
      element = e.currentTarget.querySelector("input");
    }
    const { name, value } = element;

    if (name === "location") {
      setforminfo({ ...formInfoState, [name]: value });
    } else if (name === "name") {
      setforminfo({ ...formInfoState, [name]: value });
    } else if (name === "police_presence") {
      setforminfo({ ...formInfoState, [name]: value });
    } else if (name === "lighting") {
      setforminfo({ ...formInfoState, [name]: value });
    } else if (name === "pedestrian") {
      setforminfo({ ...formInfoState, [name]: value });
    } else if (name === "typeOf") {
      setforminfo({ ...formInfoState, [name]: value });
    }
  };

  return (
    <div>
      {Auth.loggedIn() ? (
        <>
          <h2>Create a new skate spot</h2>
          <Form onSubmit={handleSkateSpot}>
            <Form.Group>
              <Form.Input
                fluid
                label="Location (Required)"
                name="location"
                value={formInfoState.location}
                placeholder="Adress"
                onChange={handleSelect}
              />
              <Form.Input
                fluid
                label="Name of Location (Required)"
                name="name"
                value={formInfoState.name}
                placeholder="Name"
                onChange={handleSelect}
              />
            </Form.Group>
            <Form.Group inline>
              <label>Police Presence</label>
              <Form.Checkbox
                label="High"
                name="police_presence"
                value="Red"
                checked={formInfoState.police_presence === "Red"}
                onChange={handleSelect}
              />
              <Form.Checkbox
                label="Medium"
                name="police_presence"
                value="Yellow"
                checked={formInfoState.police_presence === "Yellow"}
                onChange={handleSelect}
              />
              <Form.Checkbox
                label="Light"
                name="police_presence"
                value="Green"
                checked={formInfoState.police_presence === "Green"}
                onChange={handleSelect}
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                fluid
                label="Lighting from 1 to 10, 10 is best"
                name="lighting"
                value={formInfoState.lighting}
                placeholder="Lighting"
                onChange={handleSelect}
              />
              <Form.Input
                fluid
                label="Pedestrian Activity, from 1 to 10, 10 is high"
                name="pedestrian"
                value={formInfoState.pedestrian}
                placeholder="Pedestrian"
                onChange={handleSelect}
              />
              <Form.Input
                fluid
                label="Type of Place, ex: skatepark, library..."
                name="typeOf"
                value={formInfoState.typeOf}
                placeholder="Spot Type"
                onChange={handleSelect}
              />
            </Form.Group>
            <Form.Button
              disabled={!(formInfoState.location && formInfoState.name)}
            >
              Submit
            </Form.Button>
            {wrongTwo && <h4>{wrongTwo}</h4>}
          </Form>
        </>
      ) : (
        <h2>You must be logged in to see!</h2>
      )}
    </div>
  );
}
