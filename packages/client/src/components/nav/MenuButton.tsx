import React, { useRef } from "react";
import { MenuButtonProps } from "../../types/props";

export const MenuButton: React.FC<MenuButtonProps> = ({ open, onClick }) => {
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
