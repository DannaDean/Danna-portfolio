import React from "react";
import "../assets/css/Dashboard.scss";
import { Outlet } from "react-router-dom";
import Sidebar from './dashboard/Sidebar';

const DashLayout = () => {
  return (
    <div className="dashboard-wrapper">
        <Sidebar />

        <main className="dashboard-content">
            <Outlet />
        </main>
    </div>
  );
};

export default DashLayout;
