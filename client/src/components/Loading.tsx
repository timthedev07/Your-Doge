import React from "react";
import { ReactComponent as SpinnerIcon } from "../assets/images/icons/spinner.svg";

export const Loading = () => {
  return (
    <div id="loading">
      <SpinnerIcon id="loading-spinner" />
    </div>
  );
};
