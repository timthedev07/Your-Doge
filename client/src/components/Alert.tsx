import React from "react";
import { AlertProps } from "../types/props";

export const Alert: React.FC<AlertProps> = (props) => {
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
      <img
        src="/images/icons/close.svg"
        onClick={() => handleClick()}
        className="close-icon"
        alt=""
      />
    </div>
  );
};
