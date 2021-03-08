import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <NavLink to="/creatures" className="header__link">
        Creatures
      </NavLink>
      <NavLink to="/Planets" className="header__link">
        Planets
      </NavLink>
    </header>
  );
};

export default Header;
