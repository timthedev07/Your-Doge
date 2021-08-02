import React, { useEffect } from "react";
import { AlertProps } from "../types/props";

const TEXT_MAP = {
  success: "Awesome, everything worked just fine!",
  warning: "Oops, something went wrong.",
  info: "Just so you know...",
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

  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClick();
      }
    };

    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  });

  return (
    <div
      className={`custom-alert custom-alert ${
        active ? "alert-active" : "alert-inactive"
      }`}
      onClick={handleClick}
    >
      <div className="alert-content">
        <img className="alert-sign" src={`/images/alert/${type}.svg`} alt="" />
        <div className="alert-text">
          <h5>{TEXT_MAP[type]}</h5>
          <p className="alert-paragraph">{text}</p>
        </div>
      </div>
      <pre
        style={{
          textAlign: "right",
          color: "#b3b3b3",
          marginTop: "auto",
          marginBottom: "0",
        }}
      >
        ESC
      </pre>
    </div>
  );
};
