import { useRef, useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { Alert } from "../../components/Alert";
import { RouteComponentProps } from "react-router-dom";
import { Loading } from "../../components/Loading";
import { useRegisterMutation } from "../../generated/graphql";

const THRESHOLD = 290;

// eslint-disable-next-line
const EMAIL_VALIDATION_REGEX =
  // eslint-disable-next-line
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

const validateEmail = (email: string) => {
  return EMAIL_VALIDATION_REGEX.test(email);
};

export const Register: React.FC<RouteComponentProps> = ({ history }) => {
  // use that mutation hook, it returns an array, if you then destructure it, you get the function
  const [register] = useRegisterMutation();

  const emRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);
  const unameRef = useRef<HTMLInputElement>(null);

  const [alertActive, setAlertActive] = useState<boolean>(false);
  const [alertType, setAlertType] = useState<string>("danger");
  const [alertMessage, setAlertMessage] = useState<string>("");
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
    history.push("/login");
  }

  /**
   *
   * @param e the event
   * @param testFunc the warning would appear when the test function returns true
   */
  const toggleWarning = (
    e: React.ChangeEvent<HTMLInputElement>,
    testFunc: (e: React.ChangeEvent<HTMLInputElement>) => boolean
  ) => {
    const element = e.target;
    if (testFunc(e)) {
      element.classList.add("regular-input-warning");
    } else {
      if (element.classList.contains("regular-input-warning")) {
        element.classList.remove("regular-input-warning");
      }
    }
  };

  async function handleSubmit(event: any) {
    // prevent reload
    event.preventDefault();

    setLoading(true);
    localStorage.setItem("newTask", "true");

    if (!emRef.current || !pwRef.current || !unameRef.current) return;

    // get the values of the fields
    const email = emRef.current.value;
    const password = pwRef.current.value;
    const username = unameRef.current.value;

    // if any field is empty
    if (email.length < 1 || password.length < 1 || username.length < 1) {
      displayError("Please make sure all fields are filled out");
      return;
    }

    // if the username exceeds the length
    if (username.length > 8) {
      displayError("Username exceeds the maximal length");
      return;
    }

    // check for invalid email
    if (!validateEmail(email)) {
      displayError("Invalid email");
      return;
    }

    if (password.length < 8) {
      displayError("Password too short");
      return;
    }

    setAlertMessage("");
    setAlertActive(false);

    // this is how you pass parameters to the graphql function
    try {
      const response = await register({
        variables: {
          email,
          password,
          username,
        },
      });
      const data = response.data;
      if (data?.register) {
        setLoading(false);
        history.push("/");
      }
    } catch (err: any) {
      try {
        displayError(err.graphQLErrors[0].message);
      } catch (err) {
        displayError(
          "Sorry, an unknown error occurred, try again later, or contact our support team(rem.cs90873@gmail.com)"
        );
      }
    }
  }

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
  });

  return (
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
                onChange={(e) =>
                  toggleWarning(e, (e) => {
                    return !validateEmail(e.target.value);
                  })
                }
              />
              <label>Email*</label>
            </div>
            <div className="input-data form-padding-child">
              <span className="field-hint-icon"></span>
              <input
                required
                className="regular-input"
                type="email"
                placeholder="8 characters maximal"
                ref={unameRef}
                onChange={(e) =>
                  toggleWarning(e, (e) => {
                    return e.target.value.length > 8;
                  })
                }
              />
              <label>Username*</label>
            </div>
            <div className="input-data form-padding-child">
              <input
                required
                className="regular-input"
                type="password"
                ref={pwRef}
                placeholder="At least 8 characters long"
                onChange={(e) =>
                  toggleWarning(e, (e) => {
                    return e.target.value.length < 8;
                  })
                }
              />
              <label>Password*</label>
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
  );
};
