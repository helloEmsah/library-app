import React, { useState } from "react";
import iconHeader from "../Images/iconHeader.png";
import headerLanding from "../Images/headerLanding.png";
import subHeaderLanding from "../Images/subHeaderLanding.png";
import bookcaseLanding from "../Images/bookcaseLanding.png";
import Login from "../Components/Landing Page/Login";
import Register from "../Components/Landing Page/Register";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div id="landingPage">
      <div id="leftLanding">
        <div id="iconHeaderContainer">
          <Link to="/home">
            <img className="iconHeaderImage" src={iconHeader} alt="" />
          </Link>
        </div>
        <div id="headerLandingContainer">
          <img className="headerLandingImage" src={headerLanding} alt="" />
        </div>
        <div id="subHeaderLandingContainer">
          <img
            className="subHeaderLandingImage"
            src={subHeaderLanding}
            alt=""
          />
        </div>
        <div id="homeButtonContainer">
          <Register />
          <span></span>
          <Login />
        </div>
      </div>

      <div id="rightLanding">
        <div id="bookcaseLandingContainer">
          <img className="bookcaseLandingImage" src={bookcaseLanding} alt="" />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
