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
  const [errors, setErrors] = useState({});
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); 

    try {
      const newFact = {
        title,
        text,
      };

      await dispatch(createFact(newFact)).unwrap();
      navigate("/dashboard/facts");
    } catch (error) {
      const data = error.response?.data || error;

      if (Array.isArray(data)) {
        const formattedErrors = {};
        data.forEach((err) => {
          formattedErrors[err.path] = err.msg;
        });
        setErrors(formattedErrors);
      } else {
        setErrors({ global: "Something went wrong. Please try again." });
      }
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
          helperText={errors.title}
        />
        <InputField
          type="textarea"
          placeholder="Text"
          rows={5}
          value={text}
          onChange={(e) => setText(e.target.value)}
          helperText={errors.text}
        />
        <Button type="submit" text="Create"></Button>
      </Form>
    </>
  );
};

export default CreateFact;
