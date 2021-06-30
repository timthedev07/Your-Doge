import React from "react";
import { useParams } from "react-router";
import { ConfirmEmail } from "../../components/ConfirmEmail";

export interface ConfirmationRouteParams {
  token?: string;
}

export const Confirm: React.FC = () => {
  // const {
  //   match: { params },
  // } = props;

  const params = useParams<ConfirmationRouteParams>();

  const token = params.token;

  if (!token) {
    return (
      <div>
        <div>Confirm your email!!!</div>
      </div>
    );
  }

  return <ConfirmEmail token={token!} />;
};
