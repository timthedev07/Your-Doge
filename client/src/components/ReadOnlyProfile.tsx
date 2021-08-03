import React from "react";
import AvatarData from "../../avatarData.json";
import ReactMarkdown from "react-markdown";
import { ReadOnlyProfileProps } from "../types/props";

export const ReadOnlyProfile: React.FC<ReadOnlyProfileProps> = ({
  avatarId,
  username,
  email,
  bio,
  age,
}) => {
  return (
    <>
      <div className="profile-top-section">
        <img
          alt=""
          className="avatar"
          src={`/images/avatars/${AvatarData[avatarId]}.svg`}
        />
        <div className="profile-top-section__headings">
          <h2>{username}</h2>
          <h5>{email}</h5>
          <h6>
            {age} year{age > 1 ? "s" : ""} old
          </h6>
        </div>
      </div>
      <div className="profile-bio-container">
        <div style={{ width: "100%" }}>
          <ReactMarkdown>{bio}</ReactMarkdown>
        </div>
      </div>
    </>
  );
};
