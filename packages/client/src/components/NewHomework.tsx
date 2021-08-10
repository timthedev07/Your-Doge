import React, { useState } from "react";
import { useAddHomeworkMutation } from "../generated/sub-graphql";

interface NewHomeworkProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NewHomework: React.FC<NewHomeworkProps> = ({ open, setOpen }) => {
  const [createHomework] = useAddHomeworkMutation();
  const [input, setInput] = useState({
    title: "",
    deadline: Date.now(),
    description: "",
  });

  const handleSubmit = () => {
    createHomework({ variables: input });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInput((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  return open ? (
    <div className="new-homework-panel">
      <h3>New Homework</h3>
      <form onSubmit={handleSubmit}>
        <input
          value={input.title}
          onChange={handleChange}
          name="title"
          placeholder="title"
        />
        <input
          value={input.deadline}
          onChange={handleChange}
          name="deadline"
          type="date"
          placeholder="deadline"
        />
        <br />
        <textarea
          value={input.description}
          onChange={handleChange}
          name="description"
          placeholder="description"
        ></textarea>
        <button type="submit"></button>
      </form>
      <button onClick={() => setOpen(false)}>close</button>
    </div>
  ) : null;
};
