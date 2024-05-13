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
  margin-top: 40px;
  background-size: contain;

  @media (max-width: 1024px) {
    height: 100% + 64px;
  }

  .header_main_texts {
    width: 90%;
    text-align: center;
    padding-bottom: 15dvh;
    color: #393d3d;
    font-family: "Bebas Neue";
    h1 {
      color: #393d3d;
      line-height: 0.9;
      font-weight: 700;
      font-size: 6.5rem;
    }

    h2 {
      color: #393d3d;
      font-weight: 400;
      font-size: 3rem;
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
    color: #393d3d;
  }

  .header_about_texts_spans {
    width: 300px;
    margin: 20px 0px;

    img {
      filter: invert(100%) sepia(90%) saturate(0%) hue-rotate(346deg)
        brightness(89%) contrast(111%);
      width: 50px;
      margin-right: 5px;
    }

    h1 {
      font-size: 1.5rem;
      font-weight: 500;
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
        <h2>Discover Your Best Skin</h2>
        <h1>Naturally</h1>
      </div>
      <div className="header_spacer_mobile"></div>
      <div className="header_about_texts row d-flex justify-content-between align-items-center">
        <div className="header_about_texts_left col-md-4 d-flex justify-content-center align-items-center flex-column">
          <div className="header_about_texts_spans">
            <h1>
              <img src={drinkSVG}></img>
              Refresh Your Skin with Our Pure Aloe Vera
            </h1>
            <h2>
              Our unique formula, based on Pure Aloe Vera, instantly refreshes
              and revitalizes your skin. Aloe Vera is known for its hydrating
              and soothing properties, leaving your skin soft and radiant.
            </h2>
          </div>
          <div className="header_about_texts_spans">
            <h1>
              <img src={healthSVG}></img>
              Take Care of Your Skin with Nature's Best
            </h1>
            <h2>
              Discover the benefits of Aloe Vera in our skincare line. Aloe Vera
              is rich in antioxidants and vitamins, helping to rejuvenate the
              skin and combat signs of aging naturally.
            </h2>
          </div>
        </div>
        <div className="header_about_texts_right d-flex col-md-4 flex-column justify-content-center align-items-center">
          <div className="header_about_texts_spans">
            <h1>
              <img src={beerSVG}></img>
              Give Your Skin the Treatment It Deserves
            </h1>
            <h2>
              Our skincare products are formulated with high-quality Aloe Vera,
              known for its regenerative properties and ability to soothe
              sensitive skin. Give your skin the care it deserves and enjoy
              healthy, radiant skin.
            </h2>
          </div>
          <div className="header_about_texts_spans">
            <h1>
              <img src={rewardSVG}></img>Experience Natural Nourishment for Your
              Skin
            </h1>
            <h2>
              Nourish your skin with the benefits of Aloe Vera. Our product line
              uses natural ingredients to provide your skin with the hydration
              and care it needs. Experience the difference nature's power can
              make in your skincare routine.
            </h2>
          </div>
        </div>
      </div>
    </Container>
  );
}
