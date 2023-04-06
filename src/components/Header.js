import React from "react";
import logo from "../logo.svg";

function Header() {
  return (
    <header className="header">
      <img className="logo" src={logo} alt="Логотип сайта mesto" />
    </header>
  );
}

export default Header;