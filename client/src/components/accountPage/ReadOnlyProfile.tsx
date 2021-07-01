import React, { useEffect, useState } from "react";
import { AvatarKeyType } from "../../pages/auth/Account";
import AvatarData from "../../avatarData.json";

interface ReadOnlyProfileProps {
  avatarId: AvatarKeyType;
  username: string;
  email: string;
  bio: string;
  age: number;
}

export const ReadOnlyProfile: React.FC<ReadOnlyProfileProps> = ({
  avatarId,
  username,
  email,
  bio,
  age,
}) => {
  const [avatarSrc, setAvatarSrc] = useState<string>("");

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

  return (
    <>
      <div className="profile-top-section">
        <img alt="" className="avatar" src={avatarSrc} />
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
          disabled
        ></textarea>
      </div>
    </>
  );
};