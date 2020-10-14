import React, { useState, useContext } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { LoginContext } from "../../Context/LoginContext";
import style from "../../Styles/styles";
import { useHistory } from "react-router-dom";

function Login() {
  const history = useHistory();
  const [state, dispatch] = useContext(LoginContext);

  const [show, setShow] = useState(false);
  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formLogin;

  const handleChange = (e) => {
    setFormLogin({ ...formLogin, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "user@root.com" && password === "user") {
      console.log("LOGIN AS USER");
      dispatch({
        type: "LOGIN",
      });
      history.push("/home");
    } else if (email === "admin@root.com" && password === "admin") {
      console.log("LOGIN AS ADMIN");
      dispatch({
        type: "LOGIN",
      });
      history.push("/admin");
    } else {
      console.log("INCORRECT EMAIL OR PASSWORD");
    }
  };

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <Button id="signInButton" style={style.grayButton} onClick={handleShow}>
        Sign In
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>
            <p style={{ fontWeight: 800 }}>Sign In</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <Form.Group controlId="userEmail">
              <Form.Control
                style={{
                  backgroundColor: "#D2D2D2",
                  opacity: 0.25,
                  color: "#333333",
                  borderColor: "black"
                }}
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>
            <Form.Group controlId="userPassword">
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => handleChange(e)}
                style={{
                  backgroundColor: "#D2D2D2",
                  opacity: 0.25,
                  color: "#333333",
                  borderColor: "black"
                }}
              />
            </Form.Group>
            <Form.Group>
              <Button block type="submit" style={style.grayButton}>
                Sign In
              </Button>
            </Form.Group>
          </Form>
          <br />
          <p id="modalRegularText">
            Don't have an account yet? Click
            <span style={{ fontWeight: 800 }}> here</span>
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default Login;
