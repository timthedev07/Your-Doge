import React from "react";
import { ReactComponent as CloseIcon } from "../assets/images/icons/close.svg";

interface Props {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  active: boolean;
  text: string;
  type: string;
}

export const Alert: React.FC<Props> = (props) => {
  function handleClick() {
    props.setActive(false);
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
