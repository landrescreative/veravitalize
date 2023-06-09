import React from "react";
import styled from "styled-components";

// Images and videos
import drinkSVG from "../../assets/svg/header/icons8-bar.svg";
import healthSVG from "../../assets/svg/header/icons8-salud-del-corazon.svg";
import beerSVG from "../../assets/svg/header/icons8-cerveza.svg";
import rewardSVG from "../../assets/svg/header/icons8-premio.svg";

import BarBackground from "../../assets/images/bar.png";

const Container = styled.div`
  min-height: 100vh;
  background-size: contain;

  @media (max-width: 1024px) {
    height: 100% + 64px;
  }

  .header_main_texts {
    width: 90%;
    text-align: center;
    padding-bottom: 15dvh;
    color: #feaa29;
    font-family: "Bebas Neue";
    h1 {
      background: linear-gradient(
        to right,
        #c89663 40%,
        #f3eee8 50%,
        #c89663 60%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      line-height: 0.9;
      font-weight: 700;
      font-size: 6.5rem;
    }

    h2 {
      background: linear-gradient(
        to right,
        #c89663 40%,
        #f3eee8 50%,
        #c89663 60%
      );
      line-height: 0.9;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-weight: 400;
      font-size: 3rem;
      color: #f6f0da;
    }

    @media (max-width: 1024px) {
      padding-bottom: 0px;
    }
  }

  .header_spacer_mobile {
    display: none;
    height: 600px;

    @media (max-width: 1024px) {
      display: block;
    }
  }

  .header_about_texts {
    width: 90%;
    color: #f6f0da;
  }

  .header_about_texts_spans {
    width: 300px;
    margin: 20px 0px;

    img {
      width: 50px;
      margin-right: 5px;
    }

    h1 {
      font-size: 1.5rem;
      font-weight: 500;
      color: #feaa29;
      background: linear-gradient(
        to right,
        #c89663 20%,
        #f3eee8 50%,
        #c89663 80%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    h2 {
      font-size: 1rem;
    }

    @media (max-width: 1024px) {
      text-align: center;
    }
  }
`;

export default function Header() {
  return (
    <Container className="container-fluid d-flex flex-column justify-content-center align-items-center">
      <div className="header_main_texts">
        <h2>Welcome to</h2>
        <h1>The art of beer</h1>
      </div>
      <div className="header_spacer_mobile"></div>
      <div className="header_about_texts row d-flex justify-content-between align-items-center">
        <div className="header_about_texts_left col-md-4 d-flex justify-content-center align-items-center flex-column">
          <div className="header_about_texts_spans">
            <h1>
              <img src={drinkSVG}></img>
              Why is beer history?
            </h1>
            <h2>
              This drink can be considered one of the oldest drinks in the
              world.
            </h2>
          </div>
          <div className="header_about_texts_spans">
            <h1>
              <img src={healthSVG}></img>
              Unique benefits for your health
            </h1>
            <h2>
              It has many benefits for your health as long as it is a quality
              beer like ours.
            </h2>
          </div>
        </div>
        <div className="header_about_texts_right d-flex col-md-4 flex-column justify-content-center align-items-center">
          <div className="header_about_texts_spans">
            <h1>
              <img src={beerSVG}></img>Useful for our day to day
            </h1>
            <h2>
              Find a way to use beer in your daily life with incredible recipes
              available to everyone.
            </h2>
          </div>
          <div className="header_about_texts_spans">
            <h1>
              <img src={rewardSVG}></img>Win prizes with us
            </h1>
            <h2>
              You can win products completely free with a couple of clicks,
              click here to find out more.
            </h2>
          </div>
        </div>
      </div>
    </Container>
  );
}
