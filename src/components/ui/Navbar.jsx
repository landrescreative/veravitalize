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

  return (
    <Container className="container-fluid row align-items-center">
      <img src={Logo} className="col-md-1"></img>
      <Links
        className={
          "col-md-9 d-flex align-items-center " + (active ? "active" : "")
        }
      >
        <span>HOME</span>
        <span>ABOUT US</span>
        <span>RECIPES</span>
        <span>CONTACT</span>
      </Links>
      <button className="nav-icon" onClick={handleToggle}>
        <img src={NavbarIcon}></img>
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
  height: 9svh;
  padding: 0;
  margin: 0;
  width: 100%;
  z-index: 10;
  backdrop-filter: blur(16px) saturate(180%);
  justify-content: center;
  -webkit-backdrop-filter: blur(16px) saturate(180%);

  @media (max-width: 1024px) {
    justify-content: space-around;
  }

  img {
    width: 200px;
    fill: #000000;

    @media (max-width: 1024px) {
      width: 100px;
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

    // X icon
    span {
      display: none;
      z-index: 10;
      color: white;
      font-size: 30px;

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

  // Burger menu
  &.active {
    width: 100svw;
    height: 100svh;
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
    color: white;
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
