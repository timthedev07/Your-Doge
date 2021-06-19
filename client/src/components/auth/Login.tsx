import { useRef, useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { Alert } from "../Alert";
import { Redirect, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Loading } from "../Loading";

const THRESHOLD = 290;

export const Login = () => {
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

  const auth = useAuth();

  function routeToRegister() {
    setLocation("/register");
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
    // await login(email, password)
    //   .then((userCredential) => {
    //     // Signed in
    //     // var user = userCredential.user;
    //     setLoading(false);
    //     setLocation("/dashboard");
    //     setRedirect(true);
    //   })
    //   .catch((error) => {
    //     displayError("Invalid email/password");
    //   });
    displayError("Invalid email/password");
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
              {!loading ? (
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
  ) : (
    <Redirect to={location} />
  );
};
