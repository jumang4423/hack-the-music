import { gql } from "@apollo/client";

export const GET_GROUP = gql`
  query GetGroup($groupId: String!) {
    group(groupId: $groupId) {
      groupId
      name
      gameMode
    }
  }
`;

export const INSERT_GROUP = gql`
  mutation InsertGroup($groupId: String!, $name: String!, $gameMode: Int!) {
    insertGroup(groupId: $groupId, name: $name, gameMode: $gameMode) {
      groupId
      name
      gameMode
    }
  }
`;

export const GET_RANDOM_THEME = gql`
  mutation GetRandomTheme {
    randomTheme {
      content
      description
      idUploadedBy
    }
  }
`;

export const GET_RANDOM_SAMPLE = gql`
  mutation GetRandomSample {
    randomSample {
      url
      description
      idUploadedBy
    }
  }
`;
