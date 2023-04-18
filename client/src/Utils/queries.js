import { gql } from "@apollo/client";

export const QUERY_PROFILE = gql`
  query user {
    user {
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

export const QUERY_SKATESPOTS = gql`
  query skateSpots {
    skateSpots {
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
export const QUERY_SKATESPOT = gql`
  query skateSpot($skateSpotId: ID!) {
    skateSpot(skateSpotId: $skateSpotId) {
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
