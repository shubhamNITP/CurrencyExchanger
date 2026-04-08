import React, { useRef, useCallback } from "react";

const AmountInput = ({ value, onChange, hasError }) => {
  const wrapperRef = useRef(null);

  const handleChange = useCallback(
    (e) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") {
        e.target.blur();
      }
    },
    []
  );

  return (
    <div className="input-group">
      <label htmlFor="amount">Amount</label>
      <div
        className={`input-wrapper ${hasError ? "shake" : ""}`}
        ref={wrapperRef}
      >
        <i className="fas fa-money-bill-wave"></i>
        <input
          type="number"
          id="amount"
          placeholder="Enter amount"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          min="0.01"
          step="0.01"
        />
      </div>
    </div>
  );
};

export default React.memo(AmountInput);