import React, { useContext,useEffect,useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import profileIcon from "../icons/profile.svg";
import searchIcon from "../icons/search.svg";
import settingsIcon from "../icons/settings.svg";
import themeToggleIcon from "../icons/theme-toggle.svg";

const Navbar = ({fetchVideos}) => {
  const { user, setShowProfileDropdown, showProfileDropdown, login, logout } = useContext(AuthContext);
  const { toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleProfileClick = () => {
    if (user) {
      setShowProfileDropdown((prev) => !prev);
    } else {
      navigate("/login");
    }
  };

 

  return (
    <nav className="navbar">

      {/* Profile Button */}
      <div className="nav-left">
        <button className="btn profile-btn" onClick={handleProfileClick}>
          <img src={profileIcon} alt="Profile" className="profile-icon" />
        </button>{user ? user.username : "Login"}

        {/* Profile Dropdown*/}
        {user && showProfileDropdown && (
          <div className="profile-dropdown" ref={dropdownRef}>
            <p><b>Username:</b> {user.username}</p>
            <p><b>Email:</b> {user.email}</p>
            <button className="btn btn-danger logout-btn" onClick={logout}>Logout</button>
          </div>
        )}
      </div>

      {/* Search Bar */}
      <div className="search-bar-container">
        <input type="text" className="form-control search-input" placeholder="Search..." onChange={(e)=>fetchVideos(e.target.value)} />
        <img src={searchIcon} alt="Search" className="search-icon" />
      </div>

      {/* Theme & Settings icon */}
      <div className="nav-right">
        <img src={themeToggleIcon} alt="Theme Toggle" className="theme-icon" onClick={toggleTheme} />
        <img src={settingsIcon} alt="Settings" className="settings-icon" />
      </div>
    </nav>
  );
};

export default Navbar;
