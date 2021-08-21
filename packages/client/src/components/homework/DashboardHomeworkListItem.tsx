import React from "react";
import { Homework } from "../../generated/sub-graphql";

interface DashboardHomeworkListItemProps {
  handleOpen: () => any;
  item: Homework;
  subjectName: string;
}

export const DashboardHomeworkListItem: React.FC<DashboardHomeworkListItemProps> =
  ({ item, subjectName, handleOpen }) => {
    return (
      <li key={item.id} className="homework-item">
        <div className="homework-item-innermain">
          <div className="homework-title">{item.title}</div>
          <div className={`homework-tag ${item.tag}`}>{item.tag}</div>
        </div>
        <div className="homework-subject">{subjectName}</div>
        <img
          src="/images/icons/rightarrow.svg"
          className="homework-item-arrow"
          alt=""
          data-tip="Click me to view/edit details."
          onClick={() => handleOpen()}
        />
      </li>
    );
  };
