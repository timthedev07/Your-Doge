import React from "react";
import { discordOAuthUrl } from "../lib/oauth/discord";
import { facebookOAuthUrl } from "../lib/oauth/facebook";
import { googleAuthUrl } from "../lib/oauth/google";
import { OAuthButton } from "./OAuthButton";

export const OAuthButtons: React.FC = () => {
  return (
    <div className="oauth-buttons-wrapper">
      <OAuthButton provider="google" href={googleAuthUrl} />
      <OAuthButton provider="facebook" href={facebookOAuthUrl} />
      <OAuthButton provider="discord" href={discordOAuthUrl} />
    </div>
  );
};
