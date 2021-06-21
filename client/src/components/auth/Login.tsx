import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { Alert } from "../Alert";
import { Redirect, Link, RouteComponentProps } from "react-router-dom";
import { Loading } from "../Loading";
import { useLoginMutation } from "../../generated/graphql";

const THRESHOLD = 290;

export const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const [login] = useLoginMutation();

  const emRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);

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
  });

  const displayError = (message: string) => {
    setAlertMessage(message);
    setPageLoading(false);
    setAlertActive(true);
    setAlertType("danger");
  };

  function routeToRegister() {
    history.push("/register");
  }

  async function handleSubmit(event: any) {
    // prevent reload
    event.preventDefault();

    setPageLoading(true);
    localStorage.setItem("newTask", "true");

    if (!emRef.current || !pwRef.current) return;

    // get the values of the fields
    const email = emRef.current.value;
    const password = pwRef.current.value;

    setAlertMessage("");
    setAlertActive(false);

    try {
      const response = await login({
        variables: {
          email,
          password,
        },
      });
      const data = response.data;
      if (data?.login) {
        setPageLoading(false);
        history.push("/dashboard");
      }
    } catch (err: any) {
      displayError(err.graphQLErrors[0].message);
    }
  }

  return (
    <Container className="panels">
      {pageLoading ? <Loading /> : null}
      <h1 className="page-heading">Welcome Back</h1>

      <Container className="d-flex">
        <div>
          <Form className="from-as-wrapper">
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
              <label>Email</label>
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
                  variant="info"
                  className={"form-submit-button"}
                  type="submit"
                  onClick={(event) => handleSubmit(event)}
                >
                  Sign in
                </Button>
              ) : (
                <Button
                  variant="info"
                  disabled
                  type="submit"
                  className={"form-submit-button disabled"}
                  onClick={(event) => handleSubmit(event)}
                >
                  Sign in
                </Button>
              )}
              <Link to="/forgot-password">
                <Button className="normal-links" variant="link">
                  {windowWidth > THRESHOLD
                    ? "Forgot your password?"
                    : "Reset Password"}
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
      </Container>
    </Container>
  );
};