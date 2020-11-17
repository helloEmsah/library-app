import React, { useContext, useState } from "react";
import { Container, Col, Row, Modal, Form, Button } from "react-bootstrap";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { FaTransgender, FaPhoneAlt } from "react-icons/fa";
import Spinner from "../Components/Spinner";
import { useQuery, useMutation } from "react-query";
import { LoginContext } from "../Context/LoginContext";
import { Link, useHistory } from "react-router-dom";
import { API, urlAsset } from "../Config/api";
import TopNav from "../Components/Home/TopNav";
import Sidebar from "../Components/Home/Sidebar";

function Profile() {
  const [state, dispatch] = useContext(LoginContext);

  const id = localStorage.getItem("id");

  const [image, setImage] = useState(null);

  const [showUploadModal, setShowUploadModal] = useState(false);

  const history = useHistory();

  const {
    isLoading,
    error,
    data: profileData,
    refetch,
  } = useQuery("getUserById", () => API.get(`/user/${state.user.id}`));

  const { data: userBook } = useQuery("getUserBook", () =>
    API.get(`/user-book/${id}`)
  );

  const [uploadImage] = useMutation(async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const formData = new FormData();
      formData.append("picture", image, image.name);

      setShowUploadModal(false);
      const res = await API.patch(`/user/${state.user.id}`, formData, config);
      refetch();
      return res;
    } catch (error) {
      refetch();
      console.log(error);
    }
  });

  return isLoading || !profileData || !userBook ? (
    <Spinner />
  ) : error ? (
    <h1>Your Error : {error.message}</h1>
  ) : (
    <Container fluid>
      <TopNav />
      <Row>
        <Col lg={2}>
          <Sidebar />
        </Col>
        <Col lg={10}>
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
                    <p className="profileName">{profileData.data.data.email}</p>
                    <p className="profileDesc">Email</p>
                    <p className="profileName">
                      {profileData.data.data.gender}
                    </p>
                    <p className="profileDesc">Gender</p>
                    <p className="profileName">{profileData.data.data.phone}</p>
                    <p className="profileDesc">Phone</p>
                    <p className="profileName">
                      {profileData.data.data.address}
                    </p>
                    <p className="profileDesc">Address</p>
                  </Col>
                  <Col lg={4}>
                    <div className="image-btn-wrapper">
                      <div className="profilePictureContainer">
                        <img
                          className="profilePictureImage"
                          src={urlAsset.img + profileData.data.data.picture}
                          alt=""
                        />
                      </div>
                      <br />
                      <Button
                        style={{ width: 200 }}
                        onClick={() => setShowUploadModal(true)}
                      >
                        Change Picture
                      </Button>
                    </div>
                  </Col>
                </Row>
                <Modal
                  centered
                  show={showUploadModal}
                  onHide={() => setShowUploadModal(false)}
                >
                  <Modal.Body>
                    <Form
                      onSubmit={(e) => {
                        e.preventDefault();
                        uploadImage();
                      }}
                    >
                      <Form.Group>
                        <Form.Control
                          type="file"
                          placeholder="Profile Image"
                          name="picture"
                          onChange={(e) => setImage(e.target.files[0])}
                        />
                      </Form.Group>
                      <Button type="submit" variant="primary">
                        Submit
                      </Button>
                    </Form>
                  </Modal.Body>
                </Modal>
              </Container>
            </div>
            <br />
            <h4 className="profileMyBook">My Book</h4>
            <br />
            <div id="userBook">
              <Row>
                {userBook.data.data.book.map((book) => (
                  <Col lg={3}>
                    <Link
                      style={{ textDecoration: "none" }}
                      // Fix Link later
                      onClick={() => history.push(`detail-book/${book.id}`)}
                    >
                      {book.status == "Approved" ? (
                        <div>
                          <div className="image-container">
                            <img
                              className="image"
                              src={book.thumbnail}
                              alt=""
                            />
                          </div>
                          <div className="description">
                            <p className="title">{book.title}</p>
                            <div className="subtext-wrap">
                              <p className="author">{book.author}</p>
                            </div>
                          </div>
                        </div>
                      ) : book.status == "Waiting" ? (
                        <div>
                          <div className="image-container">
                            <img
                              style={{ opacity: "0.4" }}
                              className="image"
                              src={book.thumbnail}
                              alt=""
                            />
                            <span className="waiting-info">
                              Waiting to be verified
                            </span>
                          </div>
                          <div className="description">
                            <p className="title">{book.title}</p>
                            <div className="subtext-wrapper">
                              <p className="author">{book.author}</p>
                            </div>
                          </div>
                        </div>
                      ) : book.status == "Cancelled" ? (
                        <div>
                          <div className="image-container">
                            <img
                              style={{ opacity: "0.4" }}
                              className="image"
                              src={book.thumbnail}
                              alt=""
                            />
                            <span className="cancel-info">Cancelled</span>
                          </div>
                          <div className="description">
                            <p className="title">{book.title}</p>
                            <div className="subtext-wrapper">
                              <p className="author">{book.author}</p>
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </Link>
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;
