import { gql } from "@apollo/client";

export const GET_GROUP = gql`
  query GetGroup($groupId: String!) {
    group(groupId: $groupId) {
      groupId
      name
      gameMode
      adminUserId
    }
  }
`;

export const GET_USER = gql`
  query GetUser($userId: String!) {
    user(userId: $userId) {
      userId
      name
      accessedGroupIDs
    }
  }
`;

export const INSERT_GROUP = gql`
  mutation InsertGroup(
    $groupId: String!
    $name: String!
    $gameMode: Int!
    $adminUserId: String!
  ) {
    insertGroup(
      groupId: $groupId
      name: $name
      gameMode: $gameMode
      adminUserId: $adminUserId
    ) {
      groupId
      name
      gameMode
      adminUserId
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

export const INSERT_USER = gql`
  mutation InsertUser($userId: String!, $name: String!) {
    insertUser(userId: $userId, name: $name) {
      userId
      name
      accessedGroupIDs
    }
  }
`;

export const USER_VISIT_GROUP = gql`
  mutation UserVisitGroup($userId: String!, $groupId: String!) {
    userVisitGroup(userId: $userId, groupId: $groupId) {
      userId
      name
      accessedGroupIDs
    }
  }
`;

export const GET_USER_ACCESSED_GROUPS = gql`
  query GetUserAccessedGroups($userId: String!) {
    user(userId: $userId) {
      accessedGroupIDs
    }
  }
`;

export const GET_GROUPS = gql`
  query GetGroups($groupIDs: [String!]!) {
    groups(groupIds: $groupIDs) {
      groupId
      name
      gameMode
      adminUserId
    }
  }
`;

export const GET_RANDOM_GENRE = gql`
  mutation GetRandomGenre {
    getRandomGenre
  }
`;

export const GET_RANDOM_ADDITIONAL_THEME = gql`
  mutation GetRandomAdditionalTheme($toUserId: String!, $toName: String!) {
    randomAdditionalTheme(toUserId: $toUserId, toName: $toName) {
      content
      toUserId
      toName
    }
  }
`;
