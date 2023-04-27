import React, { useState } from "react";
import { Form } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { ADD_SKATESPOT } from "../Utils/mutations";
import { Link } from "react-router-dom";
import { QUERY_PROFILE, QUERY_SKATESPOTS } from "../Utils/queries";
import Auth from "../Utils/auth";
import "../components/Styles/new.css";

export default function NewSkateSpot() {
  console.log(Auth.getProfile().data._id);
  const [formInfoState, setforminfo] = useState({
    userId: Auth.getProfile().data._id,
    location: "",
    name: "",
    lighting: null,
    police_presence: "",
    pedestrians: null,
    typeOf: "",
  });
  const [wrongTwo, setWrongTwo] = useState("");
  const [addSkateSpot, { error }] = useMutation(ADD_SKATESPOT, {
    refetchQueries: [
      {
        query: QUERY_PROFILE,
        awaitRefetchQueries: true,
      },
      {
        query: QUERY_SKATESPOTS,
        awaitRefetchQueries: true,
      },
    ],
  });

  const handleSkateSpot = async (e) => {
    e.preventDefault();
    try {
      await addSkateSpot({
        variables: { ...formInfoState },
      });
      window.location.href = "/profile";
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
      setforminfo({ ...formInfoState, [name]: parseInt(value) });
    } else if (name === "pedestrians") {
      setforminfo({ ...formInfoState, [name]: parseInt(value) });
    } else if (name === "typeOf") {
      setforminfo({ ...formInfoState, [name]: value });
    }
  };

  return (
    <div id="new">
      {Auth.loggedIn() ? (
        <>
          <h2 className="newSkate">Create a new skate spot</h2>
          <Form className="container" onSubmit={handleSkateSpot}>
            <Form.Field>
              <label>Location (required)</label>
              <input
                name="location"
                value={formInfoState.location}
                placeholder="Address"
                onChange={handleSelect}
              />
            </Form.Field>
            <Form.Field>
              <label>Location Name (required)</label>
              <input
                fluid
                label="Name of Location (Required)"
                name="name"
                value={formInfoState.name}
                placeholder="Name"
                onChange={handleSelect}
              />
            </Form.Field>
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
            <Form.Field>
              <label>Lighting (1=low, 10=high)</label>
              <input
                name="lighting"
                value={formInfoState.lighting}
                placeholder="Lighting"
                onChange={handleSelect}
              />
            </Form.Field>
            <Form.Field>
              <label>Pedestrian Activity (1=low, 10=high)</label>
              <input
                name="pedestrians"
                value={formInfoState.pedestrians}
                placeholder="Pedestrian"
                onChange={handleSelect}
              />
            </Form.Field>
            <Form.Field>
              <label>Type of Location</label>
              <input
                name="typeOf"
                value={formInfoState.typeOf}
                placeholder="Spot Type"
                onChange={handleSelect}
              />
            </Form.Field>
            <Form.Button
              disabled={!(formInfoState.location && formInfoState.name)}
              id="submit"
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
