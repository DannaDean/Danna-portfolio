import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateUser, deleteImage } from "../../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "../../../store/axios";
import "../../../assets/css/Dashboard.scss";
import Form from "../../../components/partials/Form";
import InputField from "../../../components/partials/InputField";
import Button from "../../../components/partials/Button";
import { TrashCan } from "akar-icons";
import getImageSrc from "../../../utils/getImageSrc";

const Account = () => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [fullName, setFullName] = useState(user?.userData?.fullName || "");
  const [email, setEmail] = useState(user?.userData?.email || "");
  const [password, setPassword] = useState(user?.userData?.password || "");
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  
  useEffect(() => {
      dispatch(getUser());
    }, [dispatch]);

  useEffect(() => {
    if (user?.userData) {
      setFullName(user.userData.fullName || "");
      setEmail(user.userData.email || "");
      setAvatarPreview(user.userData.avatarUrl || "");
    }
  }, [user]);  
  
  const handleChangeFile = (event) => {
    const file = event.target.files[0];

    if (file) {
      const previewURL = URL.createObjectURL(file);
      setAvatar(file);
      setAvatarPreview(previewURL);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


   try {
    let avatarUrl = avatarPreview;

    if (avatar) {
      const formData = new FormData();
      formData.append("image", avatar);

      const { data } = await axios.post("/upload/avatars", formData);
      avatarUrl = data.url;
    }

    const updatedUser = {
      fullName, 
        email,
        password,
        avatarUrl: avatarUrl || "",
    };

    await dispatch(updateUser(updatedUser)).unwrap();
    navigate("/dashboard");
   } catch (error) {
    console.error("Error uploading avatar:", error);
   }
  };

  const handleDeleteImage = async () => {
    try {
        await dispatch(deleteImage()).unwrap();
        setAvatarPreview(null);
    } catch (error) {
        console.error("Error deleting image:", error);
    }
  }

  return (
    <>
      <h2>Edit - {fullName}</h2>
      <Form onSubmit={handleSubmit} className={"form-account"}>
        {avatarPreview && (
          <div className="img-preview">
            <div className="delete" onClick={() => handleDeleteImage()}>
              <TrashCan strokeWidth={2} size={16} />
            </div>
            <img src={getImageSrc(avatarPreview, backendUrl)} alt="Uploaded Preview" />
          </div>
        )}
        <InputField
          type="file"
          label="Avatar URL"
          onChange={handleChangeFile}
        />
        <InputField
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <InputField
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" text="Update" />
      </Form>
    </>
  );
};

export default Account;
