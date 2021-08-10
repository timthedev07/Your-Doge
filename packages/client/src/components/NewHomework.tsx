import React, { FormEvent, useState } from "react";
import { nonEmpty, parseGraphQLError, TagCategory } from "shared";
import { useApollo } from "../contexts/ApolloContext";
import { SubjectsQuery } from "../generated/graphql";
import { useAddHomeworkMutation } from "../generated/sub-graphql";

interface NewHomeworkProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  subjects: SubjectsQuery;
}

export const NewHomework: React.FC<NewHomeworkProps> = ({
  open,
  setOpen,
  subjects,
}) => {
  const { burrito } = useApollo()!;
  const [createHomework] = useAddHomeworkMutation({ client: burrito });
  const [apiResponse, setApiResponse] = useState<string>("");
  const [input, setInput] = useState({
    title: "",
    deadline: "",
    description: "",
    tag: "",
    topicName: "",
    subjectId: -1,
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !Object.values(input).every((each) =>
        typeof each === "string" ? nonEmpty(each) : each > -1
      )
    ) {
      return;
    }

    try {
      const res = await createHomework({
        variables: {
          ...input,
          deadline: Date.parse(input.deadline),
        },
      });

      if (res.data && res.data.addHomework) {
        setApiResponse("Success homework added!");
      }
    } catch (err) {
      setApiResponse(parseGraphQLError(err));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
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
        <input
          value={input.topicName}
          onChange={handleChange}
          name="topicName"
          placeholder="Topic Name"
        />

        <select
          value={input.tag}
          onChange={handleChange}
          name="tag"
          style={{ width: "300px" }}
        >
          <option disabled value="">
            Choose a tag
          </option>
          <option value={"normal"}>Normal</option>
          <option value={"easy"}>Easy</option>
          <option value={"long-term"}>Long Term</option>
          <option value={"hard"}>Hard</option>
          <option value={"urgent"}>Urgent</option>
          <option value={"hard-and-urgent"}>Hard and Urgent</option>
        </select>

        <select
          value={input.subjectId}
          onChange={handleChange}
          name="subjectId"
          style={{ width: "300px" }}
        >
          <option disabled value={-1}>
            Choose the subject
          </option>
          {subjects.subjects &&
            subjects.subjects.map((each) => (
              <option key={each.name} value={each.id}>
                {each.name}
              </option>
            ))}
        </select>

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
