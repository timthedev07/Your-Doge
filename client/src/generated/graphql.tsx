import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AllHomeworkResponse = {
  __typename?: 'AllHomeworkResponse';
  homeworkList: Array<Homework>;
  count: Scalars['Float'];
};

export type Homework = {
  __typename?: 'Homework';
  id: Scalars['Int'];
  userId: Scalars['Int'];
  subjectId?: Maybe<Scalars['Int']>;
  title: Scalars['String'];
  description: Scalars['String'];
  done: Scalars['Boolean'];
  deadline: Scalars['String'];
  enjoyed?: Maybe<Scalars['Boolean']>;
  onTime?: Maybe<Scalars['Boolean']>;
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  register: Scalars['Boolean'];
  login: LoginResponse;
  revokeRefreshTokensForUser: Scalars['Boolean'];
  logout: Scalars['Boolean'];
  updateAvatarId: Scalars['Boolean'];
  confirmUser: LoginResponse;
  addHomework: Scalars['Boolean'];
};


export type MutationRegisterArgs = {
  username: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationRevokeRefreshTokensForUserArgs = {
  userId: Scalars['Int'];
};


export type MutationUpdateAvatarIdArgs = {
  newAvatarId: Scalars['Float'];
};


export type MutationConfirmUserArgs = {
  token: Scalars['String'];
};


export type MutationAddHomeworkArgs = {
  deadline: Scalars['String'];
  description: Scalars['String'];
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  me?: Maybe<User>;
  getProfile?: Maybe<User>;
  getAllHomework: Array<Homework>;
  getAllUserHomework: AllHomeworkResponse;
};


export type QueryGetProfileArgs = {
  username: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  email: Scalars['String'];
  username: Scalars['String'];
  serverId: Scalars['Int'];
  avatarId: Scalars['Int'];
  bio: Scalars['String'];
  age: Scalars['Int'];
};

export type ConfirmEmailMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type ConfirmEmailMutation = (
  { __typename?: 'Mutation' }
  & { confirmUser: (
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'accessToken'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'email' | 'bio' | 'serverId' | 'avatarId' | 'age'>
    ) }
  ) }
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'accessToken'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'email' | 'bio' | 'serverId' | 'avatarId' | 'age'>
    ) }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'register'>
);

export type AddHomeworkMutationVariables = Exact<{
  title: Scalars['String'];
  description: Scalars['String'];
  deadline: Scalars['String'];
}>;


export type AddHomeworkMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addHomework'>
);

export type AllUserHomeworkQueryVariables = Exact<{ [key: string]: never; }>;


export type AllUserHomeworkQuery = (
  { __typename?: 'Query' }
  & { getAllUserHomework: (
    { __typename?: 'AllHomeworkResponse' }
    & Pick<AllHomeworkResponse, 'count'>
    & { homeworkList: Array<(
      { __typename?: 'Homework' }
      & Pick<Homework, 'id' | 'title' | 'description' | 'deadline' | 'subjectId' | 'done' | 'onTime' | 'enjoyed'>
    )> }
  ) }
);

export type AllHomeworkQueryVariables = Exact<{ [key: string]: never; }>;


export type AllHomeworkQuery = (
  { __typename?: 'Query' }
  & { getAllHomework: Array<(
    { __typename?: 'Homework' }
    & Pick<Homework, 'id' | 'userId' | 'title' | 'description' | 'deadline' | 'enjoyed'>
  )> }
);

export type GetProfileQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type GetProfileQuery = (
  { __typename?: 'Query' }
  & { getProfile?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'username' | 'bio' | 'email' | 'age' | 'avatarId'>
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'email' | 'bio' | 'serverId' | 'avatarId' | 'age'>
  )> }
);

export type UpdateAvatarMutationVariables = Exact<{
  newId: Scalars['Float'];
}>;


export type UpdateAvatarMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateAvatarId'>
);


export const ConfirmEmailDocument = gql`
    mutation ConfirmEmail($token: String!) {
  confirmUser(token: $token) {
    accessToken
    user {
      id
      username
      email
      bio
      serverId
      avatarId
      age
    }
  }
}
    `;
export type ConfirmEmailMutationFn = Apollo.MutationFunction<ConfirmEmailMutation, ConfirmEmailMutationVariables>;

/**
 * __useConfirmEmailMutation__
 *
 * To run a mutation, you first call `useConfirmEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmEmailMutation, { data, loading, error }] = useConfirmEmailMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useConfirmEmailMutation(baseOptions?: Apollo.MutationHookOptions<ConfirmEmailMutation, ConfirmEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConfirmEmailMutation, ConfirmEmailMutationVariables>(ConfirmEmailDocument, options);
      }
export type ConfirmEmailMutationHookResult = ReturnType<typeof useConfirmEmailMutation>;
export type ConfirmEmailMutationResult = Apollo.MutationResult<ConfirmEmailMutation>;
export type ConfirmEmailMutationOptions = Apollo.BaseMutationOptions<ConfirmEmailMutation, ConfirmEmailMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    accessToken
    user {
      id
      username
      email
      bio
      serverId
      avatarId
      age
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($email: String!, $password: String!, $username: String!) {
  register(email: $email, password: $password, username: $username)
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const AddHomeworkDocument = gql`
    mutation AddHomework($title: String!, $description: String!, $deadline: String!) {
  addHomework(title: $title, description: $description, deadline: $deadline)
}
    `;
export type AddHomeworkMutationFn = Apollo.MutationFunction<AddHomeworkMutation, AddHomeworkMutationVariables>;

/**
 * __useAddHomeworkMutation__
 *
 * To run a mutation, you first call `useAddHomeworkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddHomeworkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addHomeworkMutation, { data, loading, error }] = useAddHomeworkMutation({
 *   variables: {
 *      title: // value for 'title'
 *      description: // value for 'description'
 *      deadline: // value for 'deadline'
 *   },
 * });
 */
export function useAddHomeworkMutation(baseOptions?: Apollo.MutationHookOptions<AddHomeworkMutation, AddHomeworkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddHomeworkMutation, AddHomeworkMutationVariables>(AddHomeworkDocument, options);
      }
export type AddHomeworkMutationHookResult = ReturnType<typeof useAddHomeworkMutation>;
export type AddHomeworkMutationResult = Apollo.MutationResult<AddHomeworkMutation>;
export type AddHomeworkMutationOptions = Apollo.BaseMutationOptions<AddHomeworkMutation, AddHomeworkMutationVariables>;
export const AllUserHomeworkDocument = gql`
    query AllUserHomework {
  getAllUserHomework {
    homeworkList {
      id
      title
      description
      deadline
      subjectId
      done
      onTime
      enjoyed
    }
    count
  }
}
    `;

/**
 * __useAllUserHomeworkQuery__
 *
 * To run a query within a React component, call `useAllUserHomeworkQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllUserHomeworkQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllUserHomeworkQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllUserHomeworkQuery(baseOptions?: Apollo.QueryHookOptions<AllUserHomeworkQuery, AllUserHomeworkQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllUserHomeworkQuery, AllUserHomeworkQueryVariables>(AllUserHomeworkDocument, options);
      }
export function useAllUserHomeworkLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllUserHomeworkQuery, AllUserHomeworkQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllUserHomeworkQuery, AllUserHomeworkQueryVariables>(AllUserHomeworkDocument, options);
        }
export type AllUserHomeworkQueryHookResult = ReturnType<typeof useAllUserHomeworkQuery>;
export type AllUserHomeworkLazyQueryHookResult = ReturnType<typeof useAllUserHomeworkLazyQuery>;
export type AllUserHomeworkQueryResult = Apollo.QueryResult<AllUserHomeworkQuery, AllUserHomeworkQueryVariables>;
export const AllHomeworkDocument = gql`
    query AllHomework {
  getAllHomework {
    id
    userId
    title
    description
    deadline
    enjoyed
  }
}
    `;

/**
 * __useAllHomeworkQuery__
 *
 * To run a query within a React component, call `useAllHomeworkQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllHomeworkQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllHomeworkQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllHomeworkQuery(baseOptions?: Apollo.QueryHookOptions<AllHomeworkQuery, AllHomeworkQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllHomeworkQuery, AllHomeworkQueryVariables>(AllHomeworkDocument, options);
      }
export function useAllHomeworkLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllHomeworkQuery, AllHomeworkQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllHomeworkQuery, AllHomeworkQueryVariables>(AllHomeworkDocument, options);
        }
export type AllHomeworkQueryHookResult = ReturnType<typeof useAllHomeworkQuery>;
export type AllHomeworkLazyQueryHookResult = ReturnType<typeof useAllHomeworkLazyQuery>;
export type AllHomeworkQueryResult = Apollo.QueryResult<AllHomeworkQuery, AllHomeworkQueryVariables>;
export const GetProfileDocument = gql`
    query GetProfile($username: String!) {
  getProfile(username: $username) {
    username
    bio
    email
    age
    avatarId
  }
}
    `;

/**
 * __useGetProfileQuery__
 *
 * To run a query within a React component, call `useGetProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProfileQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useGetProfileQuery(baseOptions: Apollo.QueryHookOptions<GetProfileQuery, GetProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, options);
      }
export function useGetProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProfileQuery, GetProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, options);
        }
export type GetProfileQueryHookResult = ReturnType<typeof useGetProfileQuery>;
export type GetProfileLazyQueryHookResult = ReturnType<typeof useGetProfileLazyQuery>;
export type GetProfileQueryResult = Apollo.QueryResult<GetProfileQuery, GetProfileQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    username
    email
    bio
    serverId
    avatarId
    age
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const UpdateAvatarDocument = gql`
    mutation UpdateAvatar($newId: Float!) {
  updateAvatarId(newAvatarId: $newId)
}
    `;
export type UpdateAvatarMutationFn = Apollo.MutationFunction<UpdateAvatarMutation, UpdateAvatarMutationVariables>;

/**
 * __useUpdateAvatarMutation__
 *
 * To run a mutation, you first call `useUpdateAvatarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAvatarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAvatarMutation, { data, loading, error }] = useUpdateAvatarMutation({
 *   variables: {
 *      newId: // value for 'newId'
 *   },
 * });
 */
export function useUpdateAvatarMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAvatarMutation, UpdateAvatarMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAvatarMutation, UpdateAvatarMutationVariables>(UpdateAvatarDocument, options);
      }
export type UpdateAvatarMutationHookResult = ReturnType<typeof useUpdateAvatarMutation>;
export type UpdateAvatarMutationResult = Apollo.MutationResult<UpdateAvatarMutation>;
export type UpdateAvatarMutationOptions = Apollo.BaseMutationOptions<UpdateAvatarMutation, UpdateAvatarMutationVariables>;