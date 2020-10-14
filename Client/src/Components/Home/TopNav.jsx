import React from "react";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import iconHeader from "../../Images/iconHeader.png";

function TopNav() {
  return (
    <>
      <Navbar fluid>
        <Link to="/home">
          <img src={iconHeader} alt="" />
        </Link>
        <Navbar.Brand>
          <iconHeader />
        </Navbar.Brand>
      </Navbar>
    </>
  );
}

export default TopNav;
