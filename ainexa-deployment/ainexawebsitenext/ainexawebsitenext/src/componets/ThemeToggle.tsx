import React from "react";
import "./css/ThemeToggle.css";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../store/Theme";
import { RootState } from "../store/store";

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const currentTheme = useSelector((state: RootState) => state.theme.theme);

  const toggleTheme = () => {
    dispatch(setTheme({theme : currentTheme === "light" ? "dark" : "light"}));
  };

  return (
    <div className="theme-toggle-container">
      <label className="switch">
        <input type="checkbox" checked={currentTheme === "dark"} onChange={toggleTheme} />
        <span className="slider">
          <span className="icon sun">☀️</span>  
          <span className="icon moon">🌙</span>
        </span>
      </label>
    </div>
  );
};

export default ThemeToggle;
