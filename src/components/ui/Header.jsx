import React from "react";
import styled from "styled-components";
import { PiPlantBold, PiDropBold, PiSparkleBold, PiShieldCheckBold } from "react-icons/pi";
import { FaArrowDown } from "react-icons/fa6";

export default function Header() {
  const scrollToRoutine = () => {
    const el = document.getElementById("routine");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Container id="benefits" className="container-fluid d-flex flex-column justify-content-between align-items-center">
      {/* Top Hero Section */}
      <div className="header_main_texts">
        <div className="hero-badge">
          <span className="badge-dot"></span>
          <span>100% Cold-Pressed Organic Aloe Vera</span>
        </div>
        <h2 className="hero-subtitle">Cellular Hydration & Botanical Radiance</h2>
        <h1 className="hero-title">
          Awaken Your Skin, <span className="title-highlight">Naturally</span>
        </h1>
        <p className="hero-description">
          Clinically crafted bio-active skincare harnessing nature's purest antioxidant-rich botanical extract.
        </p>
      </div>

      {/* Mobile-Only Dedicated 3D Interactive Stage */}
      <div className="header_spacer_mobile">
        <div className="mobile-3d-hint">
          <span className="hint-pulse"></span>
          <span>Interactive 3D Formula • Scroll to Explore</span>
        </div>
      </div>

      {/* Flanking Benefit Glass Cards with Ultra-Wide Central 3D Corridor */}
      <div className="header_about_texts row w-100 align-items-center">
        {/* Left Column (Pinned to the outer left border) */}
        <div className="header_about_texts_left col-12 col-lg-3 col-xl-3 d-flex flex-column">
          <div className="header_about_texts_spans glass-card card-left">
            <div className="icon-wrapper">
              <PiPlantBold className="icons" />
            </div>
            <div className="card-content">
              <h3>Pure Botanical Hydration</h3>
              <p>
                Organic cold-extracted Aloe base drenches deep cellular layers, instantly soothing redness.
              </p>
            </div>
          </div>

          <div className="header_about_texts_spans glass-card card-left">
            <div className="icon-wrapper">
              <PiDropBold className="icons" />
            </div>
            <div className="card-content">
              <h3>Bio-Active Nutrients</h3>
              <p>
                75+ natural active nutrients, vitamins C & E, and polysaccharides that stimulate collagen.
              </p>
            </div>
          </div>
        </div>

        {/* Center Stage: Ultra-Wide Open Corridor for 3D Cream Bottle (6 columns = 50% width) */}
        <div className="col-lg-6 col-xl-6 d-none d-lg-flex flex-column justify-content-between align-items-center center-stage">
          <div className="interactive-3d-hint">
            <span className="hint-dot"></span>
            <span>Hover & move cursor to inspect 3D bottle</span>
          </div>

          <div className="scroll-indicator" onClick={scrollToRoutine}>
            <span className="scroll-text">EXPLORE ACTIVE FORMULA</span>
            <FaArrowDown className="scroll-arrow" />
          </div>
        </div>

        {/* Right Column (Pinned to the outer right border) */}
        <div className="header_about_texts_right col-12 col-lg-3 col-xl-3 d-flex flex-column">
          <div className="header_about_texts_spans glass-card card-right">
            <div className="icon-wrapper">
              <PiSparkleBold className="icons" />
            </div>
            <div className="card-content">
              <h3>Gentle Rejuvenation</h3>
              <p>
                Hypoallergenic, non-comedogenic and pH-balanced. Restores luminous youthful texture.
              </p>
            </div>
          </div>

          <div className="header_about_texts_spans glass-card card-right">
            <div className="icon-wrapper">
              <PiShieldCheckBold className="icons" />
            </div>
            <div className="card-content">
              <h3>Clean & Sustainable</h3>
              <p>
                100% vegan, cruelty-free, zero parabens or sulfates. Pure nature in every single drop.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  min-height: calc(100vh - 75px);
  position: relative;
  padding: 18px 24px 50px;
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  overflow: visible;

  .header_main_texts {
    text-align: center;
    max-width: 780px;
    margin: 0 auto;
    padding: 10px 15px 25px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 5px 16px;
      border-radius: 9999px;
      background: rgba(30, 69, 51, 0.07);
      border: 1px solid rgba(30, 69, 51, 0.15);
      color: #1a4231;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      margin-bottom: 14px;

      .badge-dot {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background-color: #388e5d;
        box-shadow: 0 0 8px rgba(56, 142, 93, 0.6);
      }
    }

    .hero-subtitle {
      font-family: var(--font-body);
      font-weight: 600;
      font-size: clamp(0.85rem, 1.8vw, 1.05rem);
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: #446351;
      margin-bottom: 8px;
    }

    .hero-title {
      font-family: var(--font-serif);
      font-weight: 700;
      font-size: clamp(2.4rem, 5.2vw, 4.2rem);
      line-height: 1.08;
      color: #13261c;
      letter-spacing: -0.02em;
      margin-bottom: 12px;

      .title-highlight {
        font-style: italic;
        color: #266346;
        font-weight: 600;
      }
    }

    .hero-description {
      font-size: clamp(0.92rem, 1.4vw, 1.05rem);
      color: #495c52;
      max-width: 580px;
      line-height: 1.6;
    }
  }

  /* Mobile dedicated 3D showcase viewport */
  .header_spacer_mobile {
    display: none;
    width: 100%;
    height: 48vh;
    min-height: 340px;
    max-height: 440px;
    position: relative;
    pointer-events: none;

    .mobile-3d-hint {
      position: absolute;
      bottom: 12px;
      left: 50%;
      transform: translateX(-50%);
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 6px 14px;
      border-radius: 9999px;
      background: rgba(255, 255, 255, 0.82);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.9);
      box-shadow: 0 4px 16px rgba(18, 48, 30, 0.08);
      font-size: 11px;
      font-weight: 700;
      color: #1e5238;
      white-space: nowrap;

      .hint-pulse {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background-color: #388e5d;
        animation: pulse 2s infinite;
      }
    }

    @media (max-width: 991px) {
      display: block;
    }
  }

  .header_about_texts {
    margin-top: 10px;
    position: relative;
    z-index: 5;
    margin-left: 0;
    margin-right: 0;
  }

  .header_about_texts_left {
    align-items: flex-start;

    @media (max-width: 991px) {
      align-items: center;
    }
  }

  .header_about_texts_right {
    align-items: flex-end;

    @media (max-width: 991px) {
      align-items: center;
    }
  }

  /* Center Stage for 3D Cream Bottle */
  .center-stage {
    min-height: 360px;
    height: 100%;
    padding: 10px 0;
    pointer-events: none;

    .interactive-3d-hint {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 16px;
      border-radius: 9999px;
      background: rgba(255, 255, 255, 0.65);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.85);
      box-shadow: 0 6px 20px rgba(18, 48, 30, 0.05);
      font-size: 11px;
      font-weight: 600;
      color: #2d5a42;
      letter-spacing: 0.04em;
      transition: all 0.3s ease;

      .hint-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #388e5d;
      }
    }

    .scroll-indicator {
      pointer-events: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      cursor: pointer;
      opacity: 0.8;
      transition: all 0.3s ease;
      user-select: none;
      margin-top: auto;
      padding-top: 20px;

      .scroll-text {
        font-size: 9.5px;
        letter-spacing: 0.22em;
        font-weight: 700;
        color: #1e5238;
      }

      .scroll-arrow {
        color: #1e5238;
        font-size: 13px;
        animation: floatDown 2s infinite ease-in-out;
      }

      &:hover {
        opacity: 1;
        transform: translateY(3px);
      }
    }
  }

  @keyframes floatDown {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(5px);
    }
  }

  .glass-card {
    width: 100%;
    max-width: 320px;
    margin: 12px 0;
    padding: 20px 20px;
    background: rgba(255, 255, 255, 0.72);
    backdrop-filter: blur(18px) saturate(160%);
    -webkit-backdrop-filter: blur(18px) saturate(160%);
    border: 1px solid rgba(255, 255, 255, 0.85);
    border-radius: 20px;
    box-shadow: 0 10px 30px -5px rgba(22, 48, 33, 0.07);
    display: flex;
    gap: 14px;
    align-items: flex-start;
    transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);

    &:hover {
      background: rgba(255, 255, 255, 0.88);
      box-shadow: 0 18px 36px -6px rgba(22, 48, 33, 0.12);
      border-color: rgba(62, 123, 91, 0.25);
    }

    &.card-left:hover {
      transform: translateX(-4px) translateY(-2px);

      @media (max-width: 991px) {
        transform: translateY(-4px);
      }
    }

    &.card-right:hover {
      transform: translateX(4px) translateY(-2px);

      @media (max-width: 991px) {
        transform: translateY(-4px);
      }
    }

    .icon-wrapper {
      flex-shrink: 0;
      width: 42px;
      height: 42px;
      border-radius: 12px;
      background: linear-gradient(135deg, #e3f2e9 0%, #cfebd8 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid rgba(46, 107, 79, 0.15);

      .icons {
        font-size: 20px;
        color: #1e5238;
      }
    }

    .card-content {
      display: flex;
      flex-direction: column;

      h3 {
        font-size: 1rem;
        font-weight: 700;
        color: #142c20;
        margin-bottom: 5px;
        letter-spacing: -0.01em;
        line-height: 1.25;
      }

      p {
        font-size: 0.84rem;
        line-height: 1.5;
        color: #475b51;
      }
    }

    @media (max-width: 991px) {
      max-width: 440px;
    }

    @media (max-width: 576px) {
      max-width: 100%;
      padding: 16px 14px;
      margin: 8px 0;
      border-radius: 16px;
    }
  }
`;
