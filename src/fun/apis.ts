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

export const GET_RANDOM_IMAGE = gql`
  mutation GetRandomImage {
    randomImage {
      url
      description
      idUploadedBy
    }
  }
`;

export const INSERT_THEME = gql`
  mutation UploadTheme(
    $content: String!
    $description: String
    $idUploadedBy: String!
  ) {
    uploadTheme(
      content: $content
      description: $description
      idUploadedBy: $idUploadedBy
    ) {
      content
      description
      idUploadedBy
    }
  }
`;

export const INSERT_SAMPLE = gql`
  mutation UploadSample(
    $url: String!
    $description: String!
    $idUploadedBy: String!
  ) {
    uploadSample(
      url: $url
      description: $description
      idUploadedBy: $idUploadedBy
    ) {
      url
      description
      idUploadedBy
    }
  }
`;

export const INSERT_IMAGE = gql`
  mutation UploadImage(
    $url: String!
    $description: String!
    $idUploadedBy: String!
  ) {
    uploadImage(
      url: $url
      description: $description
      idUploadedBy: $idUploadedBy
    ) {
      url
      description
      idUploadedBy
    }
  }
`;
