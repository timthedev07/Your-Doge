import React from "react";
import { Redirect, useParams } from "react-router";
import { ConfirmEmail } from "../../components/confirmation/ConfirmEmail";
import { ResendConfEmail } from "../../components/confirmation/ResendConfEmail";
import { useMeQuery } from "../../generated/graphql";

export interface ConfirmationRouteParams {
  token?: string;
}

export const Confirm: React.FC = () => {
  // const {
  //   match: { params },
  // } = props;

  const params = useParams<ConfirmationRouteParams>();
  const { data } = useMeQuery();

  // hide this page from authenticated users
  if (data && data?.me) {
    return <Redirect to="/account" />;
  }

  const token = params.token;

  if (!token) {
    return (
      <div>
        <div>Confirm your email!!!</div>
      </div>
    );
  }

  if (token === "resend") {
    return <ResendConfEmail />;
  }

  return <ConfirmEmail token={token!} />;
};
