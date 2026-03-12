import React from 'react'
import { Button } from '../ui/button'

const NewButton = ({ text, onClick, className = "" }) => {
  return (
    <div>
      <Button
        className={`bg-emerald-700 text-white hover:bg-emerald-800 ${className}`}
        onClick={onClick}
        variant="outline"
      >
        {text}
      </Button>
    </div>
  );
};

export default NewButton;
