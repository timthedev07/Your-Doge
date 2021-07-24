import React, { useState, useRef } from "react";
import {
  useLogoutMutation,
  MeQuery,
  MeDocument,
  useDeleteAccountMutation,
} from "../generated/graphql";
import { Modal, Button } from "react-bootstrap";
import { CloseButton } from "./CloseButton";
import { Alert } from "./Alert";
import { useApollo } from "../contexts/ApolloContext";

interface SettingsTabProps {
  username: string;
}

export const SettingsTab: React.FC<SettingsTabProps> = ({ username }) => {
  const [logout, { client }] = useLogoutMutation();
  const [deleteAccount] = useDeleteAccountMutation();
  const [alertDisplay, setAlertDisplay] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const unRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);
  const { setAccessToken } = useApollo()!;

  const handleSubmit = async () => {
    const { data } = await deleteAccount({
      variables: {
        username: unRef?.current?.value || "",
        password: pwRef?.current?.value || "",
      },
    });

    if (data && data.deleteAccount) {
      setShow(false);
      setAccessToken("");
      client!.writeQuery<MeQuery>({
        query: MeDocument,
        data: {
          me: null,
        },
      });
      window.localStorage.removeItem("serverId");
      return;
    }

    setAlertDisplay(true);
  };

  const handleLogout = async () => {
    await logout();
    setAccessToken("");
    client!.writeQuery<MeQuery>({
      query: MeDocument,
      data: {
        me: null,
      },
    });
    window.localStorage.removeItem("serverId");
  };
  return (
    <div>
      <button className="rounded-btn sorrowful" onClick={() => handleLogout()}>
        Logout
      </button>
      <button className="rounded-btn danger" onClick={() => setShow(true)}>
        Delete Account
      </button>
      <select defaultValue={"default"} style={{ width: "190px" }}>
        <option>private</option>
        <option>public</option>
      </select>
      <Modal
        className="bootstrap-modal margin-top-nav"
        show={show}
        onHide={() => setShow(false)}
      >
        <Alert
          type={"danger"}
          active={alertDisplay}
          setActive={setAlertDisplay}
          text="Invalid username/password"
        />
        <Modal.Header>
          <Modal.Title>Delete Your Account</Modal.Title>
          <CloseButton
            handleClick={() => {
              setShow(false);
            }}
          />
        </Modal.Header>

        <Modal.Body>
          <label
            className="unselectable"
            style={{ margin: "5px", pointerEvents: "none" }}
          >
            Please type in your username <code>{username}</code>.
          </label>
          <input ref={unRef} className="rounded-input emphasized" />
          <label style={{ margin: "5px" }}>
            Please type in your password to make sure it&#39;s really you.
          </label>
          <input type="password" ref={pwRef} className="rounded-input danger" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => handleSubmit()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
