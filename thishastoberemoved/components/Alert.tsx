import React from "react";
import { ReactComponent as CloseIcon } from "../assets/images/icons/close.svg";

interface Props {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  active: boolean;
  text: string;
  type: string;
  onClose?: () => void;
}

export const Alert: React.FC<Props> = (props) => {
  function handleClick() {
    props.setActive(false);
    if (props.onClose) {
      props.onClose();
    }
  }

  return (
    <div
      className={`custom-alert custom-alert-${props.type} ${
        props.active ? "alert-active" : "alert-inactive"
      }`}
    >
      <p>{props.text}</p>
      <CloseIcon onClick={() => handleClick()} className="close-icon" />
    </div>
  );
};
