import React from "react";
import styled from "styled-components";

// Images
import logo from "../../assets/images/logo.png";
import instagram from "../../assets/svg/social-media/icons8-instagram.svg";
import facebook from "../../assets/svg/social-media/icons8-facebook.svg";
import twitter from "../../assets/svg/social-media/icons8-twitter.svg";
import whatsapp from "../../assets/svg/social-media/icons8-whatsapp.svg";

const Container = styled.div`
  min-height: 30vh;
  background-color: #111013;
  backdrop-filter: blur(18px) saturate(100%);
  -webkit-backdrop-filter: blur(18px) saturate(100%);
  background-color: rgba(17, 16, 19, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.125);

  img {
    width: 150px;
  }

  h1 {
    padding: 20px 20px;
    font-size: 1.5rem;
    color: #d8d3bf;
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
`;

export default function Footer() {
  return (
    <Container className="container-fluid d-flex flex-column justify-content-center align-items-center">
      <img src={logo}></img>
      <h1 className="text-center">
        Dándole a la cerveza la importancia que merece
      </h1>
      <div className="footer-social-links">
        <img src={instagram}></img>
        <img src={facebook}></img>
        <img src={whatsapp}></img>
        <img src={twitter}></img>
      </div>
    </Container>
  );
}
