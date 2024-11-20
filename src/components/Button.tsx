import React from "react";

interface Props {
  label: string;
  onClick: () => void;
}

const Button = ({ label, onClick }: Props) => {
  return (
    <button
      className="bg-[#1a1919] text-white p-2 rounded-md px-4"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
