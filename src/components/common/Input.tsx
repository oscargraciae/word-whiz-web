import React from "react";

interface InputProps {
  className?: string;
  onClick?: () => void;
  placeholder?: string;
}

export const Input = ({ className, placeholder, onClick }: InputProps) => {
  return (
    <div>
      <input
        placeholder={placeholder}
        className={
          "w-full px-3 py-3 text-sm border rounded-lg outline-none " + className
        }
      />
    </div>
  );
};
