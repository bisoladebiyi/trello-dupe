import React from "react";

interface IButton {
  text: string;
  className?: string;
}

const Button: React.FC<IButton> = ({ text, className }) => {
  return (
    <button
      className={`p-2 rounded bg-primary text-white font-medium ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
