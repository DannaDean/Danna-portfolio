import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { selectIsAuth, reset } from "../../store/slices/authSlice";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "../../assets/css/Dashboard.scss";
import { Outlet } from "react-router-dom";
import { SignOut } from "akar-icons";
import Sidebar from "../dashboard/Sidebar";

const DashLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const { user } = useSelector((state) => state.auth);

  const [fullName, setFullName] = useState(user?.userData?.fullName || "");
  const [avatarPreview, setAvatarPreview] = useState("");

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, navigate]);

  useEffect(() => {
    if (user?.userData) {
      setFullName(user.userData.fullName || "");
      setAvatarPreview(user.userData.avatarUrl || "");
    }
  }, [user]);

  const onClickLogout = () => {
    confirmAlert({
      title: "Confirm to logout",
      message: "Are you sure you want to log out?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            dispatch(reset());
            window.localStorage.removeItem("token");
            navigate("/login");
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  return (
    <div className="dashboard-wrapper">
      <Sidebar />
      <div className="inner-wrapper">
        <div className="dashboard-header">
          <Link to={"/dashboard/account"} className="user">
            <div className="img-default">
              {/* Check if there's an avatarUrl */}
              {avatarPreview ? (
                <img src={avatarPreview} alt="User Avatar" className="user-img" />
              ) : (
                // If no avatar, show the first letters of the fullName
                <div className="avatar-initials">
                  {fullName
                    .split(" ")
                    .map((word) => word[0].toUpperCase())
                    .join("")}
                </div>
              )}
            </div>
            <div className="user-text">
              <p>{fullName}</p>
              <span>Admin</span>
            </div>
          </Link>
          <div className="logout" onClick={onClickLogout}>
            <SignOut strokeWidth={2} size={24} />
            <p>Logout</p>
          </div>
        </div>
        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashLayout;
