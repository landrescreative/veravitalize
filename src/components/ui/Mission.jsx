import React, { useLayoutEffect, useRef } from "react";
import styled from "styled-components";
import gsap from "gsap";
import { PiCheckCircleFill } from "react-icons/pi";

export default function Mission() {
  const app = useRef();

  useLayoutEffect(() => {
    var ctx = gsap.context(() => {
      gsap.from(".enter-animation", {
        duration: 1.2,
        opacity: 0,
        y: 60,
        scrollTrigger: {
          trigger: ".mission-header",
          start: "top 70%",
          end: "top 30%",
          scrub: 1,
        },
      });
    }, app.current);

    return () => ctx.revert();
  }, []);

  return (
    <Container
      id="about"
      ref={app}
      className="container-fluid d-flex flex-column justify-content-center align-items-center"
    >
      <div className="mission-header d-flex flex-column justify-content-center align-items-center enter-animation">
        <div className="mission-pill">
          <span>Ethical Botanical Science</span>
        </div>
        <h1 className="mission-h1">Pure Aloe. Uncompromising Efficacy.</h1>
        <h2 className="mission-h2">
          We harvest certified organic Aloe Barbadensis leaves, cold-stabilizing each batch within two hours to protect 100% of its live polysaccharides and restorative enzymes.
        </h2>

        <div className="mission-tags">
          <div className="tag-item">
            <PiCheckCircleFill className="tag-check" />
            <span>Never Reconstituted from Powder</span>
          </div>
          <div className="tag-item">
            <PiCheckCircleFill className="tag-check" />
            <span>Cold-Pressed Extraction</span>
          </div>
          <div className="tag-item">
            <PiCheckCircleFill className="tag-check" />
            <span>Clinical Moisture Retention</span>
          </div>
          <div className="tag-item">
            <PiCheckCircleFill className="tag-check" />
            <span>100% Recyclable Glass</span>
          </div>
        </div>
      </div>

      <div className="mission-spacer"></div>
    </Container>
  );
}

const Container = styled.section`
  min-height: 100vh;
  position: relative;
  text-align: center;
  padding: 80px 20px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 5;

  .mission-header {
    width: 92%;
    max-width: 660px;
    margin: 0 auto;
    padding: clamp(24px, 4vw, 36px) clamp(16px, 3vw, 28px);
    background: rgba(255, 255, 255, 0.68);
    backdrop-filter: blur(18px) saturate(160%);
    -webkit-backdrop-filter: blur(18px) saturate(160%);
    border: 1px solid rgba(255, 255, 255, 0.85);
    border-radius: 28px;
    box-shadow: 0 16px 40px -10px rgba(18, 48, 30, 0.08);

    .mission-pill {
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

    .mission-h1 {
      font-family: var(--font-serif);
      font-size: clamp(2rem, 4.5vw, 3rem);
      font-weight: 700;
      color: #15291f;
      line-height: 1.15;
      margin-bottom: 14px;
    }

    .mission-h2 {
      font-family: var(--font-body);
      font-size: clamp(0.92rem, 1.6vw, 1.05rem);
      font-weight: 400;
      line-height: 1.65;
      color: #3f5549;
      max-width: 600px;
      margin-bottom: 22px;
    }

    .mission-tags {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 12px;

      .tag-item {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 6px 14px;
        background: rgba(255, 255, 255, 0.85);
        border: 1px solid rgba(46, 107, 79, 0.18);
        border-radius: 9999px;
        font-size: 0.82rem;
        font-weight: 600;
        color: #204b36;

        .tag-check {
          color: #2f7e56;
          font-size: 15px;
        }
      }
    }
  }

  .mission-spacer {
    height: 180px;

    @media (max-width: 768px) {
      height: 100px;
    }
  }
`;
