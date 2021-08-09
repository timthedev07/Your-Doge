import React, { useEffect } from "react";
import { useMeQuery } from "../../../generated/graphql";
import { useRouter } from "next/router";
import Link from "next/link";

/**
 * This component routes returns different component in different scenarios to prevent conditionally calling hooks
 * @returns react node
 */
const Confirm: React.FC = () => {
  const { data } = useMeQuery();
  const { push } = useRouter();

  // hide this page from authenticated users
  useEffect(() => {
    if (data && data?.me) {
      push("/account");
    }
  });

  return (
    <div className="email-confirmation">
      <div className="email-confirmation-card">
        <div>
          <h2 style={{ width: "100%" }}>Next Up, confirm your email...</h2>
          <img src="/images/inbox.svg" alt="" style={{ width: "200px" }} />
          <p className="auth-instruction">
            Check your inbox for further instructions, this step is mandatory
            for the purpose of your security and privacy. If you didn&#39;t
            receive the email, give it another shot{" "}
            <Link href="/auth/confirm/resend">
              <a className="normal-links">here</a>
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
