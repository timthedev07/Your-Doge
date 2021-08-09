import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { Alert } from "../../../components/Alert";
import { useForgotPasswordMutation } from "../../../generated/graphql";

const ForgotPassword: React.FC = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const [active, setActive] = useState<boolean>(false);
  const [requestPasswordReset] = useForgotPasswordMutation();
  const { push } = useRouter();

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
    <div className="email-confirmation">
      <div className="email-confirmation-card">
        <form onSubmit={(e) => handleSubmit(e)}>
          <Alert
            active={active}
            setActive={setActive}
            text={"Check your inbox for further instructions."}
            type={"success"}
            onClose={() => {
              push("/");
            }}
          />

          <h2>Forgot Your Password?</h2>
          <h4>We are here to help.</h4>
          <img alt="" src="/images/security.svg" style={{ width: "200px" }} />

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

export default ForgotPassword;
