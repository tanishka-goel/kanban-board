import React from "react";
import { Input } from "../ui/input";

const FormInput = ({
  labelTitle,
  type = "text",
  inputValue,
  placeholder,
  required = false,
  onChange,
  name,
}) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-sm font-medium text-gray-700">
        {labelTitle}
      </label>

      <Input
        type={type}
        name={name}
        value={inputValue}
        placeholder={placeholder}
        required={required}
        onChange={onChange}
        className="h-10"
      />
    </div>
  );
};

export default FormInput;