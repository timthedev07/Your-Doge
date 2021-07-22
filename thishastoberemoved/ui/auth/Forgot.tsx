import React from "react";
import { useParams } from "react-router";
import { ForgotPassword } from "../../components/forgotPassword/ForgotPassword";
import { ResetPassword } from "../../components/forgotPassword/ResetPassword";

export interface ForgotRouteParams {
  token?: string;
}

/**
 * This component routes returns different component in different scenarios to prevent conditionally calling hooks
 * @returns react node
 */
export const Forgot: React.FC = () => {
  const params = useParams<ForgotRouteParams>();

  const token = params.token;

  if (!token) {
    return <ForgotPassword />;
  }

  return <ResetPassword token={token!} />;
};
