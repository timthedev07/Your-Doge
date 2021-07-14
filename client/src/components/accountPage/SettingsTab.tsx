import React, { useState } from "react";
import {
  useLogoutMutation,
  MeQuery,
  MeDocument,
} from "../../generated/graphql";
import { setAccessToken } from "../../accessToken";
import { Modal, Button } from "react-bootstrap";
import { CloseButton } from "../CloseButton";

interface SettingsTabProps {
  username: string;
}

export const SettingsTab: React.FC<SettingsTabProps> = ({ username }) => {
  const [logout, { client }] = useLogoutMutation();
  const [show, setShow] = useState<boolean>(false);

  const handleLogout = async () => {
    await logout();
    setAccessToken("");
    client!.writeQuery<MeQuery>({
      query: MeDocument,
      data: {
        me: null,
      },
    });
    localStorage.removeItem("serverId");
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
        <Modal.Header>
          <Modal.Title>Delete Your Account</Modal.Title>
          <CloseButton
            handleClick={() => {
              setShow(false);
            }}
          />
        </Modal.Header>

        <Modal.Body>
          <label style={{ margin: "5px" }}>
            Please type in your username <code>{username}</code>.
          </label>
          <input className="rounded-input emphasized" />
          <label style={{ margin: "5px" }}>
            Please type in your password to make sure it's really you.
          </label>
          <input className="rounded-input danger" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setShow(false)}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
