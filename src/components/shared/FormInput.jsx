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
        className={` ${className} p-2 border-2 placeholder:text-sm rounded-lg border-gray-300`}
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
         className={` ${className} h-10`}
      />
      )}

      
    </div>
  );
};

export default FormInput;