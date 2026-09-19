import React, { useLayoutEffect, useRef } from "react";
import styled from "styled-components";
import RewardsRegisterForm from "../forms/RewardsRegisterForm";
import gsap from "gsap";
import { FaGift, FaRegGem, FaTruckFast } from "react-icons/fa6";

export default function RewardsRegister() {
  const app = useRef();

  useLayoutEffect(() => {
    var ctx = gsap.context(() => {
      gsap.from(".register-content-anim", {
        scrollTrigger: {
          trigger: "#register",
          start: "top 80%",
          end: "top 30%",
          scrub: 1,
        },
        opacity: 0,
        y: 40,
        duration: 1,
      });
    }, app.current);

    return () => ctx.revert();
  }, []);

  return (
    <Container
      id="register"
      ref={app}
      className="section container-fluid d-flex flex-column justify-content-center align-items-center"
    >
      <div className="register-maintext register-content-anim">
        <div className="section-pill">
          <span>Private Membership</span>
        </div>
        <h2 className="section-subtitle">Unlock Botanical Radiance</h2>
        <h1 className="text-center">Experience Nature's Purest Elixir</h1>
        <p className="section-lead">
          Join our global circle of natural skincare devotees. Receive curated seasonal formulations and private botanical masterclasses.
        </p>
      </div>

      {/* Mobile-Only Dedicated 3D Viewing Stage (Prevents cards from covering the 3D model) */}
      <div className="register_spacer_mobile">
        <div className="mobile-model-pill">
          <span className="dot"></span>
          <span>Discovery Duo • Interactive 3D Preview</span>
        </div>
      </div>

      <div className="register-form register-content-anim d-flex justify-content-center align-items-center w-100">
        <div className="row g-4 gy-5 justify-content-center align-items-center w-100 max-content-width">
          {/* Left Feature Column */}
          <div className="col-12 col-lg-6 d-flex justify-content-center">
            <PerksCard>
              <h3>Why Join the VeraVitalize Club?</h3>
              <p className="perks-intro">
                We believe exceptional skincare is a mindful ritual. When you register today, you unlock immediate privileges:
              </p>

              <div className="perk-item">
                <div className="perk-icon-box">
                  <FaGift />
                </div>
                <div>
                  <h4>Complimentary Discovery Duo</h4>
                  <p>Travel size of our Intensive Restorative Cream & Soothing Aloe Gel delivered to your door.</p>
                </div>
              </div>

              <div className="perk-item">
                <div className="perk-icon-box">
                  <FaRegGem />
                </div>
                <div>
                  <h4>Early Access to Limited Batches</h4>
                  <p>Our ingredients are wild-harvested; club members receive first reservations on small-batch yields.</p>
                </div>
              </div>

              <div className="perk-item">
                <div className="perk-icon-box">
                  <FaTruckFast />
                </div>
                <div>
                  <h4>Carbon-Neutral Priority Shipping</h4>
                  <p>All club member orders are fulfilled in recyclable glass bottles with zero plastic footprint.</p>
                </div>
              </div>
            </PerksCard>
          </div>

          {/* Right Form Column */}
          <div className="col-12 col-lg-6 d-flex justify-content-center">
            <RewardsRegisterForm />
          </div>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  padding: 80px 24px 100px;
  position: relative;
  z-index: 5;

  @media (max-width: 768px) {
    padding: 50px 16px 80px;
  }

  .max-content-width {
    max-width: 1140px;
    margin: 0 auto;
  }

  .register-maintext {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    padding-bottom: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    @media (max-width: 768px) {
      padding-bottom: 10px;
    }

    .section-pill {
      display: inline-flex;
      padding: 5px 16px;
      border-radius: 9999px;
      background: rgba(39, 98, 70, 0.08);
      border: 1px solid rgba(39, 98, 70, 0.2);
      color: #1e5238;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      margin-bottom: 14px;
    }

    .section-subtitle {
      font-size: 1rem;
      font-weight: 600;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: #3b664f;
      margin-bottom: 8px;
    }

    h1 {
      font-family: var(--font-serif);
      font-weight: 700;
      font-size: clamp(2.1rem, 4.5vw, 3.2rem);
      color: #162f22;
      line-height: 1.15;
      margin-bottom: 14px;
    }

    .section-lead {
      font-size: clamp(0.92rem, 1.4vw, 1.05rem);
      color: #4b6154;
      max-width: 620px;
      line-height: 1.6;
    }
  }

  /* Dedicated Mobile 3D Viewing Stage */
  .register_spacer_mobile {
    display: none;
    width: 100%;
    height: 44vh;
    min-height: 300px;
    max-height: 400px;
    position: relative;
    pointer-events: none;

    .mobile-model-pill {
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
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.9);
      box-shadow: 0 4px 16px rgba(18, 48, 30, 0.08);
      font-size: 11px;
      font-weight: 700;
      color: #1e5238;
      white-space: nowrap;

      .dot {
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

  .register-form {
    width: 100%;
  }
`;

const PerksCard = styled.div`
  width: 100%;
  max-width: 480px;
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(20px) saturate(160%);
  -webkit-backdrop-filter: blur(20px) saturate(160%);
  border: 1px solid rgba(255, 255, 255, 0.85);
  border-radius: 24px;
  padding: 36px 32px;
  box-shadow: 0 16px 40px -10px rgba(18, 48, 30, 0.08);

  h3 {
    font-family: var(--font-serif);
    font-size: 1.8rem;
    color: #15291f;
    margin-bottom: 10px;
    line-height: 1.25;
  }

  .perks-intro {
    font-size: 0.92rem;
    color: #4b5e54;
    line-height: 1.6;
    margin-bottom: 24px;
  }

  .perk-item {
    display: flex;
    gap: 16px;
    align-items: flex-start;
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }

    .perk-icon-box {
      width: 42px;
      height: 42px;
      flex-shrink: 0;
      border-radius: 12px;
      background: linear-gradient(135deg, #e5f4ec 0%, #d1ecd9 100%);
      color: #1e5238;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      border: 1px solid rgba(46, 107, 79, 0.15);
    }

    h4 {
      font-size: 1rem;
      font-weight: 700;
      color: #173426;
      margin-bottom: 4px;
    }

    p {
      font-size: 0.86rem;
      color: #51655a;
      line-height: 1.5;
    }
  }

  @media (max-width: 991px) {
    background: rgba(255, 255, 255, 0.52);
    backdrop-filter: blur(10px) saturate(140%);
    -webkit-backdrop-filter: blur(10px) saturate(140%);
    padding: 24px 20px;
    border-radius: 20px;
    margin-bottom: 36px;
  }
`;
