import React from "react";
import { Container, Col, Row, DropdownButton } from "react-bootstrap";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { FaTransgender, FaPhoneAlt } from "react-icons/fa";

import fakeProfile from "../Dummy/Profile.json";

function Profile() {
  return fakeProfile.map((data) => (
    <div id="profileWrapper">
      <h1 className="profileTitle">Profile</h1>
      <div className="profileBackground">
        <Container fluid className="profileArea">
          <Row>
            <Col lg={1}>
              <MdEmail className="profileIcon" />
              <FaTransgender className="profileIcon" />
              <FaPhoneAlt className="profileIcon" />
              <MdLocationOn className="profileIcon" />
            </Col>
            <Col lg={7}>
              <p className="profileName">{data.email}</p>
              <p className="profileDesc">Email</p>
              <p className="profileName">{data.gender}</p>
              <p className="profileDesc">Gender</p>
              <p className="profileName">{data.phone}</p>
              <p className="profileDesc">Phone</p>
              <p className="profileName">{data.address}</p>
              <p className="profileDesc">Address</p>
            </Col>
            <Col lg={4}>
              <div className="profilePictureContainer">
                <img
                  className="profilePictureImage"
                  src={data.picture}
                  alt=""
                />
              </div>
              <br />
              <DropdownButton variant="danger" title="Upload Profile Image">
                <form action="/profile" method="post">
                  <input type="file" name="avatar" />
                </form>
              </DropdownButton>
            </Col>
          </Row>
        </Container>
      </div>
      <br />
      <h4 className="profileMyBook">My Book</h4>
    </div>
  ));
}

export default Profile;
