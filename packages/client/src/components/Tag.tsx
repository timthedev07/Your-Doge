import React from "react";
import { capitalize, TagCategory } from "shared";

interface TagProps {
  category: TagCategory;
}

export const Tag: React.FC<TagProps> = ({ category }) => {
  return <div className={`tag tag-${category}`}>{capitalize(category)}</div>;
};
