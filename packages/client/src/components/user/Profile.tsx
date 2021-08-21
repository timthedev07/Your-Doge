import React, { useEffect, useMemo, useState } from "react";

import AvatarData from "../../../avatarData.json";
import { Button, Modal } from "react-bootstrap";
import { CloseButton } from "../CloseButton";
import {
  MeDocument,
  MeQuery,
  useUpdateAvatarMutation,
  useUpdateProfileMutation,
} from "../../generated/graphql";
import { ProfileProps } from "../../types/props";
import { AvatarKeyType } from "../../types/types";
import Link from "next/link";
import ReactTooltip from "react-tooltip";

export const Profile: React.FC<ProfileProps> = ({
  avatarId,
  avatarIdSetter,
  username,
  email,
  bio,
  age,
}) => {
  const [avatarSrc, setAvatarSrc] = useState<string>("");
  const [updateAvatar] = useUpdateAvatarMutation();
  const [show, setShow] = useState<boolean>(false);
  const [showSaveButton, setShowSaveButton] = useState<boolean>(false);
  /* for the avatar modification modal */
  const [avatars, setAvatars] = useState<Array<string>>([]);
  const [selectedAvatarId, setSelectedAvatarId] = useState<number | null>(null);

  /* profile update */
  const [bioValue, setBioValue] = useState<string>(bio);
  const [currAge, setCurrAge] = useState<number>(age);
  const [updateProfile] = useUpdateProfileMutation();

  const handleClose = (action?: string) => {
    if (action === "save" && selectedAvatarId !== null) {
      // mutate the database
      updateAvatar({
        variables: {
          newId: selectedAvatarId,
        },
      });
      // and set the state
      avatarIdSetter(selectedAvatarId);
    }
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const saveEdit = async () => {
    await updateProfile({
      variables: {
        bio: bioValue,
        age: currAge,
      },
      update: (store, { data }) => {
        if (!data) return null;
        store.writeQuery<MeQuery>({
          query: MeDocument,
          data: {
            __typename: "Query",
            me: data.updateProfile,
          },
        });
        return null;
      },
    });
    setShowSaveButton(false);
  };

  const ages = useMemo(() => {
    let res = [];
    for (let i = 1; i <= 150; ++i) {
      res.push(i);
    }
    return res.map((each) => {
      return (
        <option key={each} value={each}>
          {each}
        </option>
      );
    });
  }, []);

  /* this part gets the right avatar based on activeAvatar */
  useEffect(() => {
    let subscribed = true;
    const getSrcById = async (
      id: AvatarKeyType,
      setter: (arg: string) => any
    ) => {
      if (!subscribed) return;
      const { default: res } = await import(
        `../../public/images/avatars/${AvatarData[id]}.svg` // use different avatars based on the avatarId
        // binded to the user and stored in the database
      );
      setter(res.src as string);
    };
    getSrcById(avatarId, setAvatarSrc);

    return () => {
      subscribed = false;
    };
  }, [avatarId]);

  /* set up an event listener of cmd+s */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (
        (window.navigator.userAgent.indexOf("Mac") !== -1
          ? e.metaKey
          : e.ctrlKey) &&
        e.key === "s"
      ) {
        e.preventDefault();
        if (showSaveButton) {
          saveEdit();
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  /* dynamically importing all avatars to display on the modal */
  useEffect(() => {
    const getAllAvatars = async () => {
      setAvatars([]);
      for (
        let i: AvatarKeyType = "0";
        parseInt(i) < Object.keys(AvatarData).length;
        i = `${parseInt(i) + 1}` as any
      ) {
        try {
          const { default: res } = await import(
            `../../public/images/avatars/${AvatarData[i]}.svg`
          );
          setAvatars((prev) => {
            return [...prev, res.src as string];
          });
        } catch (err) {}
      }
    };

    getAllAvatars();
  }, []);

  useEffect(() => {
    window.addEventListener("beforeunload", () => {
      if (showSaveButton) {
        alert("You have unsaved changes, are you sure to leave the page?");
      }
    });
  });

  return (
    <>
      <ReactTooltip />
      <div className="profile-top-section">
        <img onClick={handleShow} alt="" className="avatar" src={avatarSrc} />
        <div className="profile-top-section__headings">
          <Link href={`/u/${username}`} passHref>
            <h2
              style={{ cursor: "pointer" }}
              data-tip="Click here to view your public profile"
            >
              {username}
            </h2>
          </Link>

          <h5>{email}</h5>

          <h6>
            <select
              onChange={(e) => {
                const newAge = parseInt(e.target.value);
                setCurrAge(newAge);

                setShowSaveButton(newAge !== age);
              }}
              className="select"
              defaultValue={age}
            >
              {ages}
            </select>
            &nbsp; year{age > 1 ? "s" : ""} old{" "}
          </h6>
        </div>
      </div>

      <div className="profile-bio-container">
        <textarea
          className="profile-bio"
          value={bioValue}
          onChange={(e) => {
            const newBio = e.target.value;
            setBioValue(newBio);
            setShowSaveButton(newBio !== bio);
          }}
        ></textarea>
      </div>

      {showSaveButton && (
        <button
          style={{
            float: "right",
            marginTop: "20px",
            marginBottom: "10px",
            marginRight: "10%",
            transform: "scale(1.1)",
          }}
          className="rounded-btn"
          onClick={async () => {
            await saveEdit();
          }}
        >
          Save
        </button>
      )}

      <Modal
        className="bootstrap-modal margin-top-nav"
        show={show}
        onHide={() => handleClose("close")}
      >
        <Modal.Header>
          <Modal.Title>Change your avatar</Modal.Title>
          <CloseButton
            handleClick={() => {
              setShow(false);
            }}
          />
        </Modal.Header>

        <Modal.Body>
          {avatars.map((each, ind) => {
            return (
              <img
                src={each}
                key={each}
                alt=""
                className={`avatar-option${
                  ind ===
                  (selectedAvatarId !== null
                    ? selectedAvatarId
                    : parseInt(avatarId))
                    ? " avatar-option-active"
                    : ""
                }`}
                onClick={() => {
                  setSelectedAvatarId(ind);
                }}
              />
            );
          })}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => handleClose("save")}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
