import React, { useContext } from "react";
import { Navbar, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { TiDocumentAdd } from "react-icons/ti";
import { RiLogoutBoxRFill } from "react-icons/ri";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import { useQuery } from "react-query";
import { LoginContext } from "../../Context/LoginContext";
import { API, urlAsset } from "../../Config/api";
import iconHeader from "../../Images/iconHeader.png";
import Spinner from "../Spinner";

function TopNavAdmin() {
  const [state, dispatch] = useContext(LoginContext);
  const id = localStorage.getItem("id");

  const { isLoading, error, data: userData, refetch } = useQuery(
    "getImage",
    () => API.get(`/user/${state.user.id}`)
  );

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
                to="/addbook"
              >
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
