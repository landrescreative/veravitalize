// TODO:

import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

// Images & Icons
import NavbarIcon from "../../assets/svg/navbar/circled-menu.svg";

import Logo from "../../assets/images/logo.png";

const Navbar = () => {
  const [active, setActive] = useState(false);

  const handleToggle = () => {
    setActive(!active);
  };

  let classes = "";
  if (active) {
    classes += "hide";
  }

  return (
    <Container className="container-fluid row align-items-center">
      <div className="brand-name">
        <span>VERAVITALIZE</span>
      </div>
      <Links
        className={
          "col-md-9 d-flex align-items-center " + (active ? "active" : "")
        }
      >
        <span>HOME</span>
        <span>ABOUT US</span>
        <span>PRODUCTS</span>
        <span>CONTACT</span>
      </Links>
      <button className="nav-icon" onClick={handleToggle}>
        <img
          src={NavbarIcon}
          style={{ display: active ? "none" : "block" }}
        ></img>
        <span className={active ? "active" : ""}>X</span>
      </button>
    </Container>
  );
};

export default Navbar;

const shine = keyframes`
  from {
    -webkit-mask-position: 150%;
  }
  
  to {
    -webkit-mask-position: -50%;
  }
`;

const rotate = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  height: 64px;
  padding: 0;
  margin: 0;
  width: 100%;
  z-index: 10;
  backdrop-filter: blur(16px);
  justify-content: center;
  -webkit-backdrop-filter: blur(16px) saturate(180%);

  @media (max-width: 1024px) {
    justify-content: space-around;
    position: relative;
  }

  @media (max-width: 1024px) {
    width: 100px;
  }

  // Brand name
  .brand-name {
    font-size: 22px;
    font-weight: 600;
    font-family: "Montserrat", sans-serif;
    color: black;
    letter-spacing: 1px;

    span {
      color: #393d3d;
    }

    @media (max-width: 1024px) {
      display: none;
    }
  }

  // Burger button

  .nav-icon {
    width: 50px;
    height: 50px;
    border: none;
    background: none;
    z-index: 10;
    justify-self: end;
    outline: none;

    // X icon
    span {
      display: none;
      z-index: 10;
      color: white;
      font-size: 30px;
      border: none;

      &.active {
        display: block;
        position: relative;
        top: 0px;
        right: 0px;
      }
    }

    // State of the button
    &.active {
      img {
        fill: white;
        background-color: #fff;
      }
    }

    // Responsive
    @media (min-width: 1024px) {
      display: none;
    }

    // Dots icon
    img {
      filter: invert(100%) sepia(90%) saturate(0%) hue-rotate(346deg);
      width: 50px;
      height: 50px;
    }
  }
`;

const Links = styled.div`
  position: absolute;
  top: -700px;
  left: -2000px;
  justify-content: center;

  @media (min-width: 1024px) {
    position: initial;
    justify-content: flex-end;
  }

  // Hide button on click
  &.hide {
    display: none;
  }

  // Burger menu
  &.active {
    min-width: 97vw;
    height: 100dvh;
    display: block;
    position: fixed;
    margin: auto;
    top: 0;
    left: 0;
    right: 0;
    opacity: 1;
    text-align: right;
    flex-direction: column;
    background-color: hsla(0, 0%, 0%, 0.9);
    animation: ${rotate} 0.7s ease-in-out alternate;

    span {
      font-size: 7svw;
      color: #f2f2f2;
    }
  }

  span {
    padding: 0 20px;
    font-weight: 600;
    font-family: "Montserrat", sans-serif;
    font-weight: 700;
    font-size: 14px;
    color: black;
    letter-spacing: 1px;

    &:hover {
      -webkit-mask-image: linear-gradient(
        -75deg,
        rgba(0, 0, 0, 0.6) 30%,
        #000 50%,
        rgba(0, 0, 0, 0.6) 70%
      );
      -webkit-mask-size: 200%;
      animation: ${shine} 2s infinite;
    }
  }
`;
