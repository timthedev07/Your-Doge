import React from "react";

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
      <img
        src="/images/icons/close.svg"
        onClick={() => handleClick()}
        className="close-icon"
        alt=""
      />
    </div>
  );
};
