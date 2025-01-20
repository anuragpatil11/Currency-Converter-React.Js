
import React, { useState, useEffect } from "react";
import axios from "axios";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [exchangeRate, setExchangeRate] = useState(1);
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    axios.get("https://open.er-api.com/v6/latest/USD").then((response) => {
      const currencyData = response.data.rates;
      setCurrencies([...Object.keys(currencyData)]);
      setExchangeRate(currencyData[toCurrency]);
    });
  }, [toCurrency]);

  const convert = () => {
    return (amount * exchangeRate).toFixed(2);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-200 via-purple-300 to-pink-200 p-6">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-6 animate-fade-in">
          Currency Converter
        </h1>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">
              Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
              placeholder="Enter amount"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">
              From Currency
            </label>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
            >
              {currencies.map((currency, index) => (
                <option key={index} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">
              To Currency
            </label>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
            >
              {currencies.map((currency, index) => (
                <option key={index} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-6 text-center">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            Converted Amount
          </h2>
          <p className="text-2xl font-bold text-violet-500 mt-2 animate-bounce">
            {convert()} {toCurrency}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
