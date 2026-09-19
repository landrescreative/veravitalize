import React, { useLayoutEffect, useRef } from "react";
import styled from "styled-components";
import gsap from "gsap";
import { FaArrowRight } from "react-icons/fa6";
import { PiDropBold, PiSparkleBold } from "react-icons/pi";

export default function Services() {
  const app = useRef();

  useLayoutEffect(() => {
    var ctx = gsap.context(() => {
      gsap.from(".services-header", {
        duration: 1.5,
        opacity: 0,
        y: 40,
        scrollTrigger: {
          trigger: ".mission-header",
          start: "top 40%",
          end: "top 10%",
          scrub: 1,
        },
      });
    }, app.current);

    return () => ctx.revert();
  }, []);

  const scrollToRegister = () => {
    const el = document.getElementById("register");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Container id="routine" ref={app} className="container-fluid d-flex flex-column">
      <div className="services-header">
        <div className="section-pill">
          <span>Daily Botanical Ritual</span>
        </div>
        <h1>Elevate Every Step of Your Routine</h1>
        <p className="header-subtitle">
          Designed to seamlessly layer with your favorite active serums or stand alone as a pure, minimalist hydration sanctuary.
        </p>
      </div>

      <div className="contenedor">
        <div className="services-services row align-items-center w-100">
          {/* Left Cards Column */}
          <div className="col-12 col-lg-6">
            <div className="services-card glass-card">
              <div className="card-top">
                <div className="step-tag">
                  <PiDropBold className="step-icon" />
                  <span>Synergy & Layering</span>
                </div>
              </div>
              <h2>Combine with Active Serums</h2>
              <p>
                From hyaluronic acid and niacinamide to gentle retinoids, our soothing Aloe Vera base buffers potential sensitivity while boosting hydration depth and active absorption.
              </p>
              <button type="button" onClick={scrollToRegister} className="card-btn">
                <span>Explore Routine Guides</span>
                <FaArrowRight className="btn-arrow" />
              </button>
            </div>

            <div className="services-card glass-card">
              <div className="card-top">
                <div className="step-tag">
                  <PiSparkleBold className="step-icon" />
                  <span>Adaptive Formulations</span>
                </div>
              </div>
              <h2>Tailored for Every Complexion</h2>
              <p>
                Whether your skin is dehydrated, balancing excess sebum, or recovering from climate exposure, our adaptive pH-stabilized botanicals restore equilibrium naturally.
              </p>
              <button type="button" onClick={scrollToRegister} className="card-btn">
                <span>Discover Your Match</span>
                <FaArrowRight className="btn-arrow" />
              </button>
            </div>
          </div>

          {/* Right Column (Frames the 3D model with tape opening animation) */}
          <div className="col-12 col-lg-6">
            <div className="img-services">
              <div className="model-tip-pill">
                <span className="pulsing-dot"></span>
                <span>Bio-Active Gel & Cream Duo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.section`
  min-height: 110vh;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 24px 100px;
  position: relative;
  z-index: 5;

  @media (max-width: 768px) {
    padding: 50px 16px 70px;
    min-height: auto;
  }

  .services-header {
    max-width: 720px;
    margin-bottom: 40px;
    text-align: left;

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
      margin-bottom: 12px;
    }

    h1 {
      font-family: var(--font-serif);
      font-size: clamp(2.1rem, 4.5vw, 3.2rem);
      font-weight: 700;
      color: #15291f;
      line-height: 1.15;
      margin-bottom: 12px;
    }

    .header-subtitle {
      font-size: clamp(0.92rem, 1.4vw, 1.05rem);
      color: #495e52;
      line-height: 1.6;
    }

    @media (max-width: 991px) {
      text-align: center;
      margin: 0 auto 40px;
    }
  }

  .contenedor {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .services-services {
    width: 100%;
    margin: 0;

    .services-card {
      margin-bottom: 24px;
      padding: 30px;
      background: rgba(255, 255, 255, 0.72);
      backdrop-filter: blur(18px) saturate(160%);
      -webkit-backdrop-filter: blur(18px) saturate(160%);
      border: 1px solid rgba(255, 255, 255, 0.85);
      border-radius: 22px;
      box-shadow: 0 12px 36px -8px rgba(18, 48, 30, 0.08);
      transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);

      &:hover {
        background: rgba(255, 255, 255, 0.86);
        transform: translateY(-4px);
        box-shadow: 0 18px 42px -6px rgba(18, 48, 30, 0.14);
        border-color: rgba(62, 123, 91, 0.3);
      }

      .card-top {
        margin-bottom: 14px;

        .step-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 12px;
          border-radius: 9999px;
          background: rgba(39, 98, 70, 0.09);
          color: #1e5238;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;

          .step-icon {
            font-size: 12px;
          }
        }
      }

      h2 {
        font-family: var(--font-serif);
        font-size: 1.6rem;
        font-weight: 700;
        color: #173426;
        margin-bottom: 10px;
        line-height: 1.25;
      }

      p {
        font-size: 0.94rem;
        line-height: 1.6;
        color: #475b50;
        margin-bottom: 20px;
      }

      .card-btn {
        padding: 10px 22px;
        background: rgba(39, 98, 70, 0.1);
        color: #17452d;
        border: 1px solid rgba(39, 98, 70, 0.25);
        border-radius: 9999px;
        font-size: 0.88rem;
        font-weight: 700;
        letter-spacing: 0.03em;
        display: inline-flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        transition: all 0.25s ease;

        .btn-arrow {
          font-size: 11px;
          transition: transform 0.25s ease;
        }

        &:hover {
          background: #1b4733;
          color: #ffffff;
          border-color: #1b4733;
          box-shadow: 0 6px 18px rgba(27, 71, 51, 0.25);

          .btn-arrow {
            transform: translateX(3px);
          }
        }
      }

      @media (max-width: 540px) {
        padding: 22px 18px;
      }
    }
  }

  .img-services {
    min-height: 480px;
    height: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding-bottom: 30px;

    .model-tip-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 18px;
      border-radius: 9999px;
      background: rgba(255, 255, 255, 0.82);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      border: 1px solid rgba(255, 255, 255, 0.9);
      box-shadow: 0 10px 28px rgba(18, 48, 30, 0.08);
      font-size: 12px;
      font-weight: 700;
      color: #1e4533;
      letter-spacing: 0.06em;
      text-transform: uppercase;

      .pulsing-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: #388e5d;
        box-shadow: 0 0 0 0 rgba(56, 142, 93, 0.7);
        animation: pulse 2s infinite;
      }
    }

    @keyframes pulse {
      0% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 rgba(56, 142, 93, 0.7);
      }
      70% {
        transform: scale(1);
        box-shadow: 0 0 0 10px rgba(56, 142, 93, 0);
      }
      100% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 rgba(56, 142, 93, 0);
      }
    }

    @media (max-width: 991px) {
      min-height: 360px;
    }
  }
`;
