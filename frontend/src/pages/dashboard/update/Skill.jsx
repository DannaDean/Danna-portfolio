import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSkill, getSkills } from "../../../store/slices/skillsSlice";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../../store/axios";
import "../../../assets/css/Dashboard.scss";
import Form from "../../../components/partials/Form";
import InputField from "../../../components/partials/InputField";
import Button from "../../../components/partials/Button";

const EditSkill = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { skills } = useSelector((state) => state.skills);
  const skill = skills.find((skill) => skill._id === id);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    dispatch(getSkills());
  }, [dispatch]);

  useEffect(() => {
    if (skill) {
      setTitle(skill.title);
      setImagePreview(skill.image);
    }
  }, [skill]);

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
      let imageUrl = imagePreview;

      if (image) {
        const formData = new FormData();
        formData.append("image", image);

        const { data } = await axios.post("/upload/skills", formData);
        imageUrl = data.url;
      }

      const updatedSkill = {
        title,
        image: imageUrl,
      };

      await dispatch(
        updateSkill({ id, updateData: updatedSkill })
      ).unwrap();

      navigate("/dashboard/skills");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="container">
        <h2>Update skill: </h2>
        <Form onSubmit={handleSubmit}>
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
            onChange={ handleChangeFile }
          />
          {imagePreview && (
            <>
              <div
                className="delete"
                onClick={() => {
                  setImage(null);
                  setImagePreview("");
                }}
              >
                x
              </div>
              <img src={imagePreview} alt="Uploaded Preview" />
            </>
          )}
          <Button type="submit" text="Update" />
        </Form>
      </div>
    </>
  );
};

export default EditSkill;
