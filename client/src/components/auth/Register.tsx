import { useRef, useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { Alert } from "../Alert";
import { Redirect } from "react-router-dom";
import { Loading } from "../Loading";
import { useRegisterMutation } from "../../generated/graphql";

const THRESHOLD = 290;

export const Register = () => {
  // use that mutation hook, it returns an array, if you then destructure it, you get the function
  const [register] = useRegisterMutation();

  const emRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);

  const [alertActive, setAlertActive] = useState<boolean>(false);
  const [alertType, setAlertType] = useState<string>("danger");
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [redirect, setRedirect] = useState<boolean>(false);
  const [location, setLocation] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [windowWidth, setWindowWidth] = useState<number>(() => {
    return window.innerWidth;
  });

  const displayError = (message: string) => {
    setAlertMessage(message);
    setLoading(false);
    setAlertActive(true);
    setAlertType("danger");
  };

  function routeToLogin() {
    setLocation("/login");
    setRedirect(true);
  }

  async function handleSubmit(event: any) {
    // prevent reload
    event.preventDefault();

    setLoading(true);
    localStorage.setItem("newTask", "true");

    if (!emRef.current || !pwRef.current) return;

    // get the values of the fields
    const email = emRef.current.value;
    const password = pwRef.current.value;

    setAlertMessage("");
    setAlertActive(false);

    // this is how you pass parameters to the graphql function
    try {
      const response = await register({
        variables: {
          email,
          password,
        },
      });
      const data = response.data;
      if (data?.register) {
        setLoading(false);
        setLocation("/dashboard");
        setRedirect(true);
      }
    } catch (err: any) {
      displayError(err.graphQLErrors[0].message);
    }
  }

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
  });

  return !redirect ? (
    <Container className="panels">
      {loading ? <Loading /> : null}
      <h1 className="page-heading">Join Us</h1>

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
              {!loading ? (
                <Button
                  variant="info"
                  className={"form-submit-button"}
                  type="submit"
                  onClick={(event) => handleSubmit(event)}
                >
                  Sign up
                </Button>
              ) : (
                <Button
                  variant="info"
                  disabled
                  type="submit"
                  className={"form-submit-button disabled"}
                  onClick={(event) => handleSubmit(event)}
                >
                  Sign up
                </Button>
              )}
            </div>
            <div className="text-center second-option-container">
              <Button
                variant="light"
                className="form-submit-button"
                onClick={() => routeToLogin()}
              >
                {windowWidth > THRESHOLD
                  ? "Already have an account?"
                  : "Sign in"}
              </Button>
            </div>
          </Form>
        </div>
      </Container>
    </Container>
  ) : (
    <Redirect to={location} />
  );
};
