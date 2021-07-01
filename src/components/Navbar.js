import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.scss";

function Navbar() {
  return (
    <div className="navbar">
      <nav>
        <Link className='link' to='/'>home</Link>
        <Link className='link' to='/register'>register</Link>
        <Link className='link' to='/login'>login</Link>
      </nav>
    </div>
  );
}

export default Navbar;
