import React, { useState, useContext, useEffect } from "react";
import {
  Navbar,
  Collapse,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

import { AiOutlineDelete, AiOutlineShoppingCart } from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";
import { message, Badge } from "antd";
import pp from "../assets/default.png";
import { FaFirstOrder, FaShoppingBasket, FaShoppingCart } from "react-icons/fa";

const MyNavbar = () => {
  const context = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const history = useHistory();

  const Toggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const localProf = localStorage.getItem("profile");
    if (localProf) {
      // console.log(JSON.parse(localProf));
      setProfile(JSON.parse(localProf));
    }
  }, []);

  useEffect(() => {
    if (context != null) {
      console.log("------------------------->>>>>>>", context.user?.profile);
    }
  }, [context]);

  return (
    <Navbar
      style={{ backgroundColor: "#40a9ff" }}
      light
      expand="md"
      className="text-white pr-3 pl-3 mb-2 sticky-top"
    >
      <NavbarBrand>
        <NavLink
          className="text-white mt-0"
          style={{ marginLeft: "-1rem" }}
          tag={Link}
          to={context && context.user?.token ? "/home" : "/"}
        >
          OLX Clone
        </NavLink>
      </NavbarBrand>

      {/* <NavbarToggler className="toggle-btn" onClick={Toggle} /> */}
      <div onClick={Toggle}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      <Collapse isOpen={isOpen} navbar>
        {context && context.user?.token ? (
          <>
            <Nav navbar className="ml-auto">
              {context.user?.profile.user.isAdmin ? (
                <NavLink
                  className="text-white"
                  onClick={Toggle}
                  tag={Link}
                  to="/add-listing"
                >
                  Add listing
                </NavLink>
              ) : null}

              <NavLink
                className="text-white"
                onClick={Toggle}
                tag={Link}
                to="/myorders"
              >
                My orders
              </NavLink>
              <NavLink
                className="mx-2 text-white"
                onClick={Toggle}
                tag={Link}
                to="/mycart"
              >
                <FaShoppingCart style={{ width: "18px", height: "18px" }} />
              </NavLink>
            </Nav>

            <NavLink tag={Link} onClick={Toggle} to="/myprofile">
              <img
                width={40}
                height={40}
                className="mt-1 p-0 nav-img"
                style={{ borderRadius: "20px" }}
                alt="dp"
                src={
                  profile && profile.profile_pic
                    ? profile.profile_pic
                    : context.user?.profile.profile_pic
                    ? context.user?.profile.profile_pic
                    : pp
                }
                roundedCircle
              />
            </NavLink>

            <NavLink
              className="text-white p-2 logout"
              tag={Link}
              onClick={() => {
                Toggle();
                context.setUser(null);
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                localStorage.removeItem("profile");
                localStorage.removeItem("profile_pic");
                setProfile(null);
                setProfilePic(null);
                const success = () => {
                  message.success({
                    content: "Logged out successfully!",
                    className: "custom-class",
                    style: {
                      marginTop: "8vh",
                    },
                  });
                };
                success();
                history.push("/");
              }}
            >
              Log Out
            </NavLink>
            {/* </Nav> */}
          </>
        ) : (
          <Nav navbar className="ml-auto">
            <NavItem>
              <NavLink className="text-white" onClick={Toggle}>
                <a className="text-white" href="#price">
                  Pricing
                </a>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="text-white" onClick={Toggle}>
                <a className="text-white" href="#cont">
                  Contact us
                </a>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className="text-white"
                tag={Link}
                onClick={Toggle}
                to="/register"
              >
                Register
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className="text-white"
                tag={Link}
                onClick={Toggle}
                to="/login"
              >
                Log in
              </NavLink>
            </NavItem>
          </Nav>
        )}
      </Collapse>
    </Navbar>
  );
};

export default MyNavbar;
