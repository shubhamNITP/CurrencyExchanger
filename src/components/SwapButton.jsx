import React, { useState } from "react";

const SwapButton = ({ onSwap }) => {
  const [rotated, setRotated] = useState(false);

  const handleClick = () => {
    setRotated((prev) => !prev);
    onSwap();
  };

  return (
    <button
      className={`swap-btn ${rotated ? "rotated" : ""}`}
      onClick={handleClick}
      title="Swap currencies"
      type="button"
    >
      <i className="fas fa-right-left"></i>
    </button>
  );
};

export default React.memo(SwapButton);