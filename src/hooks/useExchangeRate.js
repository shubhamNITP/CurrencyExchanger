import { useState, useEffect, useRef, useCallback } from "react";

// ✅ Read from .env file
const API_KEY = process.env.REACT_APP_API_KEY;
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_URL = `${API_BASE_URL}/${API_KEY}/latest`;
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

function useExchangeRate() {
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [conversionResult, setConversionResult] = useState(null);
  const [lastUpdated, setLastUpdated] = useState("");
  const cacheRef = useRef({});

  // ✅ Validate env variables on mount
  useEffect(() => {
    if (!API_KEY) {
      console.error(
        "❌ REACT_APP_API_KEY is missing! Create a .env file in the project root."
      );
      setError(
        "API key is missing. Please check your .env configuration."
      );
    }
    if (!API_BASE_URL) {
      console.error(
        "❌ REACT_APP_API_BASE_URL is missing! Create a .env file in the project root."
      );
      setError(
        "API base URL is missing. Please check your .env configuration."
      );
    }
  }, []);

  // Fetch rates with caching
  const fetchRates = useCallback(async (base) => {
    // ✅ Guard: check env vars exist
    if (!API_KEY || !API_BASE_URL) {
      throw new Error(
        "API configuration missing. Check your .env file."
      );
    }

    const now = Date.now();
    const cached = cacheRef.current[base];

    if (cached && now - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }

    const res = await fetch(`${API_URL}/${base}`);

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();

    if (data.result !== "success") {
      throw new Error(data["error-type"] || "Failed to fetch rates");
    }

    cacheRef.current[base] = { data, timestamp: now };
    return data;
  }, []);

  // Load currencies on mount
  useEffect(() => {
    let isMounted = true;

    async function loadCurrencies() {
      if (!API_KEY || !API_BASE_URL) return;

      setLoading(true);
      setError(null);
      try {
        const data = await fetchRates("USD");
        if (isMounted) {
          setCurrencies(Object.keys(data.conversion_rates));
        }
      } catch (err) {
        if (isMounted) {
          setError("Failed to load currencies. Please refresh.");
          console.error(err);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadCurrencies();
    return () => {
      isMounted = false;
    };
  }, [fetchRates]);

  // Convert currency
  const convert = useCallback(
    async (amount, from, to) => {
      if (!amount || isNaN(amount) || amount <= 0) {
        setError("Please enter a valid positive amount");
        setConversionResult(null);
        return;
      }

      if (amount > 999999999999) {
        setError("Amount is too large");
        setConversionResult(null);
        return;
      }

      if (from === to) {
        setConversionResult({
          amount,
          from,
          to,
          converted: amount,
          rate: 1,
        });
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);
      setConversionResult(null);

      try {
        const data = await fetchRates(from);
        const rate = data.conversion_rates[to];

        if (!rate) throw new Error(`Rate not available for ${to}`);

        const converted = (amount * rate).toFixed(2);
        setConversionResult({
          amount,
          from,
          to,
          converted: parseFloat(converted),
          rate,
        });

        if (data.time_last_update_utc) {
          setLastUpdated(data.time_last_update_utc);
        }
      } catch (err) {
        setError("Error fetching exchange rate. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [fetchRates]
  );

  return {
    currencies,
    loading,
    error,
    conversionResult,
    lastUpdated,
    convert,
    setError,
    setConversionResult,
  };
}

export default useExchangeRate;