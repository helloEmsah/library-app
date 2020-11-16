import React, { useState, useContext } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { LoginContext } from "../../Context/LoginContext";
import { Link, useHistory } from "react-router-dom";
import { API, setAuthToken } from "../../Config/api";
import style from "../../Styles/styles";

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ email, password });
    try {
      const res = await API.post("/login", body, config);

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: res.data.data,
      });

      console.log(res);

      setAuthToken(res.data.data.token);

      try {
        const res = await API.get("/auth");

        dispatch({
          type: "USER_LOADED",
          payload: res.data.data,
        });
      } catch (error) {
        dispatch({
          type: "AUTH_ERROR",
        });
      }

      if (email === "admin@root.com") {
        history.push("/admin");
      } else {
        history.push("/home");
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: "LOGIN_FAIL",
      });
    }
  };

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <Button id="signInButton" style={style.grayButton} onClick={handleShow}>
        Sign In
      </Button>

      <Modal centered show={show} onHide={handleClose}>
        <Modal.Body>
          <p style={{ fontWeight: 800, fontSize: 24 }}>Sign In</p>
          <Form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <Form.Group controlId="userEmail">
              <Form.Control
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
              />
            </Form.Group>
            <Form.Group>
              <Button block type="submit" style={style.orangeButton}>
                Sign In
              </Button>
            </Form.Group>
          </Form>
          <br />
        </Modal.Body>
      </Modal>
    </>
  );
}
export default Login;
