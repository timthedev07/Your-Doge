import React from "react";
import { HomeworkDetailsProps } from "../types/props";
import { Modal } from "react-bootstrap";

/**
 * Editable homework detail popup
 */
export const HomeworkDetails: React.FC<HomeworkDetailsProps> = ({
  homework,
}) => {
  return homework ? (
    <div className="homework-details-component">
      <div>{homework.title}</div>
    </div>
  ) : null;
};
