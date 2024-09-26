import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import VCard from "./VCard";
import "@fortawesome/fontawesome-free/css/all.css";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../image/logo.svg";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "accessToken" && event.newValue === null) {
        navigate("/");
      }
    };

    window.addEventListener("storage", handleStorageChange);

    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/");
    }

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("accessToken");
    window.dispatchEvent(new StorageEvent("storage", { key: "accessToken", newValue: null }));
    alert("You have been logged out successfully");
    navigate("/");
  };

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
    setShowWelcome(false);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(prev => !prev);
  };

  return (
    <div className="d-flex vh-100">
      <div
        style={{
          backgroundColor: "#d4d4d4",
          width: sidebarCollapsed ? "10%" : "20%",
          minHeight: "100vh",
          transition: "width 0.3s",
          position: "fixed",
          zIndex: 100, // Ensure it appears above other content
        }}
      >
        <div className="p-3 d-flex justify-content-between align-items-center">
          <img
            src={logo}
            alt="Logo"
            className={`logo d-none d-md-block`}
            style={{ height: "45px", width: "auto" }}
          />
          <div
            className="burger-icon"
            onClick={toggleSidebar}
            style={{ cursor: "pointer", fontSize: "1.5em" }}
            title="Toggle Sidebar" // Add title for better accessibility
          >
            <i className="fas fa-bars"></i>
          </div>
        </div>

        <div>
          <ul className="list-unstyled mt-3">
            <li
              className={`d-flex align-items-center p-2 rounded ${activeMenu === "vcard" ? "bg-secondary text-white" : ""}`}
              onClick={() => handleMenuClick("vcard")}
            >
              <i className="fas fa-id-card me-2"></i>
              <span className={`d-none d-md-inline`}>vCard</span>
            </li>
          </ul>
        </div>
      </div>

      <div
        className="flex-grow-1 main-content"
        style={{
          marginLeft: sidebarCollapsed ? "80px" : "20%",
          height: "100vh",
          overflowY: "hidden",
          position: "relative",
          transition: "margin-left 0.3s",
        }}
      >
        {/* Responsive Logo for Mobile */}
        <img
          src={logo}
          alt="Logo"
          className="d-md-none position-fixed"
          style={{
            top: "10px",
            left: sidebarCollapsed ? "calc(10% + 15px)" : "calc(20% + 15px)",
            height: "40px",
            zIndex: 1000,
          }}
        />

        <button
          className="btn btn-primary position-absolute"
          style={{ top: "10px", right: "10px" }}
          onClick={handleLogout}
        >
          Logout
        </button>

        {showWelcome && (
          <div className="d-flex justify-content-center align-items-center" style={{ height: "calc(100vh - 50px)" }}>
            <h2 className="text-center text-primary welcome-heading" style={{ fontSize: "2.5em", fontFamily: "Cursive" }}>
              Welcome to Dashboard
            </h2>
          </div>
        )}

        {activeMenu === "vcard" && (
          <div
            className="scrollable qr-container"
            style={{
              height: "calc(100vh - 50px)",
              overflowY: "auto",
              marginTop: "50px",
              marginLeft: "30px",
              paddingRight: "10px",
              marginBottom: "0",
            }}
          >
            <VCard />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
