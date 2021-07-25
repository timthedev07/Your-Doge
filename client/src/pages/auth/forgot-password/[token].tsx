import React, { useEffect, useRef, useState } from "react";
import {
  useValidTmpTokenMutation,
  useResetPasswordMutation,
  // MeQuery,
  // MeDocument,
} from "../../../generated/graphql";
import { Alert, AlertProps } from "../../../components/Alert";
import { Loading } from "../../../components/Loading";
import { useRouter } from "next/router";
import { routeQueryProcessor } from "../../../lib/routeQueryProcessor";

const ResetPassword: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [active, setActive] = useState<boolean>(false);
  const [validToken, setValidToken] = useState<boolean>(false);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmationRef = useRef<HTMLInputElement>(null);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const { push, query } = useRouter();

  const token = routeQueryProcessor(query, "token");

  const [verifyToken] = useValidTmpTokenMutation();
  const [resetPassword] = useResetPasswordMutation();

  useEffect(() => {
    const isTokenValid = async () => {
      setLoading(true);
      const res = await verifyToken({
        variables: { token: token ? (token as string) : "" },
      });

      if (res.data && res.data.validTmpToken) {
        setValidToken(true);
        return;
      }

      setValidToken(false);
    };

    isTokenValid();
    setLoading(false);
  }, [token, verifyToken]);

  const handleSubmit = async () => {
    if (!passwordRef.current || !confirmationRef.current) {
      return;
    }

    const password = passwordRef.current.value;
    const confirmation = confirmationRef.current.value;

    // check for empty fields
    if (!password.length || !confirmation.length) {
      setAlertMessage("Make sure all fields are filled out");
      setActive(true);
      return;
    }

    if (password !== confirmation) {
      setAlertMessage("Passwords don't match");
      setActive(true);
      let tmp = false;
      if (tmp) {
        push("/");
      }
      return;
    }

    // check for length
    if (password.length < 8) {
      setAlertMessage("Your password has to be at least 8 characters long");
      setActive(true);
      return;
    }

    try {
      const { data } = await resetPassword({
        variables: { token, confirmation: confirmation, newPassword: password },
      });
      if (data && data.resetPassword) {
        push("/auth/login");
      }
    } catch (err) {
      setAlertMessage(
        "URL expired, please send another request and complete the process in 30 minutes."
      );
      setActive(true);
      alertProps.onClose = () => {
        push("/auth/forgot-password");
      };
    }
  };

  const alertProps: AlertProps = {
    active,
    setActive,
    text: alertMessage,
    type: "danger",
    onClose: undefined,
  };

  return !loading ? (
    <div className="email-confirmation">
      <Alert {...alertProps} />
      <div className="email-confirmation-card">
        <div>
          {validToken ? (
            <>
              <h2 style={{ width: "100%" }}>Reset Your Password</h2>
              <h4 style={{ width: "100%" }}>Keep it in mind this time!</h4>
              <input
                className="rounded-input emphasized margin-20"
                placeholder="New Password"
                ref={passwordRef}
                type="password"
              />
              <input
                className="rounded-input emphasized margin-20"
                placeholder="Confirm Your Password"
                ref={confirmationRef}
                type="password"
              />
              <br />
              <button
                className="rounded-btn emphasized"
                onClick={handleSubmit}
                style={{ margin: "40px" }}
              >
                Reset Your Password
              </button>
            </>
          ) : (
            <>
              <h2>Invalid Token</h2>
            </>
          )}
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default ResetPassword;
