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
  deadline: Scalars['Int'];
  enjoyed?: Maybe<Scalars['Boolean']>;
  onTime?: Maybe<Scalars['Boolean']>;
  tags?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addHomework: Scalars['Boolean'];
};


export type MutationAddHomeworkArgs = {
  deadline: Scalars['Float'];
  description: Scalars['String'];
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getAllHomework?: Maybe<Array<Homework>>;
  getAllUserHomework: AllHomeworkResponse;
};

export type AllUserHomeworkQueryVariables = Exact<{ [key: string]: never; }>;


export type AllUserHomeworkQuery = { __typename?: 'Query', getAllUserHomework: { __typename?: 'AllHomeworkResponse', count: number, homeworkList: Array<{ __typename?: 'Homework', id: number, title: string, description: string, deadline: number, subjectId?: Maybe<number>, done: boolean, onTime?: Maybe<boolean>, enjoyed?: Maybe<boolean> }> } };

export type AllHomeworkQueryVariables = Exact<{ [key: string]: never; }>;


export type AllHomeworkQuery = { __typename?: 'Query', getAllHomework?: Maybe<Array<{ __typename?: 'Homework', id: number, userId: number, title: string, description: string, deadline: number, enjoyed?: Maybe<boolean> }>> };


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