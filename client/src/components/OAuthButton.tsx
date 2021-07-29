import Link from "next/link";
import React from "react";

interface OAuthButtonProps {
  provider: "google" | "twitter" | "facebook";
  action: "Sign in" | "Sign up";
  href: string;
}

export const OAuthButton: React.FC<OAuthButtonProps> = ({
  action,
  provider,
  href,
}) => {
  return (
    <Link href={href} passHref={true}>
      <button className="signin-button">
        {`${action} with ${
          provider.charAt(0).toUpperCase() + provider.slice(1)
        }`}
        <img src={`/images/icons/oauth/${provider}.svg`} alt="" />
      </button>
    </Link>
  );
};
