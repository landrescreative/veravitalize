import React, { useState } from "react";
import styled from "styled-components";
import { FaBars } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";

const Navbar = (props) => {
  // This creates a state for the button
  const [toggle, setToggle] = useState(false);

  return (
    <Container_Navbar>
      <h1>VERAVITALIZE</h1>
      <div className={toggle ? "active" : ""}>
        <a>Home</a>
        <a>Products</a>
        <a>About</a>
      </div>
      <button
        className={toggle ? "active" : ""}
        onClick={() => setToggle(!toggle)}
      >
        <FaBars className={"icon" + (toggle ? "active" : "")} />
        <RxCross2 className={"icon-close" + (toggle ? "active" : "")} />
      </button>
    </Container_Navbar>
  );
};

const Container_Navbar = styled.div`
  z-index: 1000;
  height: 60px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 1fr;
  align-content: center;
  justify-content: center;
  position: sticky;

  // LANDRES text

  h1 {
    font-family: "Montserrat", sans-serif;
    font-size: 22px;
    font-weight: 600;
    grid-column: 2 / 3;
    letter-spacing: 2px;
    text-align: center;
    align-self: center;
    letter-spacing: 0px;

    @media (max-width: 768px) {
      grid-column: 1 / 8;
      display: none;
    }
  }

  div {
    display: flex;
    justify-content: space-around;
    align-items: center;
    grid-column: 9/13;

    // Media queries
    @media (max-width: 768px) {
      width: 100vw;
      height: 100dvh;
      flex-direction: column;
      justify-content: space-around;
      position: fixed;
      left: -100vw;
      background-color: rgba(0, 0, 0, 0.8);
      transition: left 0.5s ease-in-out;
    }

    // LINKS TEXT

    a {
      color: #ffffff;
      text-decoration: none;
      font-size: 16px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 2px;
      transition: all 0.5s ease-in-out;
      cursor: pointer;
      font-family: "Montserrat", sans-serif;
      backdrop-filter: blur(0px);
      // Hover subline effect
      position: relative;
      transition: all 0.5s ease-in-out;
      transform: scale(1);

      &::after {
        content: "";
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 0;
        height: 2px;
        background-color: #ffffff;
        transition: width 0.5s ease-in-out;
      }

      &:hover {
        transform: scale(1.1);
      }

      &:hover::after {
        width: 100%;
      }

      // Media queries
    }

    &.active {
      @media (max-width: 768px) {
        left: 0;
        color: white;
        backdrop-filter: blur(10px);
      }
    }
  }

  button {
    background-color: transparent;
    border: none;
    font-size: 1.5rem;
    grid-column: 11 / 13;
    justify-self: center;
    z-index: 2;
    cursor: pointer;
    outline: none;

    .icon {
      display: block;
      &.active {
        display: none;
        opacity: 0;
      }
    }

    .icon-close {
      display: none;

      &.active {
        display: block;
      }
    }

    &.active {
      color: #ffffff;
    }

    // Media queries
    @media (min-width: 768px) {
      display: none;
    }
  }
`;

export default Navbar;
