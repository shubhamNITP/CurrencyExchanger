import React, { useMemo } from "react";
import countryList from "../data/countryList";

const CurrencySelector = ({ label, currencies, selected, onChange }) => {
  const countryCode = useMemo(() => {
    return countryList[selected] || "US";
  }, [selected]);

  const flagUrl = `https://flagsapi.com/${countryCode}/flat/64.png`;

  return (
    <div className="currency-box">
      <label>{label}</label>
      <div className="select-wrapper">
        <img
          className="flag"
          src={flagUrl}
          alt={`${selected} flag`}
          onError={(e) => {
            e.target.src = `https://flagsapi.com/US/flat/64.png`;
          }}
        />
        <select value={selected} onChange={(e) => onChange(e.target.value)}>
          {currencies.map((curr) => (
            <option key={curr} value={curr}>
              {curr}
            </option>
          ))}
        </select>
        <i className="fas fa-chevron-down select-arrow"></i>
      </div>
    </div>
  );
};

export default React.memo(CurrencySelector);