import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { MdLibraryBooks } from "react-icons/md";
import { AiFillFileAdd } from "react-icons/ai";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { useQuery } from "react-query";
import Spinner from "../Spinner";
import { LoginContext } from "../../Context/LoginContext";
import { API, urlAsset } from "../../Config/api";

function Sidebar() {
  const [state, dispatch] = useContext(LoginContext);
  const id = localStorage.getItem("id");

  const { isLoading, error, data: userData } = useQuery("getImage", () =>
    API.get(`/user/${id}`)
  );

  return isLoading || !userData ? (
    <Spinner />
  ) : error ? (
    <h1>Your Error : {error.message}</h1>
  ) : (
    <div>
      <div id="userInfo">
        <div id="sidebarProfileImageContainer">
          <img
            className="sidebarProfileImage"
            src={urlAsset.img + userData.data.data.picture}
            alt=""
          />
        </div>
        <div className="userInfoName">
          <h1>{userData.data.data.fullName}</h1>
        </div>
      </div>

      <hr />
      <div id="sidebarLink">
        <ul>
          <li>
            <Link style={{ textDecoration: "none" }} to="/profile">
              <p className="linkText">
                <FaUser /> Profile
              </p>
            </Link>
          </li>
          <br />
          <li>
            <Link style={{ textDecoration: "none" }} to="/mylibrary">
              <p className="linkText">
                <MdLibraryBooks /> My Library
              </p>
            </Link>
          </li>
          <br />
          <li>
            <Link style={{ textDecoration: "none" }} to="/addbook">
              <p className="linkText">
                <AiFillFileAdd /> Add Book
              </p>
            </Link>
          </li>
        </ul>
      </div>
      <br />
      <hr />
      <br />
      <ul style={{ listStyleType: "none", fontSize: 25 }}>
        <li>
          <Link
            style={{
              textDecoration: "none",
              color: "#929292",
            }}
            to="/"
            onClick={() =>
              dispatch({
                type: "LOGOUT",
              })
            }
          >
            <p className="linkTextSidebarLogout">
              <RiLogoutBoxRFill /> Logout
            </p>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
