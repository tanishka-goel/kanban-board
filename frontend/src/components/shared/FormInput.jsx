import React from "react";
import { Input } from "../ui/input";
import { readonly } from "zod";

const FormInput = ({
  className,
  labelTitle,
  type = "text",
  inputValue,
  placeholder,
  required = false,
  onChange,
  name,
  textarea,
  error,
  readOnly = false,
  
}) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-sm font-medium text-gray-700">
        {labelTitle} {required && <span className="text-red-500">*</span>}
      </label>

      {textarea ? (<textarea
      type={type}
        name={name}
        value={inputValue}
        rows="3"
        placeholder={placeholder}
        required={required}
        onChange={onChange}
       className={`${className} p-2 border-2 placeholder:text-sm rounded-lg ${
            error ? "border-red-500" : "border-gray-300" 
          }`}
        readOnly = {readOnly}
      />):(
<Input
        type={type}
        name={name}
        value={inputValue}
        placeholder={placeholder}
        required={required}
        onChange={onChange}
        readOnly = {readOnly}
        className={`${className} h-10 ${
            error ? "border-red-500" : "" 
          }`}
      />
      )}

      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default FormInput;