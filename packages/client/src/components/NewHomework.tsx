import React, { FormEvent, useState } from "react";
import { parseGraphQLError } from "shared";
import { useAddHomeworkMutation } from "../generated/sub-graphql";

interface NewHomeworkProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NewHomework: React.FC<NewHomeworkProps> = ({ open, setOpen }) => {
  const [createHomework] = useAddHomeworkMutation();
  const [apiResponse, setApiResponse] = useState<string>("");
  const [input, setInput] = useState({
    title: "",
    deadline: "",
    description: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await createHomework({
      variables: {
        ...input,
        deadline: Date.parse(input.deadline),
      },
    });

    try {
      if (res.data && res.data.addHomework) {
        setApiResponse("Success homework added!");
      }
    } catch (err) {
      setApiResponse(parseGraphQLError(err));
    }
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
        <button type="submit">Submit</button>
      </form>
      <br />
      <button onClick={() => setOpen(false)}>close</button>
      <pre>{apiResponse}</pre>
    </div>
  ) : null;
};
