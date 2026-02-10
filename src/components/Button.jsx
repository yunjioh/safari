import React from "react";
import "./Button.css";

const Button = ({ text, onClick, bgColor, stroke }) => {
  return (
    <button
      className="main-button"
      onClick={onClick}
      style={{ backgroundColor: bgColor }}
    >
      {text}
    </button>
  );
};

export default Button;
