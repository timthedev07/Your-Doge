import React, { useRef } from "react";
import { useAddHomeworkMutation } from "../generated/graphql";

interface NewHomeworkProps {}

export const NewHomework: React.FC<NewHomeworkProps> = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const dueDateRef = useRef<HTMLInputElement>(null);
  const [addHomework] = useAddHomeworkMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!titleRef.current || !descriptionRef.current || !dueDateRef.current)
      return;

    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    const date = new Date(dueDateRef.current.value);

    console.log(date.valueOf());

		return;

    try {
      await addHomework({
        variables: {
          title,
          description,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input ref={titleRef} placeholder="title" />
        <input ref={descriptionRef} placeholder="description" />
        <input ref={dueDateRef} type="date" />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};
