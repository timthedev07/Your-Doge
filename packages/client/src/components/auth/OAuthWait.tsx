import { useRouter } from "next/router";
import React from "react";
import { Alert } from "../Alert";

interface OAuthWaitProps {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  active: boolean;
  alertMessage: string;
}

export const OAuthWait: React.FC<OAuthWaitProps> = ({
  active,
  setActive,
  alertMessage,
}) => {
  const { push } = useRouter();

  return (
    <>
      <Alert
        setActive={setActive}
        active={active}
        type="warning"
        text={alertMessage}
        onClose={() => push("/auth/login")}
      />
      <div className="email-confirmation">
        <div className="email-confirmation-card">
          <div>
            <h2>You are almost there...</h2>
            <h4>Please wait while we sign you in/up...</h4>
            <img src="/images/wait.svg" alt="" style={{ width: "200px" }} />
          </div>
        </div>
      </div>
    </>
  );
};
