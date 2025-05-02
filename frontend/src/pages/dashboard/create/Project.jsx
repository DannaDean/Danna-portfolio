import { useState } from "react";
import { useDispatch } from "react-redux";
import { createProject } from "../../../store/slices/projectsSlice";
import { useNavigate } from "react-router-dom";
import axios from "../../../store/axios";
import "../../../assets/css/Dashboard.scss";
import Form from "../../../components/partials/Form";
import InputField from "../../../components/partials/InputField";
import Button from "../../../components/partials/Button";
import { TrashCan } from "akar-icons";

const CreateProject = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [categories, setCategories] = useState("");
  const [deskImg, setDeskImg] = useState(null);
  const [mobileImg, setMobileImg] = useState(null);
  const [deskImgPreview, setDeskImgPreview] = useState("");
  const [mobileImgPreview, setMobileImgPreview] = useState("");

  const handleChangeFile = (event, type) => {
    const file = event.target.files[0];

    if (file) {
      const previewURL = URL.createObjectURL(file);
      if (type === "desktop") {
        setDeskImg(file);
        setDeskImgPreview(previewURL);
      } else if (type === "mobile") {
        setMobileImg(file);
        setMobileImgPreview(previewURL);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let desktopImgUrl = "";
      let mobileImgUrl = "";

      // Upload desktop image if exists
      if (deskImg) {
        const formData = new FormData();
        formData.append("image", deskImg);

        const { data } = await axios.post("/upload/projects", formData);
        desktopImgUrl = data.url;
      }

      // Upload mobile image if exists
      if (mobileImg) {
        const formData = new FormData();
        formData.append("image", mobileImg);

        const { data } = await axios.post("/upload/projects", formData);
        mobileImgUrl = data.url;
      }

      const newProject = {
        title,
        link,
        categories: categories.split(","),
        deskImg: desktopImgUrl,
        mobileImg: mobileImgUrl,
      };

      await dispatch(createProject(newProject)).unwrap();

      navigate("/dashboard/projects");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <h2>Create a project</h2>
      <Form onSubmit={handleSubmit} className="project-form">
        <InputField
          type="text"
          placeholder="Project title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <InputField
          type="text"
          placeholder="Project link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <InputField
          type="text"
          placeholder="Category"
          value={categories}
          onChange={(e) => setCategories(e.target.value)}
          required
        />
        <div className="combine-inputs">
          <div className="combine-box">
            <InputField
              type="file"
              placeholder="Image for desktop"
              onChange={(e) => handleChangeFile(e, "desktop")}
            />
            {deskImgPreview && (
              <div className="img-preview">
                <div
                  className="delete"
                  onClick={() => {
                    setDeskImg(null);
                    setDeskImgPreview("");
                  }}
                >
                  <TrashCan strokeWidth={2} size={24} />
                </div>
                <img src={deskImgPreview} alt="Uploaded Desktop Preview" />
              </div>
            )}
          </div>
          <div className="combine-box">
            <InputField
              type="file"
              placeholder="Image for mobile"
              onChange={(e) => handleChangeFile(e, "mobile")}
            />
            {mobileImgPreview && (
              <div className="img-preview">
                <div
                  className="delete"
                  onClick={() => {
                    setMobileImg(null);
                    setMobileImgPreview("");
                  }}
                >
                  <TrashCan strokeWidth={2} size={16} />
                </div>
                <img src={mobileImgPreview} alt="Uploaded Mobile Preview" />
              </div>
            )}
          </div>
        </div>
        <Button type="submit" text="Create" />
      </Form>
    </>
  );
};

export default CreateProject;
