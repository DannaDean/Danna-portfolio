import { useState } from "react";
import { useDispatch } from "react-redux";
import { createSkill } from "../../../store/slices/skillsSlice";
import { useNavigate } from "react-router-dom";
import axios from "../../../store/axios";
import "../../../assets/css/Dashboard.scss";
import Form from "../../../components/partials/Form";
import InputField from "../../../components/partials/InputField";
import Button from "../../../components/partials/Button";
import { TrashCan } from "akar-icons";

const CreateSkill = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const handleChangeFile = (event) => {
    const file = event.target.files[0];

    if (file) {
      const previewURL = URL.createObjectURL(file);
      setImage(file);
      setImagePreview(previewURL);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imgUrl = "";

      // Upload desktop image if exists
      if (image) {
        const formData = new FormData();
        formData.append("image", image);

        const { data } = await axios.post("/upload/skills", formData);
        imgUrl = data.url;
      }

      const newSkill = {
        title,
        image: imgUrl,
      };

      await dispatch(createSkill(newSkill)).unwrap();

      navigate("/dashboard/skills");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <h2>Add a skill</h2>
      <Form onSubmit={handleSubmit} className="skill-form">
        <InputField
          type="text"
          placeholder="Skill title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <InputField
          type="file"
          placeholder="Image"
          onChange={handleChangeFile}
        />
        {imagePreview && (
          <div className="img-preview">
            <div
              className="delete"
              onClick={() => {
                setImage(null);
                setImagePreview("");
              }}
            >
             <TrashCan strokeWidth={2} size={16} />
            </div>
            <img src={imagePreview} alt="Uploaded Image" />
          </div>
        )}
        <Button type="submit" text="Create" />
      </Form>
    </>
  );
};

export default CreateSkill;
