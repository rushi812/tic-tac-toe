import React from "react";

const Square = ({ value, onClick, disabled }) => {
  return (
    <button
      className={value ? `square ${value}` : `square`}
      disabled={disabled}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default Square;
