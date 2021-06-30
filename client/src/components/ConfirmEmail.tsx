import React from "react";

interface ConfirmEmailProps {
  token: string;
}

export const ConfirmEmail: React.FC<ConfirmEmailProps> = ({ token }) => {
  return (
    <div className="email-confirmation-card">
      <h1>One step away.</h1>
      <button>{token}</button>
    </div>
  );
};
