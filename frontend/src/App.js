import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuth, getUser } from '../src/store/slices/authSlice';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import './assets/css/App.scss';

import Layout from '../src/components/layouts/Layout';
import DashLayout from './components/layouts/DashLayout';

import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/dashboard/Dashboard';
// Projects
import Projects from './pages/dashboard/views/Projects';
import CreateProject from './pages/dashboard/create/Project';
import EditProject from './pages/dashboard/update/Project';
// Skills
import Skills from './pages/dashboard/views/Skills';
import CreateSkill from './pages/dashboard/create/Skill';
import EditSkill from './pages/dashboard/update/Skill';
// Facts
import Facts from './pages/dashboard/views/Facts';
import CreateFact from './pages/dashboard/create/Fact';
import EditFact from './pages/dashboard/update/Fact';

function App() {
  const dispatch = useDispatch()
  const isAuth = useSelector(selectIsAuth)

  React.useEffect(() => {
    dispatch(getUser())
  }, [])

  return (
    <>
      <ToastContainer />
      <Routes>
        {/* Public Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>


        {/* Dashboard Layout */}
        <Route path="/dashboard" element={<DashLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="projects" element={<Projects />} />
          <Route path="create/project" element={<CreateProject />} />
          <Route path="edit/project/:id" element={<EditProject />} />
          <Route path="skills" element={<Skills />} />
          <Route path="create/skill" element={<CreateSkill />} />
          <Route path="edit/skill/:id" element={<EditSkill />} />
          <Route path="facts" element={<Facts />} />
          <Route path="create/fact" element={<CreateFact />} />
          <Route path="edit/fact/:id" element={<EditFact />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
