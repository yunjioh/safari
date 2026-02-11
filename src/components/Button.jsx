import React from "react";
import "./Button.css";

const Button = ({ text, onClick, bgColor, href }) => {
  return (
    <a
      href={href}
      className="main-button"
      onClick={onClick}
      style={{ backgroundColor: bgColor }}
    >
      {text}
    </a>
  );
};

export default Button;
