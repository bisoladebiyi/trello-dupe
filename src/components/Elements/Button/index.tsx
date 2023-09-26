import React from "react";
import { IButton } from "../../../utils/interfaces/interfaces";

const Button: React.FC<IButton> = ({ text, className, onClick, disabled, type }) => {
  return (
    <button
      className={`p-2 rounded font-medium ${className} ${disabled ? "cursor-not-allowed text-white bg-gray-300" : type ? "bg-gray-300 text-dark" : "text-white bg-primary"}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
