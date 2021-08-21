import React, { FormEvent, useState } from "react";
import { useApollo } from "../../contexts/ApolloContext";
import { Button, Modal } from "react-bootstrap";
import { CloseButton } from "../CloseButton";
import { HomeworkDetailsProps } from "../../types/props";

export const HomeworkDetails: React.FC<HomeworkDetailsProps> = ({
  homework,
  subjects,
  setHomework,
}) => {
  const { burrito } = useApollo()!;
  burrito;
  const prevState = {
    title: homework.title,
    deadline: new Date(homework.deadline).toISOString().split("T")[0],
    description: homework.description,
    tag: homework.tag,
    topicName: homework.topicName,
    subjectId: homework.subjectId,
  };
  const [input, setInput] = useState(prevState);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
    <Modal
      className="bootstrap-modal margin-top-nav"
      show={!!homework}
      onHide={() => setHomework(undefined)}
    >
      <Modal.Header>
        <Modal.Title>New Homework</Modal.Title>
        <CloseButton
          handleClick={() => {
            setHomework(undefined);
          }}
        />
      </Modal.Header>

      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <label>Title</label>
          <input
            value={input.title}
            onChange={handleChange}
            name="title"
            placeholder="Title"
            className="rounded-input emphasized margin-bottom-10"
          />

          <label>Deadline</label>
          <input
            value={input.deadline}
            onChange={handleChange}
            name="deadline"
            type="date"
            placeholder="Deadline"
            className="rounded-input emphasized margin-bottom-10"
          />

          <label>Topic Name</label>
          <input
            value={input.topicName}
            onChange={handleChange}
            name="topicName"
            placeholder="Topic Name"
            className="rounded-input emphasized margin-bottom-10"
          />

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

          <select
            value={input.subjectId}
            onChange={handleChange}
            name="subjectId"
            style={{ width: "40%" }}
            className="margin-10"
          >
            <option disabled value={""}>
              Modify subject
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
            placeholder="Description"
            className="rounded-input emphasized margin-bottom-10"
            style={{ width: "100%", resize: "none", height: "200px" }}
          ></textarea>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setHomework(undefined)} variant="warning">
            Close
          </Button>
          <Button type="submit" variant="success">
            Update
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};
