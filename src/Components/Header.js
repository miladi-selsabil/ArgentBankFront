import React from "react";
import logo from "@/../../src/assets/logo.png";
import "./../index.css";
import { userResetAction } from "../store/user";
import { selectUserFirstName } from "../store/selector";
import {  useDispatch, useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";

function Header() {
  const dispatch = useDispatch();
  const userFirstName = useSelector(selectUserFirstName());
  const signOut = () => {
    dispatch(userResetAction())
  }
  return (
    <>
      <nav className="main-nav">
        <Link className="main-nav-logo" to="/">
          <img
            className="main-nav-logo-image"
            src={logo}
            alt="Argent Bank Logo"
          />
        </Link>
        <div>
          {!userFirstName && (
            <NavLink className="main-nav-item" to="/sign">
              <i className="fa fa-user-circle"></i>
              Sign In
            </NavLink>
          )}
          {userFirstName && (
            <NavLink className="main-nav-item" to="/profile">
              <i className="fa fa-user-circle"></i>
             {!userFirstName && "Profile"}
             {userFirstName && userFirstName}
            </NavLink>
          )}
          {userFirstName && (
            <NavLink onClick={signOut} className="main-nav-item" to="/sign" >
              <i className="fa fa-sign-out"></i>
              Sign Out
            </NavLink>
          )}
        </div>
      </nav>
    </>
  );
}
export default Header;
