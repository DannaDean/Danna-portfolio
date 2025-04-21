import { Routes, Route } from 'react-router-dom';
import './assets/css/App.scss';

import Layout from './components/Layout';
import DashLayout from './components/DashLayout';

import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/dashboard/Dashboard';

function App() {
  return (
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
        {/* <Route path="create" element={<CreateProject />} /> */}
        {/* <Route path="edit/:id" element={<EditProject />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
