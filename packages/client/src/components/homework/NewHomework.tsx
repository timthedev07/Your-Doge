import React, { FormEvent, useState } from "react";
import { nonEmpty, parseGraphQLError } from "shared";
import { useApollo } from "../../contexts/ApolloContext";
import { useAddHomeworkMutation } from "../../generated/sub-graphql";
import { Button, Modal } from "react-bootstrap";
import { CloseButton } from "../CloseButton";
import { NewHomeworkProps } from "../../types/props";
import { Alert } from "../Alert";
import { SubjectsSelect } from "../SubjectsSelect";

export const NewHomework: React.FC<NewHomeworkProps> = ({
  open,
  setOpen,
  subjects,
}) => {
  const { burrito } = useApollo()!;
  const [createHomework] = useAddHomeworkMutation({ client: burrito });
  const [active, setActive] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [input, setInput] = useState({
    title: "",
    deadline: "",
    description: "",
    tag: "",
    topicName: "",
    subjectId: "",
  });

  const displayError = (message: string) => {
    setActive(true);
    setMessage(message);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !Object.values(input).every((each) =>
        typeof each === "string" ? nonEmpty(each) : each > -1
      )
    ) {
      return displayError("Fill all of them out, don't disappoint Doge.");
    }

    try {
      const res = await createHomework({
        variables: {
          ...input,
          deadline: Date.parse(input.deadline),
          subjectId: parseInt(input.subjectId),
        },
      });

      if (res.data && res.data.addHomework) {
        displayError("Success homework added!");
      }
    } catch (err) {
      displayError(parseGraphQLError(err));
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

  return (
    <>
      <Alert
        text={message}
        active={active}
        setActive={setActive}
        type="warning"
      />
      <Modal
        className="bootstrap-modal margin-top-nav"
        show={open}
        onHide={() => setOpen(false)}
      >
        <Modal.Header>
          <Modal.Title>New Homework</Modal.Title>
          <CloseButton
            handleClick={() => {
              setOpen(false);
            }}
          />
        </Modal.Header>

        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <label className="homework-panel-input-label">Title</label>
            <br />
            <input
              value={input.title}
              onChange={handleChange}
              name="title"
              placeholder="Title"
              className="margin-bottom-10"
            />
            <br />
            <label className="homework-panel-input-label">Deadline</label>
            <br />
            <input
              value={input.deadline}
              onChange={handleChange}
              name="deadline"
              type="date"
              placeholder="Deadline"
              className="margin-bottom-10"
            />
            <br />
            <label className="homework-panel-input-label">Topic Name</label>
            <br />
            <input
              value={input.topicName}
              onChange={handleChange}
              name="topicName"
              placeholder="Topic Name"
              className="margin-bottom-10"
            />
            <br />
            <select
              value={input.tag}
              onChange={handleChange}
              name="tag"
              style={{ width: "40%" }}
              className="margin-10"
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

            <SubjectsSelect
              subjects={subjects}
              onChange={handleChange}
              value={input.subjectId}
              name="sujectId"
              placeholder="Select the subject"
              className="margin-10"
            />

            <br />
            <textarea
              value={input.description}
              onChange={handleChange}
              name="description"
              placeholder="Description"
              className="margin-bottom-10"
              style={{ width: "100%", resize: "none", height: "200px" }}
            ></textarea>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setOpen(false)} variant="warning">
              Cancel
            </Button>
            <Button type="submit" variant="success">
              Submit
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};
