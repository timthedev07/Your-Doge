import React from "react";
import { discordOAuthUrl } from "../constants/discord";
import { googleAuthUrl } from "../lib/oauth/google";
import { OAuthButton } from "./OAuthButton";

export const OAuthButtons: React.FC = () => {
  return (
    <div className="oauth-buttons-wrapper">
      <OAuthButton provider="google" href={googleAuthUrl} />
      <OAuthButton provider="facebook" href={googleAuthUrl} />
      <OAuthButton provider="discord" href={discordOAuthUrl} />
    </div>
  );
};
