import React from "react";
import { SubjectsQuery } from "../generated/graphql";

interface SubjectsSelectProps {
  placeholder: string;
  value: string | number;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  name: string;
  style?: React.CSSProperties;
  subjects: SubjectsQuery;
  className?: string;
}

export const SubjectsSelect: React.FC<SubjectsSelectProps> = ({
  subjects,
  placeholder,
  ...props
}) => {
  return (
    <select {...props} className="cl">
      <option disabled value={""}>
        {placeholder}
      </option>
      {subjects.subjects &&
        subjects.subjects.map((each) => (
          <option key={each.name} value={each.id}>
            {each.name}
          </option>
        ))}
    </select>
  );
};
