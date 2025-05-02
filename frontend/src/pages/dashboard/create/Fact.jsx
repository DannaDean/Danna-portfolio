import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createFact } from "../../../store/slices/factsSlice";
import { useNavigate } from "react-router-dom";
import "../../../assets/css/Dashboard.scss";
import Form from "../../../components/partials/Form";
import InputField from "../../../components/partials/InputField";
import Button from "../../../components/partials/Button";

const CreateFact = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newFact = {
        title,
        text,
      };

      await dispatch(createFact(newFact)).unwrap();
      navigate("/dashboard/facts");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h2>Add a fact</h2>
      <Form onSubmit={handleSubmit}>
        <InputField
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <InputField
          type="textarea"
          placeholder="Text"
          rows={5}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button type="submit" text="Create"></Button>
      </Form>
    </>
  );
};

export default CreateFact;
