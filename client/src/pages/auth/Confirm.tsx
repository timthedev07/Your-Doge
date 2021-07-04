import React from "react";
import { Redirect, useParams } from "react-router";
import { ConfirmEmail } from "../../components/confirmation/ConfirmEmail";
import { ResendConfEmail } from "../../components/confirmation/ResendConfEmail";
import { useMeQuery } from "../../generated/graphql";
import { ReactComponent as Inbox } from "../../assets/images/inbox.svg";

export interface ConfirmationRouteParams {
  token?: string;
}

/**
 * This component routes returns different component in different scenarios to prevent conditionally calling hooks
 * @returns react node
 */
export const Confirm: React.FC = () => {
  const params = useParams<ConfirmationRouteParams>();
  const { data } = useMeQuery();

  // hide this page from authenticated users
  if (data && data?.me) {
    return <Redirect to="/account" />;
  }

  const token = params.token;

  if (!token) {
    return (
      <div className="email-confirmation">
        <div className="email-confirmation-card">
          <div>
            <h2 style={{ width: "100%" }}>Next Up, confirm your email...</h2>
            <Inbox style={{ width: "200px" }} />
            <p>
              Check your inbox for further instructions, this step is mandatory
              for the purpose of your security and privacy. If you didn't
              receive the email, give it another shot{" "}
              <a className="normal-links" href="/auth/confirm/resend">
                here
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (token === "resend") {
    return <ResendConfEmail />;
  }

  return <ConfirmEmail token={token!} />;
};
