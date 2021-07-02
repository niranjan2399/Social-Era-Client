import React from "react";
import { Link } from "react-router-dom";
import "./navBar.scss";
import SearchBar from "../search/SearchBar";
import { AccountCircle } from "@material-ui/icons";

function Navbar() {
  return (
    <div className="navbar">
      <div className="left">
        <div className="hamburger">
          <input type="checkbox" class="menu-btn" id="menu-btn" />
          <label for="menu-btn" class="menu-icon">
            <span class="navicon"></span>
          </label>
        </div>
        <Link to="/" className="logo">
          <span>
            social
            <br /> era
          </span>
        </Link>
      </div>
      <div className="right">
        <SearchBar />
        <AccountCircle className="account" />
      </div>
    </div>
  );
}

export default Navbar;
