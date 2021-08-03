import Link from "next/link";
import React from "react";

interface OAuthButtonProps {
  provider: "google" | "discord" | "facebook";
  href: string;
}

export const OAuthButton: React.FC<OAuthButtonProps> = ({ provider, href }) => {
  return (
    <Link href={href} passHref>
      <a>
        <button className={`oauth-button oauth-button-${provider}`}>
          {provider.charAt(0).toUpperCase() + provider.slice(1)}
          <img
            className="oauth-button__icon"
            src={`/images/icons/oauth/${provider}.svg`}
            alt=""
          />
        </button>
      </a>
    </Link>
  );
};
