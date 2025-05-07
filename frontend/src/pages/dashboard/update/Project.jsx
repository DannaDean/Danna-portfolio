import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProject,
  deleteImage,
  getProjects,
} from "../../../store/slices/projectsSlice";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../../store/axios";
import "../../../assets/css/Dashboard.scss";
import Form from "../../../components/partials/Form";
import InputField from "../../../components/partials/InputField";
import Button from "../../../components/partials/Button";
import { TrashCan } from "akar-icons";
import getImageSrc from "../../../utils/getImageSrc";

const EditProject = () => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { projects } = useSelector((state) => state.projects);
  const project = projects.find((p) => p._id === id);

  const [errors, setErrors] = useState({});

  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [categories, setCategories] = useState("");
  const [deskImg, setDeskImg] = useState(null);
  const [mobileImg, setMobileImg] = useState(null);
  const [deskImgPreview, setDeskImgPreview] = useState("");
  const [mobileImgPreview, setMobileImgPreview] = useState("");

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  useEffect(() => {
    if (project) {
      setTitle(project.title);
      setLink(project.link || "");
      setCategories(project.categories.join(", ") || "");
      setDeskImgPreview(project.deskImg);
      setMobileImgPreview(project.mobileImg);
    }
  }, [project]);

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
    setErrors({});

    try {
      let desktopImgUrl = deskImgPreview;
      let mobileImgUrl = mobileImgPreview;

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

      const updatedProject = {
        title,
        link,
        categories: categories.split(","),
        deskImg: desktopImgUrl || "",
        mobileImg: mobileImgUrl || "",
      };

      await dispatch(
        updateProject({ id, updateData: updatedProject })
      ).unwrap();

      navigate("/dashboard/projects");
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

  const handleDeleteImage = async (imageType) => {
    try {
      // Dispatch the delete image action
      await dispatch(
        deleteImage({ projectId: project._id, imageType })
      ).unwrap();

      // Update state to remove the image preview
      if (imageType === "desktop") {
        setDeskImgPreview(null); // This will remove the desktop image preview immediately
      } else if (imageType === "mobile") {
        setMobileImgPreview(null); // This will remove the mobile image preview immediately
      }
    } catch (error) {
      console.error("Error deleting the image", error);
    }
  };

  return (
    <>
      <h2>Update project - {title}</h2>
      <Form onSubmit={handleSubmit}>
        <InputField
          type="text"
          placeholder="Project title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          helperText={errors.title}
        />
        <InputField
          type="text"
          placeholder="Project link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          helperText={errors.link}
        />
        <InputField
          type="text"
          placeholder="Category"
          value={categories}
          onChange={(e) => setCategories(e.target.value)}
          helperText={errors.categories}
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
                  onClick={() => handleDeleteImage("desktop")}
                >
                  <TrashCan strokeWidth={2} size={16} />
                </div>
                <img
                  src={getImageSrc(deskImgPreview, backendUrl)}
                  alt="Uploaded Desktop Preview"
                />
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
                  onClick={() => handleDeleteImage("mobile")}
                >
                  <TrashCan strokeWidth={2} size={16} />
                </div>
                <img
                  src={getImageSrc(mobileImgPreview, backendUrl)}
                  alt="Uploaded Mobile Preview"
                />
              </div>
            )}
          </div>
        </div>
        <Button type="submit" text="Update" />
      </Form>
    </>
  );
};

export default EditProject;
