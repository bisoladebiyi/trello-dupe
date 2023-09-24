import React from "react";

interface IButton {
  text: string;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>, method?: string) => void;
}

const Button: React.FC<IButton> = ({ text, className, onClick }) => {
  return (
    <button
      className={`p-2 rounded bg-primary text-white font-medium ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
