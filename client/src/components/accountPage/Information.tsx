import React, { useEffect, useState } from "react";
import AvatarData from "../../avatarData.json";
import { Button, Modal } from "react-bootstrap";
import { CloseButton } from "../CloseButton";
import { AvatarKeyType } from "../../pages/auth/Account";

interface InformationProps {
  avatarId: AvatarKeyType;
  username: string;
  email: string;
  bio: string;
  avatarIdSetter: React.Dispatch<React.SetStateAction<number>>;
}

export const Information: React.FC<InformationProps> = ({
  avatarId,
  avatarIdSetter,
}) => {
  const [avatarSrc, setAvatarSrc] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  /* for the avatar modification modal */
  const [
    /*activeAvatar setActiveAvatar*/
  ] = useState<AvatarKeyType>(avatarId);
  let [avatars, setAvatars] = useState<Array<string>>([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /* this part gets the right avatar based on activeAvatar */
  useEffect(() => {
    const getAvatar = async () => {
      const { default: res } = await import(
        `../../assets/images/avatars/${AvatarData[avatarId]}.svg` // use different avatars based on the avatarId
        // binded to the user and stored in the database
      );
      setAvatarSrc(res);
    };
    getAvatar();
  }, [avatarId]);

  /* dynamically importing all avatars to display on the modal */
  useEffect(() => {
    const getAllAvatars = async () => {
      console.log("getting");
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

  return (
    <>
      <img
        onClick={handleShow}
        alt="avatar"
        className="avatar"
        src={avatarSrc}
      />

      <Modal
        className="bootstrap-modal margin-top-nav"
        show={show}
        onHide={handleClose}
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
          {avatars.map((each) => {
            return (
              <img
                src={each}
                key={each}
                alt="help!!"
                className="avatar-option"
              />
            );
          })}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleClose}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
