import React, { useState, useCallback, useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import Header from "./components/Header";
import AmountInput from "./components/AmountInput";
import CurrencySelector from "./components/CurrencySelector";
import SwapButton from "./components/SwapButton";
import ConvertButton from "./components/ConvertButton";
import ResultDisplay from "./components/ResultDisplay";
import useExchangeRate from "./hooks/useExchangeRate";
import useDebounce from "./hooks/useDebounce";

const App = () => {
  const [amount, setAmount] = useState("1");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [inputError, setInputError] = useState(false);

  const {
    currencies,
    loading,
    error,
    conversionResult,
    lastUpdated,
    convert,
    setError,
  } = useExchangeRate();

  // Debounce the amount input
  const debouncedAmount = useDebounce(amount, 800);

  // Set defaults when currencies load
  useEffect(() => {
    if (currencies.length > 0) {
      if (currencies.includes("USD")) setFromCurrency("USD");
      if (currencies.includes("INR")) setToCurrency("INR");
    }
  }, [currencies]);

  // Auto-convert on debounced amount change
  useEffect(() => {
    const numAmount = parseFloat(debouncedAmount);
    if (numAmount && numAmount > 0 && currencies.length > 0) {
      convert(numAmount, fromCurrency, toCurrency);
    }
  }, [debouncedAmount, fromCurrency, toCurrency, convert, currencies]);

  // Handle manual convert click
  const handleConvert = useCallback(() => {
    const numAmount = parseFloat(amount);
    if (!numAmount || numAmount <= 0) {
      setInputError(true);
      setError("Please enter a valid positive amount");
      setTimeout(() => setInputError(false), 500);
      return;
    }
    convert(numAmount, fromCurrency, toCurrency);
  }, [amount, fromCurrency, toCurrency, convert, setError]);

  // Handle swap
  const handleSwap = useCallback(() => {
    setFromCurrency((prev) => {
      setToCurrency(prev);
      return toCurrency;
    });
  }, [toCurrency]);

  // Handle amount change
  const handleAmountChange = useCallback(
    (val) => {
      setAmount(val);
      setInputError(false);
      setError(null);
    },
    [setError]
  );

  // Handle Enter key globally
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        handleConvert();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleConvert]);

  return (
    <ErrorBoundary>
      {/* Background Shapes */}
      <div className="background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      <div className="container">
        <Header />

        <main className="converter-card">
          {/* Amount Input */}
          <AmountInput
            value={amount}
            onChange={handleAmountChange}
            hasError={inputError}
          />

          {/* Currency Row */}
          <div className="currency-row">
            <CurrencySelector
              label="From"
              currencies={currencies}
              selected={fromCurrency}
              onChange={setFromCurrency}
            />

            <SwapButton onSwap={handleSwap} />

            <CurrencySelector
              label="To"
              currencies={currencies}
              selected={toCurrency}
              onChange={setToCurrency}
            />
          </div>

          {/* Convert Button */}
          <ConvertButton onClick={handleConvert} loading={loading} />

          {/* Result */}
          <ResultDisplay
            loading={loading}
            error={error}
            result={conversionResult}
            lastUpdated={lastUpdated}
          />
        </main>

        <footer>
          <p>
            Powered by{" "}
            <a
              href="https://www.exchangerate-api.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              ExchangeRate-API
            </a>
          </p>
        </footer>
      </div>
    </ErrorBoundary>
  );
};

export default App;