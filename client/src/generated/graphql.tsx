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
  resendConfirmationUrl: Scalars['Boolean'];
  updateProfile?: Maybe<User>;
  forgotPassword: Scalars['Boolean'];
  validTmpToken: Scalars['Boolean'];
  resetPassword: Scalars['Boolean'];
  deleteAccount: Scalars['Boolean'];
  googleOAuth: OAuthResponse;
  discordOAuth: OAuthResponse;
  facebookOAuth: OAuthResponse;
  updateUsername: Scalars['Boolean'];
};


export type MutationRegisterArgs = {
  recaptchaToken: Scalars['String'];
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


export type MutationResendConfirmationUrlArgs = {
  email: Scalars['String'];
};


export type MutationUpdateProfileArgs = {
  age?: Maybe<Scalars['Float']>;
  bio?: Maybe<Scalars['String']>;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationValidTmpTokenArgs = {
  token: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  confirmation: Scalars['String'];
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationDeleteAccountArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationGoogleOAuthArgs = {
  id: Scalars['String'];
  email: Scalars['String'];
  verified_email: Scalars['Boolean'];
  name: Scalars['String'];
  given_name: Scalars['String'];
  family_name: Scalars['String'];
  picture?: Maybe<Scalars['String']>;
  locale: Scalars['String'];
  hd?: Maybe<Scalars['String']>;
};


export type MutationDiscordOAuthArgs = {
  accent_color?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  banner?: Maybe<Scalars['String']>;
  banner_color?: Maybe<Scalars['String']>;
  discriminator: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  flags: Scalars['Float'];
  id: Scalars['String'];
  locale: Scalars['String'];
  mfa_enabled: Scalars['Boolean'];
  public_flags: Scalars['Float'];
  username: Scalars['String'];
  verified: Scalars['Boolean'];
};


export type MutationFacebookOAuthArgs = {
  id: Scalars['String'];
  email: Scalars['String'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
};


export type MutationUpdateUsernameArgs = {
  password?: Maybe<Scalars['String']>;
  newUsername: Scalars['String'];
};

export type OAuthResponse = {
  __typename?: 'OAuthResponse';
  accessToken: Scalars['String'];
  user?: Maybe<User>;
  status: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  getProfile?: Maybe<User>;
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
  emailPrivate: Scalars['Boolean'];
  provider?: Maybe<Scalars['String']>;
};

export type ConfirmEmailMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type ConfirmEmailMutation = { __typename?: 'Mutation', confirmUser: { __typename?: 'LoginResponse', accessToken: string, user: { __typename?: 'User', id: number, username: string, email: string, bio: string, serverId: number, avatarId: number, age: number, provider?: Maybe<string> } } };

export type DiscordOAuthMutationVariables = Exact<{
  accent_color?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  banner?: Maybe<Scalars['String']>;
  banner_color?: Maybe<Scalars['String']>;
  discriminator: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  flags: Scalars['Float'];
  id: Scalars['String'];
  locale: Scalars['String'];
  mfa_enabled: Scalars['Boolean'];
  public_flags: Scalars['Float'];
  username: Scalars['String'];
  verified: Scalars['Boolean'];
}>;


export type DiscordOAuthMutation = { __typename?: 'Mutation', discordOAuth: { __typename?: 'OAuthResponse', status: string, accessToken: string, user?: Maybe<{ __typename?: 'User', id: number, username: string, email: string, bio: string, serverId: number, avatarId: number, age: number, provider?: Maybe<string> }> } };

export type FacebookOAuthMutationMutationVariables = Exact<{
  id: Scalars['String'];
  email: Scalars['String'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
}>;


export type FacebookOAuthMutationMutation = { __typename?: 'Mutation', facebookOAuth: { __typename?: 'OAuthResponse', accessToken: string, status: string, user?: Maybe<{ __typename?: 'User', id: number, username: string, email: string, bio: string, serverId: number, avatarId: number, age: number, provider?: Maybe<string> }> } };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: boolean };

export type GoogleOAuthMutationVariables = Exact<{
  email: Scalars['String'];
  family_name: Scalars['String'];
  given_name: Scalars['String'];
  hd?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  locale: Scalars['String'];
  name: Scalars['String'];
  picture?: Maybe<Scalars['String']>;
  verified_email: Scalars['Boolean'];
}>;


export type GoogleOAuthMutation = { __typename?: 'Mutation', googleOAuth: { __typename?: 'OAuthResponse', status: string, accessToken: string, user?: Maybe<{ __typename?: 'User', id: number, username: string, email: string, bio: string, serverId: number, avatarId: number, age: number, provider?: Maybe<string> }> } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', accessToken: string, user: { __typename?: 'User', id: number, username: string, email: string, bio: string, serverId: number, avatarId: number, age: number, provider?: Maybe<string> } } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
  recaptchaToken: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: boolean };

export type ResendConfEmailMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ResendConfEmailMutation = { __typename?: 'Mutation', resendConfirmationUrl: boolean };

export type DeleteAccountMutationVariables = Exact<{
  password: Scalars['String'];
  username: Scalars['String'];
}>;


export type DeleteAccountMutation = { __typename?: 'Mutation', deleteAccount: boolean };

export type GetProfileQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type GetProfileQuery = { __typename?: 'Query', getProfile?: Maybe<{ __typename?: 'User', username: string, bio: string, email: string, age: number, avatarId: number }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: Maybe<{ __typename?: 'User', id: number, username: string, email: string, bio: string, serverId: number, avatarId: number, age: number, provider?: Maybe<string> }> };

export type ResetPasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
  confirmation: Scalars['String'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: boolean };

export type UpdateAvatarMutationVariables = Exact<{
  newId: Scalars['Float'];
}>;


export type UpdateAvatarMutation = { __typename?: 'Mutation', updateAvatarId: boolean };

export type UpdateProfileMutationVariables = Exact<{
  bio?: Maybe<Scalars['String']>;
  age?: Maybe<Scalars['Float']>;
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateProfile?: Maybe<{ __typename?: 'User', id: number, username: string, email: string, bio: string, serverId: number, avatarId: number, age: number, provider?: Maybe<string> }> };

export type UpdateUsernameMutationVariables = Exact<{
  newUsername: Scalars['String'];
  password?: Maybe<Scalars['String']>;
}>;


export type UpdateUsernameMutation = { __typename?: 'Mutation', updateUsername: boolean };

export type ValidTmpTokenMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type ValidTmpTokenMutation = { __typename?: 'Mutation', validTmpToken: boolean };


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
      provider
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
export const DiscordOAuthDocument = gql`
    mutation DiscordOAuth($accent_color: String, $avatar: String, $banner: String, $banner_color: String, $discriminator: String!, $email: String, $flags: Float!, $id: String!, $locale: String!, $mfa_enabled: Boolean!, $public_flags: Float!, $username: String!, $verified: Boolean!) {
  discordOAuth(
    accent_color: $accent_color
    avatar: $avatar
    banner: $banner
    banner_color: $banner_color
    discriminator: $discriminator
    email: $email
    flags: $flags
    id: $id
    locale: $locale
    mfa_enabled: $mfa_enabled
    public_flags: $public_flags
    username: $username
    verified: $verified
  ) {
    status
    user {
      id
      username
      email
      bio
      serverId
      avatarId
      age
      provider
    }
    accessToken
  }
}
    `;
export type DiscordOAuthMutationFn = Apollo.MutationFunction<DiscordOAuthMutation, DiscordOAuthMutationVariables>;

/**
 * __useDiscordOAuthMutation__
 *
 * To run a mutation, you first call `useDiscordOAuthMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDiscordOAuthMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [discordOAuthMutation, { data, loading, error }] = useDiscordOAuthMutation({
 *   variables: {
 *      accent_color: // value for 'accent_color'
 *      avatar: // value for 'avatar'
 *      banner: // value for 'banner'
 *      banner_color: // value for 'banner_color'
 *      discriminator: // value for 'discriminator'
 *      email: // value for 'email'
 *      flags: // value for 'flags'
 *      id: // value for 'id'
 *      locale: // value for 'locale'
 *      mfa_enabled: // value for 'mfa_enabled'
 *      public_flags: // value for 'public_flags'
 *      username: // value for 'username'
 *      verified: // value for 'verified'
 *   },
 * });
 */
export function useDiscordOAuthMutation(baseOptions?: Apollo.MutationHookOptions<DiscordOAuthMutation, DiscordOAuthMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DiscordOAuthMutation, DiscordOAuthMutationVariables>(DiscordOAuthDocument, options);
      }
export type DiscordOAuthMutationHookResult = ReturnType<typeof useDiscordOAuthMutation>;
export type DiscordOAuthMutationResult = Apollo.MutationResult<DiscordOAuthMutation>;
export type DiscordOAuthMutationOptions = Apollo.BaseMutationOptions<DiscordOAuthMutation, DiscordOAuthMutationVariables>;
export const FacebookOAuthMutationDocument = gql`
    mutation FacebookOAuthMutation($id: String!, $email: String!, $first_name: String!, $last_name: String!) {
  facebookOAuth(
    id: $id
    email: $email
    first_name: $first_name
    last_name: $last_name
  ) {
    accessToken
    status
    user {
      id
      username
      email
      bio
      serverId
      avatarId
      age
      provider
    }
  }
}
    `;
export type FacebookOAuthMutationMutationFn = Apollo.MutationFunction<FacebookOAuthMutationMutation, FacebookOAuthMutationMutationVariables>;

/**
 * __useFacebookOAuthMutationMutation__
 *
 * To run a mutation, you first call `useFacebookOAuthMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFacebookOAuthMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [facebookOAuthMutationMutation, { data, loading, error }] = useFacebookOAuthMutationMutation({
 *   variables: {
 *      id: // value for 'id'
 *      email: // value for 'email'
 *      first_name: // value for 'first_name'
 *      last_name: // value for 'last_name'
 *   },
 * });
 */
export function useFacebookOAuthMutationMutation(baseOptions?: Apollo.MutationHookOptions<FacebookOAuthMutationMutation, FacebookOAuthMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FacebookOAuthMutationMutation, FacebookOAuthMutationMutationVariables>(FacebookOAuthMutationDocument, options);
      }
export type FacebookOAuthMutationMutationHookResult = ReturnType<typeof useFacebookOAuthMutationMutation>;
export type FacebookOAuthMutationMutationResult = Apollo.MutationResult<FacebookOAuthMutationMutation>;
export type FacebookOAuthMutationMutationOptions = Apollo.BaseMutationOptions<FacebookOAuthMutationMutation, FacebookOAuthMutationMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const GoogleOAuthDocument = gql`
    mutation GoogleOAuth($email: String!, $family_name: String!, $given_name: String!, $hd: String, $id: String!, $locale: String!, $name: String!, $picture: String, $verified_email: Boolean!) {
  googleOAuth(
    email: $email
    family_name: $family_name
    given_name: $given_name
    hd: $hd
    id: $id
    locale: $locale
    name: $name
    picture: $picture
    verified_email: $verified_email
  ) {
    status
    user {
      id
      username
      email
      bio
      serverId
      avatarId
      age
      provider
    }
    accessToken
  }
}
    `;
export type GoogleOAuthMutationFn = Apollo.MutationFunction<GoogleOAuthMutation, GoogleOAuthMutationVariables>;

/**
 * __useGoogleOAuthMutation__
 *
 * To run a mutation, you first call `useGoogleOAuthMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGoogleOAuthMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [googleOAuthMutation, { data, loading, error }] = useGoogleOAuthMutation({
 *   variables: {
 *      email: // value for 'email'
 *      family_name: // value for 'family_name'
 *      given_name: // value for 'given_name'
 *      hd: // value for 'hd'
 *      id: // value for 'id'
 *      locale: // value for 'locale'
 *      name: // value for 'name'
 *      picture: // value for 'picture'
 *      verified_email: // value for 'verified_email'
 *   },
 * });
 */
export function useGoogleOAuthMutation(baseOptions?: Apollo.MutationHookOptions<GoogleOAuthMutation, GoogleOAuthMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GoogleOAuthMutation, GoogleOAuthMutationVariables>(GoogleOAuthDocument, options);
      }
export type GoogleOAuthMutationHookResult = ReturnType<typeof useGoogleOAuthMutation>;
export type GoogleOAuthMutationResult = Apollo.MutationResult<GoogleOAuthMutation>;
export type GoogleOAuthMutationOptions = Apollo.BaseMutationOptions<GoogleOAuthMutation, GoogleOAuthMutationVariables>;
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
      provider
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
    mutation Register($email: String!, $password: String!, $username: String!, $recaptchaToken: String!) {
  register(
    email: $email
    password: $password
    username: $username
    recaptchaToken: $recaptchaToken
  )
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
 *      recaptchaToken: // value for 'recaptchaToken'
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
export const ResendConfEmailDocument = gql`
    mutation ResendConfEmail($email: String!) {
  resendConfirmationUrl(email: $email)
}
    `;
export type ResendConfEmailMutationFn = Apollo.MutationFunction<ResendConfEmailMutation, ResendConfEmailMutationVariables>;

/**
 * __useResendConfEmailMutation__
 *
 * To run a mutation, you first call `useResendConfEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResendConfEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resendConfEmailMutation, { data, loading, error }] = useResendConfEmailMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useResendConfEmailMutation(baseOptions?: Apollo.MutationHookOptions<ResendConfEmailMutation, ResendConfEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResendConfEmailMutation, ResendConfEmailMutationVariables>(ResendConfEmailDocument, options);
      }
export type ResendConfEmailMutationHookResult = ReturnType<typeof useResendConfEmailMutation>;
export type ResendConfEmailMutationResult = Apollo.MutationResult<ResendConfEmailMutation>;
export type ResendConfEmailMutationOptions = Apollo.BaseMutationOptions<ResendConfEmailMutation, ResendConfEmailMutationVariables>;
export const DeleteAccountDocument = gql`
    mutation DeleteAccount($password: String!, $username: String!) {
  deleteAccount(password: $password, username: $username)
}
    `;
export type DeleteAccountMutationFn = Apollo.MutationFunction<DeleteAccountMutation, DeleteAccountMutationVariables>;

/**
 * __useDeleteAccountMutation__
 *
 * To run a mutation, you first call `useDeleteAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAccountMutation, { data, loading, error }] = useDeleteAccountMutation({
 *   variables: {
 *      password: // value for 'password'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useDeleteAccountMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAccountMutation, DeleteAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAccountMutation, DeleteAccountMutationVariables>(DeleteAccountDocument, options);
      }
export type DeleteAccountMutationHookResult = ReturnType<typeof useDeleteAccountMutation>;
export type DeleteAccountMutationResult = Apollo.MutationResult<DeleteAccountMutation>;
export type DeleteAccountMutationOptions = Apollo.BaseMutationOptions<DeleteAccountMutation, DeleteAccountMutationVariables>;
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
    provider
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
export const ResetPasswordDocument = gql`
    mutation ResetPassword($token: String!, $newPassword: String!, $confirmation: String!) {
  resetPassword(
    token: $token
    confirmation: $confirmation
    newPassword: $newPassword
  )
}
    `;
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      token: // value for 'token'
 *      newPassword: // value for 'newPassword'
 *      confirmation: // value for 'confirmation'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
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
export const UpdateProfileDocument = gql`
    mutation UpdateProfile($bio: String, $age: Float) {
  updateProfile(age: $age, bio: $bio) {
    id
    username
    email
    bio
    serverId
    avatarId
    age
    provider
  }
}
    `;
export type UpdateProfileMutationFn = Apollo.MutationFunction<UpdateProfileMutation, UpdateProfileMutationVariables>;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      bio: // value for 'bio'
 *      age: // value for 'age'
 *   },
 * });
 */
export function useUpdateProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProfileMutation, UpdateProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument, options);
      }
export type UpdateProfileMutationHookResult = ReturnType<typeof useUpdateProfileMutation>;
export type UpdateProfileMutationResult = Apollo.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<UpdateProfileMutation, UpdateProfileMutationVariables>;
export const UpdateUsernameDocument = gql`
    mutation UpdateUsername($newUsername: String!, $password: String) {
  updateUsername(newUsername: $newUsername, password: $password)
}
    `;
export type UpdateUsernameMutationFn = Apollo.MutationFunction<UpdateUsernameMutation, UpdateUsernameMutationVariables>;

/**
 * __useUpdateUsernameMutation__
 *
 * To run a mutation, you first call `useUpdateUsernameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUsernameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUsernameMutation, { data, loading, error }] = useUpdateUsernameMutation({
 *   variables: {
 *      newUsername: // value for 'newUsername'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useUpdateUsernameMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUsernameMutation, UpdateUsernameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUsernameMutation, UpdateUsernameMutationVariables>(UpdateUsernameDocument, options);
      }
export type UpdateUsernameMutationHookResult = ReturnType<typeof useUpdateUsernameMutation>;
export type UpdateUsernameMutationResult = Apollo.MutationResult<UpdateUsernameMutation>;
export type UpdateUsernameMutationOptions = Apollo.BaseMutationOptions<UpdateUsernameMutation, UpdateUsernameMutationVariables>;
export const ValidTmpTokenDocument = gql`
    mutation ValidTmpToken($token: String!) {
  validTmpToken(token: $token)
}
    `;
export type ValidTmpTokenMutationFn = Apollo.MutationFunction<ValidTmpTokenMutation, ValidTmpTokenMutationVariables>;

/**
 * __useValidTmpTokenMutation__
 *
 * To run a mutation, you first call `useValidTmpTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useValidTmpTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [validTmpTokenMutation, { data, loading, error }] = useValidTmpTokenMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useValidTmpTokenMutation(baseOptions?: Apollo.MutationHookOptions<ValidTmpTokenMutation, ValidTmpTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ValidTmpTokenMutation, ValidTmpTokenMutationVariables>(ValidTmpTokenDocument, options);
      }
export type ValidTmpTokenMutationHookResult = ReturnType<typeof useValidTmpTokenMutation>;
export type ValidTmpTokenMutationResult = Apollo.MutationResult<ValidTmpTokenMutation>;
export type ValidTmpTokenMutationOptions = Apollo.BaseMutationOptions<ValidTmpTokenMutation, ValidTmpTokenMutationVariables>;