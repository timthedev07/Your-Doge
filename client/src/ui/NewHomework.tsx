import React, { useRef } from "react";
import { burrito } from "../lib/ApolloWrapper";
import { useAddHomeworkMutation } from "../generated/sub-graphql";

export const NewHomework: React.FC = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const dueDateRef = useRef<HTMLInputElement>(null);
  const [addHomework] = useAddHomeworkMutation({ client: burrito });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!titleRef.current || !descriptionRef.current || !dueDateRef.current)
      return;

    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    const date = new Date(dueDateRef.current.value);

    date.setHours(0, 0, 0);

    try {
      await addHomework({
        variables: {
          title,
          description,
          deadline: `${date.valueOf()}`,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <a className="normal-links" href="/">
        All homework
      </a>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input required ref={titleRef} placeholder="title" />
        <input required ref={descriptionRef} placeholder="description" />
        <input required ref={dueDateRef} type="date" />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};
