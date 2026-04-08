import React from "react";

const formatNumber = (num) => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
};

const ResultDisplay = ({ loading, error, result, lastUpdated }) => {
  // Loading state
  if (loading) {
    return (
      <div className="result result-loading">
        <i className="fas fa-spinner fa-spin"></i>
        <span>Converting...</span>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="result result-error">
        <i className="fas fa-exclamation-triangle"></i>
        <span>{error}</span>
      </div>
    );
  }

  // Result state
  if (result) {
    return (
      <>
        <div className="result result-success">
          <i className="fas fa-chart-line"></i>
          <div className="result-text">
            <span className="result-main">
              {formatNumber(result.amount)} {result.from} ={" "}
              <strong>
                {formatNumber(result.converted)} {result.to}
              </strong>
            </span>
            <span className="result-rate">
              1 {result.from} = {result.rate.toFixed(4)} {result.to}
            </span>
          </div>
        </div>
        {lastUpdated && (
          <div className="last-updated">
            Rates last updated: {lastUpdated}
          </div>
        )}
      </>
    );
  }

  // Default state
  return (
    <div className="result">
      <i className="fas fa-chart-line"></i>
      <span>Enter an amount and click Convert</span>
    </div>
  );
};

export default React.memo(ResultDisplay);