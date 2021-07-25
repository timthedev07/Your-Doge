import React, { useRef, useState } from "react";
import { useResendConfEmailMutation } from "../../../generated/graphql";
import { Alert } from "../../../components/Alert";
import { useRouter } from "next/router";

interface ResendConfEmailProps {}

const ResendConfEmail: React.FC<ResendConfEmailProps> = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const [resend] = useResendConfEmailMutation();
  const { push } = useRouter();
  const [active, setActive] = useState<boolean>(false);

  return (
    <div className="resend-conf-wrapper">
      <div className="resend-conf-container">
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            if (!emailRef.current) {
              return;
            }
            await resend({
              variables: { email: emailRef.current.value },
            });

            setActive(true);
          }}
        >
          <Alert
            active={active}
            setActive={setActive}
            text={"Check your inbox for further instructions."}
            type={"success"}
            onClose={() => {
              push("/");
            }}
          />
          <h2>Didn&#39;t receive the confirmation email?</h2>
          <h4>Give it another shot!</h4>
          <img src="/images/restart.svg" alt="" style={{ width: "200px" }} />

          <div style={{ width: "100%" }}>
            <input
              placeholder="Your Email"
              className="rounded-input emphasized"
              ref={emailRef}
              style={{ margin: "40px" }}
            />
            <button className="rounded-btn emphasized" type="submit">
              Resend
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResendConfEmail;
