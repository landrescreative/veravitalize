import React from "react";
import styled from "styled-components";

import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";

const Container = styled.div`
  min-height: 40vh;
  background-color: #393d3d;
  backdrop-filter: blur(18px) saturate(100%);
  -webkit-backdrop-filter: blur(18px) saturate(100%);
  background-color: rgba(17, 16, 19, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.125);
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;

  .top {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;

    @media (max-width: 768px) {
      flex-direction: row;
      flex-wrap: wrap;
    }
  }

  .section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: left;

    h1 {
      font-size: 1.1rem;
      color: #f2f2f2;
    }

    h2 {
      font-size: 1rem;
      color: #f2f2f2;
      font-weight: 400;
    }

    span {
      font-size: 1.5rem;
      color: #f2f2f2;
      text-align: center;
      padding: 5px;
    }
  }

  .footer-social-links-icon {
    font-size: 2rem;
    width: 50px;
    color: white;
  }
  .footer-social-links {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px 20px;
  }

  .footer-social-links img {
    width: 45px;
    margin: 0px 5px;
  }

  .bottom {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    text-align: center;

    h2 {
      font-size: 1rem;
      color: #f2f2f2;
    }

    .separator {
      display: block;
      background-color: #fff;
      width: 100%;
      height: 1.5px;
      margin-bottom: 20px;
    }
  }
`;

export default function Footer() {
  return (
    <Container className="container-fluid ">
      <div className="top">
        <div className="section">
          <h1>CONTACT US</h1>
          <h2>Home</h2>
          <h2>Return policy</h2>
          <h2>About us</h2>
          <h2>FAQ</h2>
        </div>
        <div className="section">
          <h1>RESOURCES</h1>
          <h2>Support</h2>
          <h2>Help Center</h2>
          <h2>Terms & legals</h2>
          <h2>Privacy Policy</h2>
        </div>
        <div className="section">
          <span>VERAVITALIZE</span>
          <span> </span>
          <div className="footer-social-links">
            <FaInstagram className="footer-social-links-icon" />
            <FaFacebook className="footer-social-links-icon" />
            <FaTwitter className="footer-social-links-icon" />
            <FaWhatsapp className="footer-social-links-icon" />
          </div>
        </div>
      </div>
      <div className="bottom">
        <div className="separator"></div>
        <h2>© 2021 VERAVITALIZE. All rights reserved.</h2>
      </div>
    </Container>
  );
}
