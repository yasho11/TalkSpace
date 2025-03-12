import React from "react";
import { useNavigate } from "react-router-dom";
import useauthStore from "../store/authStore";

function LogoutButton() {
  const navigate = useNavigate();
  const { logout } = useauthStore();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <button onClick={handleLogout} className="btn-logout">
      Logout
    </button>
  );
}

export default LogoutButton;
