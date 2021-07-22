import React, { useRef } from "react";

interface Props {
  open: boolean;
  onClick: () => void;
}

export const MenuButton: React.FC<Props> = ({ open, onClick }) => {
  // setting up the references to the elements
  const menuBtnRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={`menu-btn ${open ? "open" : "close"}`}
      ref={menuBtnRef}
      onClick={() => onClick()}
    >
      <div className="menu-burger" ref={burgerRef}></div>
    </div>
  );
};
