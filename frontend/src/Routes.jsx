import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ApplicationForm from "./components/ApplicationForm";
import ApplicationList from "./components/ApplicationList";
import UpdateApplication from "./components/UpdateApplication";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      <Route path="/home" element={<ApplicationForm />} />
      <Route path="/applications" element={<ApplicationList />} />
      <Route path="/update" element={<UpdateApplication />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default AppRoutes;
