import React from "react";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/appContext";

const Dashboard = () => {
  const { user, logoutUser } = useAppContext();
  const navigate = useNavigate();

  const onButtonClick = () => {
    logoutUser();
    navigate("/login");
  };
  return (
    <div>
      <h1>Dashboard: Hello {user.name}</h1>
      <button onClick={() => onButtonClick()}>Logout</button>
      <Outlet />
    </div>
  );
};

export default Dashboard;
