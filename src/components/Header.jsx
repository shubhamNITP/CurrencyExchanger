import React from "react";

const Header = () => {
  return (
    <header>
      <div className="logo">
        <i className="fas fa-coins"></i>
        <h1>Currency Exchanger</h1>
      </div>
      <p className="subtitle">Real-time exchange rates at your fingertips</p>
    </header>
  );
};

export default Header;