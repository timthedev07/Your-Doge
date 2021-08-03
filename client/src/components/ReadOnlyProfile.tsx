import React from "react";
import AvatarData from "../../avatarData.json";
import ReactMarkdown from "react-markdown";
import { ReadOnlyProfileProps } from "../types/props";
import { useAuth } from "../contexts/AuthContext";
import Link from "next/dist/client/link";
import ReactTooltip from "react-tooltip";

export const ReadOnlyProfile: React.FC<ReadOnlyProfileProps> = ({
  avatarId,
  username,
  email,
  bio,
  age,
}) => {
  const { currentUser } = useAuth()!;

  return (
    <>
      <ReactTooltip />
      <div className="profile-top-section">
        <img
          alt=""
          className="avatar"
          src={`/images/avatars/${AvatarData[avatarId]}.svg`}
        />
        <div className="profile-top-section__headings">
          {currentUser && currentUser.username === username ? (
            <Link href="/account" passHref>
              <h2
                style={{ cursor: "pointer" }}
                data-tip="Click on me to edit your profile."
              >
                {username}
              </h2>
            </Link>
          ) : (
            <h2>{username}</h2>
          )}
          <h5>{email}</h5>
          <h6>
            {age} year{age > 1 ? "s" : ""} old
          </h6>
        </div>
      </div>
      <div className="profile-bio-container read-only">
        <div
          style={{ width: "100%", paddingLeft: "10px", paddingRight: "10px" }}
        >
          <ReactMarkdown>{bio}</ReactMarkdown>
        </div>
      </div>
    </>
  );
};
