/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type AdditionalTheme = {
  __typename?: 'AdditionalTheme';
  content: Scalars['String'];
  toName: Scalars['String'];
  toUserId: Scalars['String'];
};

export enum CacheControlScope {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type Group = {
  __typename?: 'Group';
  adminUserId: Scalars['String'];
  gameMode: Scalars['Int'];
  groupId: Scalars['String'];
  name: Scalars['String'];
};

export type Image = {
  __typename?: 'Image';
  description?: Maybe<Scalars['String']>;
  idUploadedBy: Scalars['String'];
  url: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  getRandomGenre: Scalars['String'];
  insertGroup: Group;
  insertUser: User;
  randomAdditionalTheme: AdditionalTheme;
  randomImage: Image;
  randomImages: Array<Maybe<Image>>;
  randomSample: Sample;
  randomTheme: Theme;
  uploadImage: Image;
  uploadSample: Sample;
  uploadTheme: Theme;
  userVisitGroup: User;
};


export type MutationInsertGroupArgs = {
  adminUserId: Scalars['String'];
  gameMode: Scalars['Int'];
  groupId: Scalars['String'];
  name: Scalars['String'];
};


export type MutationInsertUserArgs = {
  name: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationRandomAdditionalThemeArgs = {
  toName: Scalars['String'];
  toUserId: Scalars['String'];
};


export type MutationRandomImagesArgs = {
  count: Scalars['Int'];
};


export type MutationUploadImageArgs = {
  description?: InputMaybe<Scalars['String']>;
  idUploadedBy: Scalars['String'];
  url: Scalars['String'];
};


export type MutationUploadSampleArgs = {
  description?: InputMaybe<Scalars['String']>;
  idUploadedBy: Scalars['String'];
  url: Scalars['String'];
};


export type MutationUploadThemeArgs = {
  content: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
  idUploadedBy: Scalars['String'];
};


export type MutationUserVisitGroupArgs = {
  groupId: Scalars['String'];
  userId: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  group: Group;
  groups: Array<Group>;
  user: User;
};


export type QueryGroupArgs = {
  groupId: Scalars['String'];
};


export type QueryGroupsArgs = {
  groupIds: Array<Scalars['String']>;
};


export type QueryUserArgs = {
  userId: Scalars['String'];
};

export type Sample = {
  __typename?: 'Sample';
  description: Scalars['String'];
  idUploadedBy: Scalars['String'];
  url: Scalars['String'];
};

export type Theme = {
  __typename?: 'Theme';
  content: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  idUploadedBy: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  accessedGroupIDs: Array<Scalars['String']>;
  name: Scalars['String'];
  userId: Scalars['String'];
};
