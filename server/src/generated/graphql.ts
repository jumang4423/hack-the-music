// DO NOT MODIFY - this file is generated by GraphQL code generator
import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AdditionalTheme = {
  __typename?: 'AdditionalTheme';
  content: Scalars['String'];
  toName: Scalars['String'];
  toUserId: Scalars['String'];
};

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
  description?: Maybe<Scalars['String']>;
  idUploadedBy: Scalars['String'];
  url: Scalars['String'];
};


export type MutationUploadSampleArgs = {
  description?: Maybe<Scalars['String']>;
  idUploadedBy: Scalars['String'];
  url: Scalars['String'];
};


export type MutationUploadThemeArgs = {
  content: Scalars['String'];
  description?: Maybe<Scalars['String']>;
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

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  AdditionalTheme: ResolverTypeWrapper<AdditionalTheme>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Group: ResolverTypeWrapper<Group>;
  Image: ResolverTypeWrapper<Image>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Sample: ResolverTypeWrapper<Sample>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Theme: ResolverTypeWrapper<Theme>;
  User: ResolverTypeWrapper<User>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AdditionalTheme: AdditionalTheme;
  Boolean: Scalars['Boolean'];
  Group: Group;
  Image: Image;
  Int: Scalars['Int'];
  Mutation: {};
  Query: {};
  Sample: Sample;
  String: Scalars['String'];
  Theme: Theme;
  User: User;
}>;

export type AdditionalThemeResolvers<ContextType = any, ParentType extends ResolversParentTypes['AdditionalTheme'] = ResolversParentTypes['AdditionalTheme']> = ResolversObject<{
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  toName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  toUserId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type GroupResolvers<ContextType = any, ParentType extends ResolversParentTypes['Group'] = ResolversParentTypes['Group']> = ResolversObject<{
  adminUserId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  gameMode?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  groupId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type ImageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Image'] = ResolversParentTypes['Image']> = ResolversObject<{
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  idUploadedBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  getRandomGenre?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  insertGroup?: Resolver<ResolversTypes['Group'], ParentType, ContextType, RequireFields<MutationInsertGroupArgs, 'adminUserId' | 'gameMode' | 'groupId' | 'name'>>;
  insertUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationInsertUserArgs, 'name' | 'userId'>>;
  randomAdditionalTheme?: Resolver<ResolversTypes['AdditionalTheme'], ParentType, ContextType, RequireFields<MutationRandomAdditionalThemeArgs, 'toName' | 'toUserId'>>;
  randomImage?: Resolver<ResolversTypes['Image'], ParentType, ContextType>;
  randomImages?: Resolver<Array<Maybe<ResolversTypes['Image']>>, ParentType, ContextType, RequireFields<MutationRandomImagesArgs, 'count'>>;
  randomSample?: Resolver<ResolversTypes['Sample'], ParentType, ContextType>;
  randomTheme?: Resolver<ResolversTypes['Theme'], ParentType, ContextType>;
  uploadImage?: Resolver<ResolversTypes['Image'], ParentType, ContextType, RequireFields<MutationUploadImageArgs, 'idUploadedBy' | 'url'>>;
  uploadSample?: Resolver<ResolversTypes['Sample'], ParentType, ContextType, RequireFields<MutationUploadSampleArgs, 'idUploadedBy' | 'url'>>;
  uploadTheme?: Resolver<ResolversTypes['Theme'], ParentType, ContextType, RequireFields<MutationUploadThemeArgs, 'content' | 'idUploadedBy'>>;
  userVisitGroup?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUserVisitGroupArgs, 'groupId' | 'userId'>>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  group?: Resolver<ResolversTypes['Group'], ParentType, ContextType, RequireFields<QueryGroupArgs, 'groupId'>>;
  groups?: Resolver<Array<ResolversTypes['Group']>, ParentType, ContextType, RequireFields<QueryGroupsArgs, 'groupIds'>>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryUserArgs, 'userId'>>;
}>;

export type SampleResolvers<ContextType = any, ParentType extends ResolversParentTypes['Sample'] = ResolversParentTypes['Sample']> = ResolversObject<{
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  idUploadedBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type ThemeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Theme'] = ResolversParentTypes['Theme']> = ResolversObject<{
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  idUploadedBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  accessedGroupIDs?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  AdditionalTheme?: AdditionalThemeResolvers<ContextType>;
  Group?: GroupResolvers<ContextType>;
  Image?: ImageResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Sample?: SampleResolvers<ContextType>;
  Theme?: ThemeResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
