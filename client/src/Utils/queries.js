import { gql } from "@apollo/client";

export const QUERY_PROFILE = gql`
query profile {
    profile {
        _id
        username
        email
        skateSpot {
            
        }
    }
}`;
