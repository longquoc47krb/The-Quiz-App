import React from "react";
import { MenuBarProps } from "../interfaces";

const MenuBar: React.FC<MenuBarProps> = ({ profileItems }) => {
  return (
    <nav>
      <ul>
        <li>
          <a href={"/"}>Home</a>
        </li>
        <li className="dropdown">
          <a href="#profile">Profile</a>
        </li>
      </ul>
    </nav>
  );
};

export default MenuBar;
