import React, { useRef, useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { Alert } from "../../components/Alert";
import Link from "next/link";
import { Loading } from "../../components/Loading";
import { setAccessToken } from "../../accessToken";
import { useAuth } from "../../contexts/AuthContext";
import { unknownErrMsg } from "../../constants/general";
import { setWithExpiry } from "../../lib/localStorageExpiration";
import { useRouter } from "next/router";

const THRESHOLD = 360;

const Login: React.FC = () => {
  const emRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);
  const { login } = useAuth()!;
  const { push } = useRouter();

  const [alertActive, setAlertActive] = useState<boolean>(false);
  const [alertType, setAlertType] = useState<string>("danger");
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [pageLoading, setPageLoading] = useState<boolean>(false);

  const [windowWidth, setWindowWidth] = useState<number>(() => {
    return window.innerWidth;
  });

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const displayError = (message: string) => {
    setAlertMessage(message);
    setPageLoading(false);
    setAlertActive(true);
    setAlertType("danger");
  };

  function routeToRegister() {
    push("/auth/register");
  }

  async function handleSubmit(event: any) {
    // prevent reload
    event.preventDefault();

    setPageLoading(true);

    if (!emRef.current || !pwRef.current) return;

    // get the values of the fields
    const email = emRef.current.value;
    const password = pwRef.current.value;

    setAlertMessage("");
    setAlertActive(false);
    setPageLoading(false);

    try {
      const data = await login(email, password);

      if (data?.login) {
        setWithExpiry(
          window.localStorage,
          "serverId",
          data.login.user.serverId,
          new Date().valueOf() + 864000000
        ); // 10 days
        setAccessToken(data.login.accessToken);
        push("/");
        return;
      }

      displayError(unknownErrMsg);
    } catch (err: any) {
      displayError(err.message);
    }
  }

  return (
    <div className="form-container">
      {pageLoading ? <Loading /> : null}

      <h1 className="form-heading">Welcome Back</h1>
      <div>
        <Form className="form-as-wrapper">
          <Alert
            setActive={setAlertActive}
            active={alertActive}
            type={alertType}
            text={alertMessage}
          />

          <div className="input-data form-padding-child">
            <span className="field-hint-icon"></span>
            <input
              required
              className="regular-input"
              type="email"
              ref={emRef}
            />
            <label>Email/Username</label>
          </div>

          <div className="input-data form-padding-child">
            <input
              required
              className="regular-input"
              type="password"
              ref={pwRef}
            />
            <label>Password</label>
          </div>
          <div className="text-center form-padding-child">
            {!pageLoading ? (
              <Button
                variant="warning"
                className={"form-submit-button"}
                type="submit"
                onClick={(event) => handleSubmit(event)}
              >
                Sign in
              </Button>
            ) : (
              <Button
                variant="warning"
                disabled
                type="submit"
                className={"form-submit-button disabled"}
                onClick={(event) => handleSubmit(event)}
              >
                Sign in
              </Button>
            )}
            <Link href="/auth/forgot-password" passHref>
              <Button className="normal-links" variant="link">
                {windowWidth > THRESHOLD
                  ? "Forgot your password?"
                  : "Reset Password"}
              </Button>
            </Link>
            <Link href="/auth/confirm/resend" passHref>
              <Button className="normal-links" variant="link">
                Confirm your email
              </Button>
            </Link>
          </div>
          <div className="text-center second-option-container">
            <Button
              variant="light"
              className="form-submit-button"
              onClick={() => routeToRegister()}
            >
              {windowWidth > THRESHOLD ? "Not a member yet?" : "Join"}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
