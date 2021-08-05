import React, { FormEvent, useRef, useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { Alert } from "../components/Alert";
import { Loading } from "../components/Loading";
import { BACKEND } from "../constants/apollo";
import axios from "axios";
import { AlertType } from "../types/types";
import { validateEmail } from "./auth/register";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState<boolean>(false);
  const [alertType, setAlertType] = useState<AlertType>("warning");
  const [message, setMessage] = useState<string>("");

  // set up a few refs holding the value of the fields
  const emailRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const topicRef = useRef<HTMLSelectElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const activateAlert = (message: string, type: AlertType = "warning") => {
    setActive(true);
    setAlertType(type);
    setMessage(message);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (
      [nameRef, topicRef, emailRef, messageRef].some((each) => !each.current)
    ) {
      return;
    }

    if (
      [nameRef, topicRef, emailRef, messageRef].some(
        (each) => !each.current?.value.length
      )
    ) {
      return activateAlert("Please make sure all fields are filled out.");
    }

    if (!validateEmail(emailRef.current!.value)) {
      return activateAlert("Invalid email.");
    }

    setLoading(true);

    try {
      const { data } = await axios({
        url: `${BACKEND}/contact`,
        data: {
          fullName: nameRef.current!.value,
          topic: topicRef.current!.value,
          customerEmail: emailRef.current!.value,
          message: messageRef.current!.value,
        },
        headers: { "Content-Type": "application/json" },
        method: "post",
      });
      activateAlert(data.message, "success");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? <Loading /> : null}
      <Alert
        text={message}
        active={active}
        type={alertType}
        setActive={setActive}
      />
      <div className="page-content">
        <div className="contact-pane-header">
          <h2>Contact Us</h2>
          <p>
            Any doubts, just let us know, we would reply as soon as possible.
          </p>
        </div>
        <div id="contact-page">
          <div id="contact-card-wrapper">
            <div className="contact-pane" id="contact-card">
              <Card.Body>
                <h4
                  style={{
                    margin: "20px",
                  }}
                >
                  Leave a message{" "}
                  <img
                    alt=""
                    src="/images/icons/message.svg"
                    style={{ width: "30px" }}
                  />
                </h4>
                <Card.Body>
                  <Form className="contact-form">
                    <Form.Group className="contact-form-group">
                      <Form.Control
                        className="contact-form-input"
                        placeholder=" "
                        required
                        type="email"
                        ref={emailRef}
                      />
                      <Form.Label className="contact-form-label">
                        Email*
                      </Form.Label>
                    </Form.Group>
                    <Form.Group className="contact-form-group">
                      <Form.Control
                        className="contact-form-input"
                        placeholder=" "
                        required
                        ref={nameRef}
                      />
                      <Form.Label className="contact-form-label">
                        Name*
                      </Form.Label>
                    </Form.Group>
                    <Form.Group className="contact-form-group">
                      <Form.Control
                        className="contact-form-group__select"
                        defaultValue=""
                        as="select"
                        ref={topicRef}
                      >
                        <option disabled value="">
                          Select Topic*
                        </option>
                        <option value="business">Business Inquiry</option>
                        <option value="collaboration">Collaboration</option>
                        <option value="suggestion">Suggestion</option>
                        <option value="other">Other</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group className="contact-form-group">
                      <Form.Control
                        className="contact-form-input"
                        placeholder=" "
                        as="textarea"
                        style={{ height: "200px" }}
                        required
                        ref={messageRef}
                      />
                      <Form.Label className="contact-form-label">
                        Your message*
                      </Form.Label>
                    </Form.Group>
                    <Button
                      className="contact-submit"
                      type="submit"
                      variant="warning"
                      onClick={(event) => handleSubmit(event)}
                    >
                      Send
                    </Button>
                  </Form>
                </Card.Body>
              </Card.Body>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Contact;
