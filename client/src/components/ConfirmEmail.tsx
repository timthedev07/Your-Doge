import React from "react";
import { useHistory } from "react-router";
import { useConfirmEmailMutation } from "../generated/graphql";

interface ConfirmEmailProps {
  token: string;
}

export const ConfirmEmail: React.FC<ConfirmEmailProps> = ({ token }) => {
  const [confirmEmail] = useConfirmEmailMutation();
  const history = useHistory();

  return (
    <div className="email-confirmation">
      <div className="email-confirmation-card">
        <h1>One step away.</h1>
        <button
          className="rounded-btn emphasized"
          onClick={async () => {
            const { data } = await confirmEmail({ variables: { token } });
            if (data && data.confirmUser) {
              history.push("/dashboard");
            }
          }}
        >
          Confirm Your Email
        </button>
      </div>
    </div>
  );
};
