import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFact, getFacts } from "../../../store/slices/factsSlice";
import { useNavigate, useParams } from "react-router-dom";
import "../../../assets/css/Dashboard.scss";
import Form from "../../../components/partials/Form";
import InputField from "../../../components/partials/InputField";
import Button from "../../../components/partials/Button";

const EditFact = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { facts } = useSelector((state) => state.facts);
  const fact = facts.find((f) => f._id === id);

  const [errors, setErrors] = useState({});
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    dispatch(getFacts());
  }, [dispatch]);

  useEffect(() => {
    if (fact) {
      setTitle(fact.title);
      setText(fact.text || "");
    }
  }, [fact]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      const updateData = {
        title,
        text,
      };

      await dispatch(updateFact({ id, updateData })).unwrap();

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
      <h2>Edit Fact - {title}</h2>
      <Form onSubmit={handleSubmit}>
        <InputField
          type="text"
          label="Title"
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
        <Button type="submit" text="Update" />
      </Form>
    </>
  );
};

export default EditFact;
