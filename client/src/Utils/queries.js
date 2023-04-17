import { gql } from "@apollo/client";

export const QUERY_PROFILE = gql`
  query profile {
    profile {
      _id
      username
      email
      skateSpot {
        location
        name
        lighting
        police_presence
        pedestrians
        typeof
      }
    }
  }
`;

export const QUERY_SKATESPOT = gql`
  query skateSpot {
    skateSpot {
      _id
      location
      name
      lighting
      police_presence
      pedestrians
      typeof
    }
  }
`;
