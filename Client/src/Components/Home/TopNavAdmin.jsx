import React, { useContext } from "react";
import { Navbar, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { TiDocumentAdd } from "react-icons/ti";
import { RiLogoutBoxRFill } from "react-icons/ri";
import iconHeader from "../../Images/iconHeader.png";
import fakePicture from "../../Dummy/Profile.json";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import { LoginContext } from "../../Context/LoginContext";

function TopNavAdmin() {
  const [state, dispatch] = useContext(LoginContext);
  return (
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
            {fakePicture.map((data) => (
              <div id="adminNavbarProfilePicture">
                <img
                  className="adminNavbarProfilePicture"
                  src={data.picture}
                  alt=""
                />
              </div>
            ))}
          </DropdownToggle>
          <Dropdown.Menu>
            <Dropdown.Item>
              <Link style={{ textDecoration: "none", color: "#929292" }} to="/addbook">
                <TiDocumentAdd /> Add Book
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
    </div>
  );
}

export default TopNavAdmin;
