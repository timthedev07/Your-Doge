import React from "react";

interface CloseButtonProps {
  handleClick: () => void;
}

export const CloseButton: React.FC<CloseButtonProps> = ({ handleClick }) => {
  return (
    <img
      src="/images/icons/close1.svg"
      alt=""
      className="close-button"
      onClick={() => handleClick()}
    />
  );
};
