import React, { useRef, useState } from "react";
import { useHistory } from "react-router";
import { Alert } from "../Alert";
import { useForgotPasswordMutation } from "../../generated/graphql";

export const ForgotPassword: React.FC = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const [active, setActive] = useState<boolean>(false);
  const history = useHistory();
  const [requestPasswordReset] = useForgotPasswordMutation();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!emailRef.current) {
      return;
    }

    await requestPasswordReset({
      variables: { email: emailRef.current.value },
    });

    setActive(true);
  };

  return (
    <div className="resend-conf-wrapper">
      <div className="resend-conf-container">
        <form onSubmit={(e) => handleSubmit(e)}>
          <Alert
            active={active}
            setActive={setActive}
            text={"Check your inbox for further instructions."}
            type={"success"}
            onClose={() => {
              history.push("/");
            }}
          />
          <h2>Forgot Your Password?</h2>
          <h4>We are here to help.</h4>
          <input
            placeholder="Email"
            className="rounded-input emphasized"
            ref={emailRef}
            style={{ margin: "40px" }}
          />

          <button className="rounded-btn emphasized" type="submit">
            Send Request
          </button>
        </form>
      </div>
    </div>
  );
};
