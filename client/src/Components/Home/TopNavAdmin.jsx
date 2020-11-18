import React, { useContext } from "react";
import { Navbar, Dropdown, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { TiDocumentAdd } from "react-icons/ti";
import { RiLogoutBoxRFill } from "react-icons/ri";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import { useMutation, useQuery } from "react-query";
import { LoginContext } from "../../Context/LoginContext";
import { API, urlAsset } from "../../Config/api";
import iconHeader from "../../Images/iconHeader.png";
import Spinner from "../Spinner";
import { useState } from "react";

function TopNavAdmin() {
  const [state, dispatch] = useContext(LoginContext);
  const id = localStorage.getItem("id");

  const [showAddCategory, setShowAddCategory] = useState(false);

  const handleShowCategory = () => setShowAddCategory(true);
  const handleCloseCategory = () => setShowAddCategory(false);

  const { isLoading, error, data: userData, refetch } = useQuery(
    "getImage",
    () => API.get(`/user/${state.user.id}`)
  );

  const [formData, setFormData] = useState({
    name: "",
  });

  const { name } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [addCategory] = useMutation(async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({
        name,
      });

      const res = await API.post("/category", formData, config);

      setFormData({
        name: "",
      });

      setShowAddCategory(true);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  });

  return isLoading || !userData ? (
    <Spinner />
  ) : error ? (
    <h1>Your Error : {error.message}</h1>
  ) : (
    <div>
      <div className="container-fluid d-flex justify-content-between ">
        <Link to="/home">
          <img src={iconHeader} alt="" />
          <Navbar.Brand>
            <iconHeader />
          </Navbar.Brand>
        </Link>

        <Dropdown>
          <DropdownToggle variant="white">
            <div id="adminNavbarProfilePicture">
              <img
                className="adminNavbarProfilePicture"
                src={urlAsset.img + userData.data.data.picture}
                alt=""
              />
            </div>
          </DropdownToggle>
          <Dropdown.Menu>
            <Dropdown.Item>
              <Link
                style={{ textDecoration: "none", color: "#929292" }}
                to="/admin-add-book"
              >
                <TiDocumentAdd /> Add Book
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link
                style={{ textDecoration: "none", color: "#929292" }}
                // to="/admin-add-category"
                onClick={handleShowCategory}
              >
                <TiDocumentAdd /> Add Category
              </Link>
            </Dropdown.Item>
            <hr />
            <Dropdown.Item>
              <Link
                style={{ textDecoration: "none", color: "#929292" }}
                to="/"
                onClick={() => dispatch({ type: "LOGOUT" })}
              >
                <RiLogoutBoxRFill /> Logout
              </Link>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <Modal centered show={showAddCategory} onHide={handleCloseCategory}>
        <Modal.Body>
          <h1>Add Category</h1>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              addCategory();
            }}
          >
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Name"
                name="name"
                value={name}
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default TopNavAdmin;
