import React from "react";

interface IButton {
  text: string;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>, method?: string) => void;
  disabled?: boolean
}

const Button: React.FC<IButton> = ({ text, className, onClick, disabled }) => {
  return (
    <button
      className={`p-2 rounded text-white font-medium ${className} ${disabled ? "cursor-not-allowed bg-gray-300" : "bg-primary"}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
