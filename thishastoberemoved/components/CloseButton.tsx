import React from "react";
import { ReactComponent as Close1 } from "../assets/images/icons/close1.svg";

interface CloseButtonProps {
  handleClick: () => void;
}

export const CloseButton: React.FC<CloseButtonProps> = ({ handleClick }) => {
  return <Close1 className="close-button" onClick={() => handleClick()} />;
};
