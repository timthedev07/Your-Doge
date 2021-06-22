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
  subjectId: Scalars['Int'];
  title: Scalars['String'];
  description: Scalars['String'];
  done: Scalars['Boolean'];
  deadline: Scalars['String'];
  enjoyed: Scalars['Boolean'];
  onTime: Scalars['Boolean'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register: LoginResponse;
  login: LoginResponse;
  revokeRefreshTokensForUser: Scalars['Boolean'];
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


export type MutationAddHomeworkArgs = {
  description: Scalars['String'];
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  users: Array<User>;
  me?: Maybe<User>;
  getAllHomework: Array<Homework>;
  allHomework: AllHomeworkResponse;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  email: Scalars['String'];
  username: Scalars['String'];
};

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'accessToken'>
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'username'>
  )> }
);

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'accessToken'>
  ) }
);

export type AddHomeworkMutationVariables = Exact<{
  title: Scalars['String'];
  description: Scalars['String'];
}>;


export type AddHomeworkMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addHomework'>
);

export type AllHomeworkQueryVariables = Exact<{ [key: string]: never; }>;


export type AllHomeworkQuery = (
  { __typename?: 'Query' }
  & { getAllHomework: Array<(
    { __typename?: 'Homework' }
    & Pick<Homework, 'id' | 'userId' | 'title' | 'description' | 'deadline'>
  )> }
);


export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    accessToken
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
export const MeDocument = gql`
    query Me {
  me {
    id
    email
    username
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
export const RegisterDocument = gql`
    mutation Register($email: String!, $password: String!, $username: String!) {
  register(email: $email, password: $password, username: $username) {
    accessToken
  }
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
    mutation AddHomework($title: String!, $description: String!) {
  addHomework(title: $title, description: $description)
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
export const AllHomeworkDocument = gql`
    query AllHomework {
  getAllHomework {
    id
    userId
    title
    description
    deadline
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