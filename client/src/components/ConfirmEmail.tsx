import React from "react";
import { useConfirmEmailMutation } from "../generated/graphql";

interface ConfirmEmailProps {
  token: string;
}

export const ConfirmEmail: React.FC<ConfirmEmailProps> = ({ token }) => {
  const [confirmEmail] = useConfirmEmailMutation();

  return (
    <div className="email-confirmation">
      <div className="email-confirmation-card">
        <h1>One step away.</h1>
        <button
          onClick={async () => {
            const res = await confirmEmail({ variables: { token } });
            console.log(res);
          }}
        >
          {token}
        </button>
      </div>
    </div>
  );
};
