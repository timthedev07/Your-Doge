import { unknownErrMsg } from "../constants/general";

export const parseGraphQLError = (error: any) => {
  try {
    return error.graphQLErrors[0].message;
  } catch (err) {
    return unknownErrMsg;
  }
};
