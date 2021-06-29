import React, { useEffect, useRef, useState } from "react";
import AvatarData from "../../avatarData.json";
import { Button, Modal } from "react-bootstrap";
import { CloseButton } from "../CloseButton";
import { AvatarKeyType } from "../../pages/auth/Account";
import { useUpdateAvatarMutation } from "../../generated/graphql";

interface InformationProps {
  avatarId: AvatarKeyType;
  username: string;
  email: string;
  bio: string;
  age: number;
  avatarIdSetter: React.Dispatch<React.SetStateAction<number>>;
}

export const Information: React.FC<InformationProps> = ({
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
  /* for the avatar modification modal */
  const [avatars, setAvatars] = useState<Array<string>>([]);
  const [selectedAvatarId, setSelectedAvatarId] = useState<number | null>(null);

  const bioRef = useRef<HTMLTextAreaElement>(null);

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

  const getSrcById = async (
    id: AvatarKeyType,
    setter: (arg: string) => any
  ) => {
    const { default: res } = await import(
      `../../assets/images/avatars/${AvatarData[id]}.svg` // use different avatars based on the avatarId
      // binded to the user and stored in the database
    );
    setter(res as string);
  };

  /* this part gets the right avatar based on activeAvatar */
  useEffect(() => {
    getSrcById(avatarId, setAvatarSrc);
  }, [avatarId]);

  /* dynamically importing all avatars to display on the modal */
  useEffect(() => {
    const getAllAvatars = async () => {
      setAvatars([]);
      for (
        let i: AvatarKeyType = "0";
        parseInt(i) < Object.keys(AvatarData).length;
        i = `${parseInt(i) + 1}` as any
      ) {
        const tmp = await import(
          `../../assets/images/avatars/${AvatarData[i]}.svg`
        );
        setAvatars((prev) => {
          return [...prev, tmp.default];
        });
      }
    };

    getAllAvatars();
  }, []);

  console.log("selected avatar id: ", selectedAvatarId);

  return (
    <>
      <div className="profile-top-section">
        <img onClick={handleShow} alt="" className="avatar" src={avatarSrc} />
        <div className="profile-top-section__headings">
          <h2>{username}</h2>
          <h5>{email}</h5>
          <h6>
            {age} year{age > 1 ? "s" : ""} old
          </h6>
        </div>
      </div>

      <div className="profile-bio-container">
        <textarea
          className="profile-bio"
          defaultValue={bio}
          ref={bioRef}
        ></textarea>
      </div>

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
                  // getSrcById(`${ind}` as AvatarKeyType, setAvatarSrc);
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
