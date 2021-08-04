import React, { useState, useRef } from "react";
import {
  useLogoutMutation,
  MeQuery,
  MeDocument,
  useDeleteAccountMutation,
  useUpdateUsernameMutation,
} from "../generated/graphql";
import { Modal, Button } from "react-bootstrap";
import { CloseButton } from "./CloseButton";
import { Alert } from "./Alert";
import { useApollo } from "../contexts/ApolloContext";
import { SettingsTabProps } from "../types/props";
import { useAuth } from "../contexts/AuthContext";
import { parseGraphQLError } from "../lib/graphqlErrorParser";

interface SettingsContentSectionProps {
  title: string;
  titleColor?: string;
}

const SettingsContentSection: React.FC<SettingsContentSectionProps> = ({
  title,
  children,
  titleColor,
}) => {
  return (
    <section className="settings-content-section">
      <h4 style={titleColor ? { color: titleColor } : {}}>{title}</h4>
      <hr />
      <div className="settings-content-section__inner-content">{children}</div>
    </section>
  );
};

export const SettingsTab: React.FC<SettingsTabProps> = ({ username }) => {
  const [logout, { client }] = useLogoutMutation();
  const [deleteAccount] = useDeleteAccountMutation();
  const [alertDisplay, setAlertDisplay] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const unRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);
  const { setAccessToken } = useApollo()!;
  const { currentUser } = useAuth()!;
  const [updateUsername] = useUpdateUsernameMutation();
  const newUsernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [alertMessage, setAlertMessage] = useState<string>(
    "Invalid username/password"
  );

  const displayError = (message: string) => {
    setAlertMessage(message);
    setAlertDisplay(true);
  };

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

  const handleUpdateUsername = async () => {
    if (!newUsernameRef.current || !passwordRef.current) {
      return;
    }

    const newUsername = newUsernameRef.current.value;

    if (newUsername === currentUser?.username) {
      return displayError(
        "Pick a username you are not using that can show off how smart you are."
      );
    }

    if (newUsername.length < 1 || newUsername.length > 35) {
      return displayError("Pick a shorter one.");
    }

    try {
      const response = await updateUsername({
        variables: {
          newUsername: newUsername,
          password: passwordRef.current.value || undefined,
        },
      });

      if (response.data && response.data.updateUsername) {
        window.location.reload();
      }
    } catch (err) {
      displayError(parseGraphQLError(err));
    }
  };

  return (
    <>
      <Alert
        type={"warning"}
        active={alertDisplay}
        setActive={setAlertDisplay}
        text={alertMessage}
      />
      <div className="settings-content-container">
        <SettingsContentSection title="Update Your Username">
          <p>
            <em>
              Note: this can have unintended side effects, please be cautious.
            </em>
          </p>
          <input
            ref={newUsernameRef}
            type="text"
            className="rounded-input emphasized margin-10"
          />
          {currentUser && currentUser.provider ? (
            <input ref={passwordRef} type="hidden" value="" />
          ) : (
            <input
              ref={passwordRef}
              type="password"
              className="rounded-input emphasized margin-10"
            />
          )}
          <button
            onClick={handleUpdateUsername}
            className="rounded-btn margin-10"
          >
            Update
          </button>
        </SettingsContentSection>

        <SettingsContentSection title="Modify your password"></SettingsContentSection>

        <SettingsContentSection title="Logout">
          <p>You can always come back later! 🙂</p>
          <button
            className="rounded-btn sorrowful"
            onClick={() => handleLogout()}
          >
            Logout
          </button>
        </SettingsContentSection>

        <SettingsContentSection
          title="Delete Your Account"
          titleColor="#e9574f"
        >
          <p>
            Note that this a one way action. All your records will be{" "}
            <em>permanently</em> deleted once you do so, please be certain!
          </p>
          <button className="rounded-btn danger" onClick={() => setShow(true)}>
            Delete Account
          </button>
        </SettingsContentSection>

        <br />

        <select defaultValue={"default"} style={{ width: "190px" }}>
          <option>private</option>
          <option>public</option>
        </select>
      </div>

      {/* delete account modal */}
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
          <label
            className="unselectable"
            style={{ margin: "5px", pointerEvents: "none" }}
          >
            Please type in your username <code>{username}</code>.
          </label>
          <input ref={unRef} className="rounded-input emphasized" />
          {currentUser!.provider ? null : (
            <>
              <label style={{ margin: "5px" }}>
                Please type in your password to make sure it&#39;s really you.
              </label>
              <input
                type="password"
                ref={pwRef}
                className="rounded-input danger"
              />
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => handleSubmit()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
