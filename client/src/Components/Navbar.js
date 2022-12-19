import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = (props) => {
  const navigate = useNavigate();

  const handleUser = () => {
    localStorage.clear();
    alert("Confirm to logout...");
    navigate("/");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            {props.title}
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor01"
            aria-controls="navbarColor01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav me-auto">
              {localStorage.getItem("authToken") ? (
                <li className="nav-item">
                  <Link className="nav-link" to="/notes">
                    {props.navItem1}
                  </Link>
                </li>
              ) : (
                ""
              )}
              {localStorage.getItem("authToken") ? (
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">
                    {props.navItem2}
                  </Link>
                </li>
              ) : (
                ""
              )}
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  {props.navItem3}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  {props.navItem4}
                </Link>
              </li>
            </ul>
            {localStorage.getItem("authToken") ? (
              <form className="d-flex">
                <button
                  className="btn btn-secondary my-2 my-sm-0"
                  type="submit"
                  onClick={handleUser}
                >
                  {props.btn1}
                </button>
              </form>
            ) : (
              ""
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

Navbar.defaultProps = {
  title: "iNotebook - Notes on Cloud ⛅",
  navItem1: "Note",
  navItem2: "Dashboard",
  navItem3: "About Us",
  navItem4: "Contact Us",
  btn1: "Logout",
};

export default Navbar;
