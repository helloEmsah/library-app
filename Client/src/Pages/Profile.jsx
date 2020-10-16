import React, { useContext, useState, useEffect } from "react";
import { LoginContext } from "../Context/LoginContext";
import { Container, Col, Row, DropdownButton } from "react-bootstrap";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { FaTransgender, FaPhoneAlt } from "react-icons/fa";
import { useQuery } from "react-query";
import { API } from "../Config/api";

// ?? "default"

import fakeProfile from "../Dummy/Profile.json";

function Profile() {
  const [state, dispatch] = useContext(LoginContext);

  const { isLoading, error, data: userData } = useQuery("getUser", () =>
    API.get(`/user`)
  );

  console.log(userData);

  return isLoading || !userData ? (
    <h1>Loading...</h1>
  ) : error ? (
    <h1>Your Error : {error.message}</h1>
  ) : (
    <div id="profileWrapper">
      <h1 className="profileTitle">Profile</h1>
      <div className="profileBackground">
        <Container fluid className="profileArea">
          {userData.data.data.map((user, index) => (
            <Row>
              <Col lg={1}>
                <MdEmail className="profileIcon" />
                <FaTransgender className="profileIcon" />
                <FaPhoneAlt className="profileIcon" />
                <MdLocationOn className="profileIcon" />
              </Col>
              <Col lg={7}>
                <p className="profileName"></p>
                <p className="profileDesc">Email</p>
                <p className="profileName"></p>
                <p className="profileDesc">Gender</p>
                <p className="profileName"></p>
                <p className="profileDesc">Phone</p>
                <p className="profileName"></p>
                <p className="profileDesc">Address</p>
              </Col>
              <Col lg={4}>
                <div className="profilePictureContainer">
                  <img className="profilePictureImage" src="" alt="" />
                </div>
                <br />
                <DropdownButton variant="danger" title="Upload Profile Image">
                  <form action="/profile" method="post">
                    <input type="file" name="avatar" />
                  </form>
                </DropdownButton>
              </Col>
            </Row>
          ))}
        </Container>
      </div>
      <br />
      <h4 className="profileMyBook">My Book</h4>
    </div>
  );
}

export default Profile;
