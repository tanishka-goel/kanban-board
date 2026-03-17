import React from "react";
import { Input } from "../ui/input";
import { readonly } from "zod";

const FormInput = ({
  labelTitle,
  type = "text",
  inputValue,
  placeholder,
  required = false,
  onChange,
  name,
  textarea,
  readOnly = false
}) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-sm font-medium text-gray-700">
        {labelTitle}
      </label>

      {textarea ? (<textarea
      type={type}
        name={name}
        value={inputValue}
        rows="4"
        placeholder={placeholder}
        required={required}
        onChange={onChange}
        className="h-10 border-gray-300"
        readOnly = {readOnly}
      />):(
<Input
        type={type}
        name={name}
        value={inputValue}
        placeholder={placeholder}
        required={required}
        onChange={onChange}
        className="h-10"
        readOnly = {readOnly}
      />
      )}

      
    </div>
  );
};

export default FormInput;