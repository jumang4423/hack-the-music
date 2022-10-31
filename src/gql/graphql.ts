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

export enum CacheControlScope {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type Group = {
  __typename?: 'Group';
  gameMode: Scalars['Int'];
  groupId: Scalars['String'];
  name: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  insertGroup: Group;
  randomSample: Sample;
  randomTheme: Theme;
  uploadSample: Sample;
  uploadTheme: Theme;
};


export type MutationInsertGroupArgs = {
  gameMode: Scalars['Int'];
  groupId: Scalars['String'];
  name: Scalars['String'];
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

export type Query = {
  __typename?: 'Query';
  group: Group;
};


export type QueryGroupArgs = {
  groupId: Scalars['String'];
};

export type Sample = {
  __typename?: 'Sample';
  description?: Maybe<Scalars['String']>;
  idUploadedBy: Scalars['String'];
  url: Scalars['String'];
};

export type Theme = {
  __typename?: 'Theme';
  content: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  idUploadedBy: Scalars['String'];
};
