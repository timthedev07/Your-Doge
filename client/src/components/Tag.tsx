import React from "react";
import { TagCategory } from "../types/types";

interface TagProps {
  category: TagCategory;
}

export const Tag: React.FC<TagProps> = ({ category }) => {
  return (
    <div className={`tag tag-${category}`}>
      {category.charAt(0).toUpperCase() + category.slice(1)}
    </div>
  );
};
