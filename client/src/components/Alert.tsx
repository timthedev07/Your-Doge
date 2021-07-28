import React from "react";
import { AlertProps } from "../types/props";

const TEXT_MAP = {
  success: "Awesome, everything worked just fine!",
  warning: "Oops, something went wrong.",
  info: "You know what?",
};

export const Alert: React.FC<AlertProps> = ({
  onClose,
  setActive,
  type,
  text,
  active,
}) => {
  const element = document.querySelector("div.screen-cover");

  function handleClick() {
    if (element?.classList.contains("active")) {
      element?.classList.remove("active");
    }

    setActive(false);

    if (onClose) {
      onClose();
    }
  }

  if (active) {
    if (!element?.classList.contains("active")) {
      element?.classList.add("active");
    }
  }

  return (
    <div
      className={`custom-alert custom-alert ${
        active ? "alert-active" : "alert-inactive"
      }`}
    >
      <h5>{TEXT_MAP[type]}</h5>
      <p className="alert-text">{text}</p>
      <img
        src="/images/icons/close.svg"
        onClick={() => handleClick()}
        className="close-icon"
        alt=""
      />
    </div>
  );
};
