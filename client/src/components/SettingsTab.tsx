import React, { useState, useRef } from "react";
import {
  useLogoutMutation,
  MeQuery,
  MeDocument,
  useDeleteAccountMutation,
  useUpdateUsernameMutation,
  useUpdatePasswordMutation,
  useUpdateEmailVisibilityMutation,
} from "../generated/graphql";
import { Modal, Button } from "react-bootstrap";
import { CloseButton } from "./CloseButton";
import { Alert } from "./Alert";
import { useApollo } from "../contexts/ApolloContext";
import { SettingsTabProps } from "../types/props";
import { useAuth } from "../contexts/AuthContext";
import { parseGraphQLError } from "shared";
import { validatePassword } from "shared";
import { AlertType } from "../types/types";
import { unknownErrMsg } from "shared";
import Link from "next/link";

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

      <hr style={{ height: "1.5px" }} />

      <div className="settings-content-section__inner-content">{children}</div>
    </section>
  );
};

export const SettingsTab: React.FC<SettingsTabProps> = ({ username }) => {
  const [logout, { client }] = useLogoutMutation();
  const [deleteAccount] = useDeleteAccountMutation();
  const [alertDisplay, setAlertDisplay] = useState<boolean>(false);
  const [alertType, setAlertType] = useState<AlertType>("warning");
  const [show, setShow] = useState<boolean>(false);
  const unRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);
  const { setAccessToken } = useApollo()!;
  const { currentUser } = useAuth()!;
  const newUsernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [alertMessage, setAlertMessage] = useState<string>(
    "Invalid username/password"
  );
  const oldPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const [updateUsername] = useUpdateUsernameMutation();
  const [updatePassword] = useUpdatePasswordMutation();
  const [toggleEmailVisibility] = useUpdateEmailVisibilityMutation();

  const displayError = (message: string) => {
    setAlertMessage(message);
    setAlertDisplay(true);
    setAlertType("warning");
  };

  const displaySuccessMsg = (message: string) => {
    setAlertMessage(message);
    setAlertType("success");
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
      return displayError("Pick a shorter but non-empty one.");
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

  const handleUpdatePassword = async () => {
    if (
      !oldPasswordRef.current ||
      !newPasswordRef.current ||
      !confirmPasswordRef.current
    ) {
      return;
    }

    const newPassword = newPasswordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    const oldPassword = oldPasswordRef.current.value;

    try {
      validatePassword(newPassword);
    } catch (err) {
      displayError(err as string);
    }

    if (confirmPassword !== newPassword) {
      return displayError("New passwords don't match, try again.");
    }

    try {
      const res = await updatePassword({
        variables: {
          newPassword,
          oldPassword,
        },
      });

      if (res.data?.updatePassword) {
        newPasswordRef.current.value = "";
        oldPasswordRef.current.value = "";
        confirmPasswordRef.current.value = "";
        displaySuccessMsg("Successfully updated password!");
      } else {
        displayError(unknownErrMsg);
      }
    } catch (err) {
      displayError(parseGraphQLError(err));
    }
  };

  return (
    <>
      <Alert
        type={alertType}
        active={alertDisplay}
        setActive={setAlertDisplay}
        text={alertMessage}
      />
      <div className="settings-content-container">
        <SettingsContentSection title="Update Your Username">
          <p>
            You can only modify your username once within 60 days. <br />
            <em>
              Also note that this can potentially cause unintended side effects,
              please be cautious.
            </em>
          </p>
          <input
            ref={newUsernameRef}
            placeholder="New Username"
            type="text"
            className="rounded-input emphasized space-out-vertical"
          />
          {currentUser && currentUser.provider ? (
            <input ref={passwordRef} type="hidden" value="" />
          ) : (
            <input
              ref={passwordRef}
              type="password"
              placeholder="Your Password"
              className="rounded-input emphasized space-out-vertical"
            />
          )}
          <button
            onClick={handleUpdateUsername}
            className="rounded-btn space-out-vertical"
          >
            Update
          </button>
        </SettingsContentSection>

        {currentUser?.provider ? null : (
          <SettingsContentSection title="Modify your password">
            <p>
              Make sure your password is at least 8 characters long, and it is
              recommended that you include combinations of different
              characters(letters, numbers, special characters, etc.).
            </p>

            <input
              ref={oldPasswordRef}
              type="password"
              placeholder="Your Old Password"
              className="rounded-input emphasized space-out-vertical"
            />
            <input
              ref={newPasswordRef}
              type="password"
              placeholder="Your New Password"
              className="rounded-input emphasized space-out-vertical"
            />
            <input
              ref={confirmPasswordRef}
              type="password"
              placeholder="Confirm Your New Password"
              className="rounded-input emphasized space-out-vertical"
            />

            <button
              onClick={handleUpdatePassword}
              className="rounded-btn space-out-vertical"
            >
              Update
            </button>
            <Link href="/auth/forgot-password" passHref>
              <a className="normal-links">Forgot Password?</a>
            </Link>
          </SettingsContentSection>
        )}
        <SettingsContentSection title="Change your email visibility">
          <select
            onChange={async () => {
              await toggleEmailVisibility({
                update: (store, { data }) => {
                  if (!data) return null;
                  store.writeQuery<MeQuery>({
                    query: MeDocument,
                    data: {
                      __typename: "Query",
                      me: data.toggleEmailVisibility,
                    },
                  });
                  return null;
                },
              });
            }}
            defaultValue={currentUser?.emailPrivate ? "private" : "public"}
            style={{ width: "190px" }}
          >
            <option value="private">private</option>
            <option value="public">public</option>
          </select>
        </SettingsContentSection>

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
