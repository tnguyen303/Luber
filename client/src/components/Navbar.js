import React from "react";

const Navbar = props => (
  <ul id="navbar">
    <li className="navBtn" onClick={props.viewAccount}>
      <div className="navSubBtn">Account</div>
    </li>
    <li className="navBtn" onClick={props.viewHome}>
      <div className="navSubBtn active">Home</div>
    </li>
    <li className="navBtn" onClick={props.viewHistory}>
      <div className="navSubBtn">History</div>
    </li>
  </ul>
);

export default Navbar;
