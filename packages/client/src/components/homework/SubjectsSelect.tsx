import React from "react";
import { SubjectsQuery } from "../../generated/graphql";
import { instanceOfInterface } from "shared";

interface SubjectsSelectProps {
  placeholder: string;
  value: string | number;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  name?: string;
  style?: React.CSSProperties;
  subjects: SubjectsQuery | string[];
  className?: string;
  disablePlaceholder?: boolean | undefined;
}

export const SubjectsSelect: React.FC<SubjectsSelectProps> = ({
  subjects,
  placeholder,
  disablePlaceholder,
  ...props
}) => {
  return (
    <select {...props} className="cl">
      <option disabled={disablePlaceholder !== false} value="">
        {placeholder}
      </option>
      {instanceOfInterface<SubjectsQuery>(subjects, "subjects")
        ? subjects.subjects &&
          subjects.subjects.map((each) => (
            <option key={each.name} value={each.id}>
              {each.name}
            </option>
          ))
        : subjects.map((each) => (
            <option key={each} value={each}>
              {each}
            </option>
          ))}
    </select>
  );
};
