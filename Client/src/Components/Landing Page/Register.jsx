import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { LoginContext } from "../../Context/LoginContext";
import { API, setAuthToken } from "../../Config/api";
import { Button, Form, Modal } from "react-bootstrap";
import style from "../../Styles/styles";

function Register(props) {
  const history = useHistory();
  const [state, dispatch] = useContext(LoginContext);
  const [show, setShow] = useState(false);

  const [formRegister, setFormRegister] = useState({
    email: "",
    password: "",
    fullName: "",
    gender: "",
    phone: "",
    address: "",
  });

  const { email, password, fullName, phone, address } = formRegister;

  const handleChange = (e) => {
    setFormRegister({ ...formRegister, [e.target.name]: e.target.value });
  };

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <Button id="signUpButton" style={style.orangeButton} onClick={handleShow}>
        Sign Up
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>
            <p style={{ fontWeight: 800 }}>Sign Up</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="userEmail">
              <Form.Control
                style={{
                  backgroundColor: "#D2D2D2",
                  opacity: 0.25,
                  color: "#333333",
                  borderColor: "black",
                }}
                type="email"
                placeholder="Email"
              />
            </Form.Group>
            <Form.Group controlId="userPassword">
              <Form.Control
                style={{
                  backgroundColor: "#D2D2D2",
                  opacity: 0.25,
                  color: "#333333",
                  borderColor: "black",
                }}
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <Form.Group controlId="userFullName">
              <Form.Control
                style={{
                  backgroundColor: "#D2D2D2",
                  opacity: 0.25,
                  color: "#333333",
                  borderColor: "black",
                }}
                type="text"
                placeholder="Full Name"
              />
            </Form.Group>
            <Form.Group controlId="userGender">
              <Form.Control
                style={{
                  backgroundColor: "#D2D2D2",
                  opacity: 0.25,
                  color: "#333333",
                  borderColor: "black",
                }}
                as="select"
                defaultValue="Gender"
              >
                <option>Male</option>
                <option>Female</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="userPhone">
              <Form.Control
                style={{
                  backgroundColor: "#D2D2D2",
                  opacity: 0.25,
                  color: "#333333",
                  borderColor: "black",
                }}
                type="text"
                placeholder="Phone"
              />
            </Form.Group>
            <Form.Group controlId="userAddress">
              <Form.Control
                style={{
                  backgroundColor: "#D2D2D2",
                  opacity: 0.25,
                  color: "#333333",
                  borderColor: "black",
                }}
                type="text"
                placeholder="Address"
              />
            </Form.Group>
          </Form>
          <Button block style={style.orangeButton}>
            Sign Up
          </Button>
          <br />
          <p id="modalRegularText">
            Already have an account? Click
            <span style={{ fontWeight: 800 }}> here</span>
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Register;
