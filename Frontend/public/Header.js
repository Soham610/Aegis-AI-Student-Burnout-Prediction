import React from "react";
import logo from "./aegis-logo.jpeg";

export default function Header() {
  return (
    <header className="main-header">
      <div className="header-container">
        <div className="header-brand">
          <img src={logo} alt="Aegis Logo" className="header-logo" />
          <span className="header-name">Aegis</span>
        </div>

        <nav className="header-nav">
          <a href="#about">About</a>
          <a href="#how">How It Works</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  );
}
