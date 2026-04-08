import React from "react";

const ConvertButton = ({ onClick, loading }) => {
  return (
    <button
      className={`convert-btn ${loading ? "loading" : ""}`}
      onClick={onClick}
      disabled={loading}
      type="button"
    >
      {loading ? (
        <>
          <i className="fas fa-spinner fa-spin"></i>
          <span>Converting...</span>
        </>
      ) : (
        <>
          <i className="fas fa-exchange-alt"></i>
          <span>Convert</span>
        </>
      )}
    </button>
  );
};

export default React.memo(ConvertButton);