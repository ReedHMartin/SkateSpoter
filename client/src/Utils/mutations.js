import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_SKATESPOT = gql`
mutation addSkateSpot($location:String!, name:String!, lighting:Int, police_presence:Array, pedestrians:Int, typeof:String!){
  addSkateSpot(location:$location, name:$name, lighting:$lighting, police_presence:$police_presence, pedestrians:$pedestrians, typeof:$typeof){
    location
    name
    lighting
    police_presence 
    pedestrians 
    typeOf
  }
}`;
