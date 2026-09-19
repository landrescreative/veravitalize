import React from "react";
import styled from "styled-components";
import { FaLeaf } from "react-icons/fa6";

export default function Preloader({ progress = 0, isLoaded = false }) {
  const getStatusText = (prog) => {
    if (prog < 35) return "Harvesting cold-pressed aloe extract...";
    if (prog < 70) return "Stabilizing bio-active polysaccharides...";
    if (prog < 95) return "Synthesizing 3D botanical sanctuary...";
    return "Welcome to VeraVitalize";
  };

  return (
    <PreloaderOverlay className={isLoaded ? "preloader-hidden" : ""}>
      <ContentWrapper>
        {/* Animated Brand Emblem */}
        <EmblemContainer>
          <div className="pulsing-ring"></div>
          <div className="icon-core">
            <FaLeaf className="leaf-icon" />
          </div>
        </EmblemContainer>

        {/* Brand Header */}
        <BrandName>VERAVITALIZE</BrandName>
        <BrandTagline>BOTANICAL CELLULAR RESEARCH</BrandTagline>

        {/* Slender Progress Track */}
        <ProgressTrack>
          <ProgressBar style={{ width: `${progress}%` }} />
        </ProgressTrack>

        {/* Counter & Dynamic Status */}
        <ProgressMeta>
          <span className="status-text">{getStatusText(progress)}</span>
          <span className="percent-text">{progress}%</span>
        </ProgressMeta>
      </ContentWrapper>
    </PreloaderOverlay>
  );
}

const PreloaderOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at 50% 45%, #ffffff 0%, #edf4ef 100%);
  transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1),
              visibility 0.85s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.85s cubic-bezier(0.16, 1, 0.3, 1);
  opacity: 1;
  visibility: visible;
  transform: scale(1);
  pointer-events: all;

  &.preloader-hidden {
    opacity: 0;
    visibility: hidden;
    transform: scale(1.04);
    pointer-events: none;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 30px;
  max-width: 440px;
  width: 90%;
`;

const EmblemContainer = styled.div`
  position: relative;
  width: 72px;
  height: 72px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: center;

  .pulsing-ring {
    position: absolute;
    inset: -6px;
    border-radius: 50%;
    border: 1.5px solid rgba(46, 107, 79, 0.35);
    animation: ringPulse 2.4s cubic-bezier(0.16, 1, 0.3, 1) infinite;
  }

  .icon-core {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: linear-gradient(135deg, #1b4733 0%, #357454 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 24px rgba(27, 71, 51, 0.25);

    .leaf-icon {
      color: #e6f5ed;
      font-size: 26px;
      transform: rotate(-10deg);
      animation: gentleBreathe 3s ease-in-out infinite;
    }
  }

  @keyframes ringPulse {
    0% {
      transform: scale(0.9);
      opacity: 0.8;
    }
    50% {
      transform: scale(1.18);
      opacity: 0.2;
    }
    100% {
      transform: scale(0.9);
      opacity: 0.8;
    }
  }

  @keyframes gentleBreathe {
    0%, 100% {
      transform: rotate(-10deg) scale(1);
    }
    50% {
      transform: rotate(-5deg) scale(1.08);
    }
  }
`;

const BrandName = styled.h1`
  font-family: var(--font-body);
  font-size: 1.4rem;
  font-weight: 800;
  letter-spacing: 0.24em;
  color: #142e21;
  margin-bottom: 6px;
`;

const BrandTagline = styled.span`
  font-size: 9.5px;
  font-weight: 700;
  letter-spacing: 0.22em;
  color: #4b6a5a;
  margin-bottom: 30px;
`;

const ProgressTrack = styled.div`
  width: 100%;
  height: 4px;
  border-radius: 9999px;
  background: rgba(30, 69, 51, 0.1);
  overflow: hidden;
  position: relative;
  margin-bottom: 14px;
`;

const ProgressBar = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #1e4533 0%, #3e8862 100%);
  border-radius: 9999px;
  transition: width 0.3s ease-out;
  box-shadow: 0 0 10px rgba(62, 136, 98, 0.5);
`;

const ProgressMeta = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 11px;

  .status-text {
    color: #556c5f;
    font-style: italic;
    font-size: 11.5px;
  }

  .percent-text {
    color: #1a4231;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
  }
`;
