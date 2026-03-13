import React from 'react'
import { Button } from '../ui/button'

const NewButton = ({ text, className = "", type = "button", ...buttonProps }) => {
  return (
    <div>
      <Button
        type={type}
        className={`bg-emerald-700 text-white hover:bg-emerald-800 ${className}`}
        variant="outline"
        {...buttonProps}
      >
        {text}
      </Button>
    </div>
  );
};

export default NewButton;
