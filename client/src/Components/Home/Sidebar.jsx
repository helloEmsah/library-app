import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { Button } from "react-bootstrap";
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

  const { isLoading, error, data: userData, refetch } = useQuery(
    "getImage",
    () => API.get(`/user/${state.user.id}`)
  );

  return isLoading || !userData ? (
    <Spinner />
  ) : error ? (
    <h1>Your Error : {error.message}</h1>
  ) : state.user.role === "user" ? (
    <div id="sidebar">
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
      <div style={{ marginLeft: "20%", textAlign: "left", marginTop: "10%" }}>
        <Link
          className="linkmenu "
          style={{ textDecoration: "none" }}
          to="/profile"
          // activeClassName="active"
        >
          <div className="buttonmenu">
            <div style={{ marginLeft: "1%", padding: "8%" }}>
              <FaUser size={24} /> <font className="namamenu"> Profile </font>
            </div>
          </div>
        </Link>

        <Link
          className="linkmenu"
          style={{ textDecoration: "none" }}
          to="/my-library"
        >
          <div className="buttonmenu">
            <div style={{ marginLeft: "1%", padding: "8%" }}>
              <MdLibraryBooks size={24} />{" "}
              <font className="namamenu"> My Library </font>
            </div>
          </div>
        </Link>

        <Link
          className="linkmenu"
          style={{ textDecoration: "none" }}
          to="/add-book"
        >
          <div className="buttonmenu">
            <div style={{ marginLeft: "1%", padding: "8%" }}>
              <AiFillFileAdd size={24} />{" "}
              <font className="namamenu"> Add Book </font>
            </div>
          </div>
        </Link>
      </div>

      {/* <div id="sidebarLink">
        <Link className="link-list" to="/profile">
          <FaUser size={20} /> <p className="link-text">Profile</p>
        </Link>
        <Link className="link-list" to="/profile">
          <MdLibraryBooks size={20} /> <p className="link-text">My Library</p>
        </Link>
        <Link className="link-list" to="/add-book">
          <AiFillFileAdd size={20} /> <p className="link-text">Add Book</p>
        </Link>
      </div> */}
      <br />
      <hr />
      <br />
      <div style={{ marginLeft: "25%" }}>
        <Link to="/" className="linkmenu" style={{ textDecoration: "none" }}>
          <div
            className="buttonmenu-logout"
            onClick={() =>
              dispatch({
                type: "LOGOUT",
              })
            }
          >
            <div style={{ marginLeft: "5%" }}>
              <RiLogoutBoxRFill size={24} />{" "}
              <font className="namamenu"> Logout </font>
            </div>
          </div>
        </Link>
      </div>
    </div>
  ) : state.user.role === "admin" ? (
    <div id="sidebar">
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
      <div style={{ marginLeft: "20%", textAlign: "left", marginTop: "10%" }}>
        <Link
          className="linkmenu "
          style={{ textDecoration: "none" }}
          to="/profile"
          // activeClassName="active"
        >
          <div className="buttonmenu">
            <div style={{ marginLeft: "1%", padding: "8%" }}>
              <FaUser size={24} /> <font className="namamenu"> Profile </font>
            </div>
          </div>
        </Link>

        <Link
          className="linkmenu"
          style={{ textDecoration: "none" }}
          to="/my-library"
        >
          <div className="buttonmenu">
            <div style={{ marginLeft: "1%", padding: "8%" }}>
              <MdLibraryBooks size={24} />{" "}
              <font className="namamenu"> My Library </font>
            </div>
          </div>
        </Link>

        <Link
          className="linkmenu"
          style={{ textDecoration: "none" }}
          to="/admin"
        >
          <div className="buttonmenu">
            <div style={{ marginLeft: "1%", padding: "8%" }}>
              <AiFillFileAdd size={24} />{" "}
              <font className="namamenu"> Dashboard </font>
            </div>
          </div>
        </Link>
      </div>

      {/* <div id="sidebarLink">
        <Link className="link-list" to="/profile">
          <FaUser size={20} /> <p className="link-text">Profile</p>
        </Link>
        <Link className="link-list" to="/profile">
          <MdLibraryBooks size={20} /> <p className="link-text">My Library</p>
        </Link>
        <Link className="link-list" to="/add-book">
          <AiFillFileAdd size={20} /> <p className="link-text">Add Book</p>
        </Link>
      </div> */}
      <br />
      <hr />
      <br />
      <div style={{ marginLeft: "25%" }}>
        <Link to="/" className="linkmenu" style={{ textDecoration: "none" }}>
          <div
            className="buttonmenu-logout"
            onClick={() =>
              dispatch({
                type: "LOGOUT",
              })
            }
          >
            <div style={{ marginLeft: "5%" }}>
              <RiLogoutBoxRFill size={24} />{" "}
              <font className="namamenu"> Logout </font>
            </div>
          </div>
        </Link>
      </div>
    </div>
  ) : null;
}

export default Sidebar;
