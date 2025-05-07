import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSkill, deleteImage, getSkills } from "../../../store/slices/skillsSlice";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../../store/axios";
import "../../../assets/css/Dashboard.scss";
import Form from "../../../components/partials/Form";
import InputField from "../../../components/partials/InputField";
import Button from "../../../components/partials/Button";
import { TrashCan } from "akar-icons";
import getImageSrc from "../../../utils/getImageSrc";

const EditSkill = () => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
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
        image: imageUrl || "",
      };

      await dispatch(updateSkill({ id, updateData: updatedSkill })).unwrap();

      navigate("/dashboard/skills");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteImage = async () => {
    try {
      await dispatch(deleteImage(id)).unwrap();
      setImagePreview(null);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <h2>Update skill - {title}</h2>
      <Form onSubmit={handleSubmit} className="skill-form">
        <InputField
          type="text"
          placeholder="Skill title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
              onClick={() => handleDeleteImage()}
            >
             <TrashCan strokeWidth={2} size={16} />
            </div>
            <img src={getImageSrc(imagePreview, backendUrl)} 
              alt="Uploaded Preview" />
          </div>
        )}
        <Button type="submit" text="Update" />
      </Form>
    </>
  );
};

export default EditSkill;
