import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaBars, FaXmark, FaLeaf, FaArrowRight } from "react-icons/fa6";

export default function Navbar() {
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setToggle(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <NavWrapper $scrolled={scrolled}>
      <NavContainer>
        <Brand onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <BrandIconWrapper>
            <FaLeaf className="brand-leaf" />
          </BrandIconWrapper>
          <BrandText>
            <span className="brand-title">VERAVITALIZE</span>
            <span className="brand-tag">BOTANICAL LABS</span>
          </BrandText>
        </Brand>

        <NavLinks className={toggle ? "active" : ""}>
          <a href="#benefits" onClick={(e) => { e.preventDefault(); scrollToSection("benefits"); }}>Benefits</a>
          <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection("about"); }}>Formulation</a>
          <a href="#routine" onClick={(e) => { e.preventDefault(); scrollToSection("routine"); }}>Routine</a>
          <a href="#register" onClick={(e) => { e.preventDefault(); scrollToSection("register"); }}>Exclusive Club</a>
          
          <MobileCtaButton onClick={() => scrollToSection("register")}>
            Claim Free Sample <FaArrowRight />
          </MobileCtaButton>
        </NavLinks>

        <NavActions>
          <CtaButton onClick={() => scrollToSection("register")}>
            <span>Join Club</span>
            <FaArrowRight className="cta-arrow" />
          </CtaButton>

          <MobileToggleButton
            aria-label="Toggle menu"
            onClick={() => setToggle(!toggle)}
          >
            {toggle ? <FaXmark /> : <FaBars />}
          </MobileToggleButton>
        </NavActions>
      </NavContainer>
    </NavWrapper>
  );
}

const NavWrapper = styled.header`
  position: sticky;
  top: 14px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 999;
  @media (max-width: 768px) {
    top: 8px;
    padding: 0 12px;
  }
`;

const NavContainer = styled.nav`
  pointer-events: auto;
  width: 100%;
  max-width: 1140px;
  height: 64px;
  padding: 0 16px 0 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.78);
  backdrop-filter: blur(18px) saturate(180%);
  -webkit-backdrop-filter: blur(18px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.85);
  box-shadow: 0 10px 35px -5px rgba(20, 48, 32, 0.08),
              0 2px 8px -2px rgba(20, 48, 32, 0.04);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);

  @media (max-width: 768px) {
    height: 54px;
    padding: 0 12px 0 16px;
  }
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  user-select: none;
`;

const BrandIconWrapper = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1e4533 0%, #3e7b5b 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(30, 69, 51, 0.25);

  .brand-leaf {
    color: #e5f4ec;
    font-size: 15px;
    transform: rotate(-10deg);
  }
`;

const BrandText = styled.div`
  display: flex;
  flex-direction: column;

  .brand-title {
    font-family: var(--font-body);
    font-weight: 800;
    font-size: 15px;
    letter-spacing: 0.12em;
    color: #173426;
    line-height: 1.1;
  }

  .brand-tag {
    font-size: 8.5px;
    letter-spacing: 0.22em;
    color: #557264;
    font-weight: 600;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 28px;

  a {
    font-size: 13.5px;
    font-weight: 600;
    color: #2b3d34;
    letter-spacing: 0.03em;
    cursor: pointer;
    position: relative;
    padding: 6px 2px;
    transition: color 0.2s ease;

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 2px;
      background: #2d6b4f;
      border-radius: 4px;
      transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    &:hover {
      color: #1b4b35;
      &::after {
        width: 80%;
      }
    }
  }

  @media (max-width: 860px) {
    position: fixed;
    top: 68px;
    left: 12px;
    right: 12px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid rgba(255, 255, 255, 0.9);
    box-shadow: 0 20px 45px rgba(18, 45, 30, 0.15);
    border-radius: 24px;
    flex-direction: column;
    padding: 24px 20px;
    gap: 18px;
    transform: translateY(-20px) scale(0.96);
    opacity: 0;
    pointer-events: none;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);

    &.active {
      transform: translateY(0) scale(1);
      opacity: 1;
      pointer-events: auto;
    }

    a {
      font-size: 16px;
      width: 100%;
      text-align: center;
      padding: 10px 0;
      border-bottom: 1px solid rgba(220, 230, 224, 0.5);

      &::after {
        display: none;
      }
    }
  }
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const CtaButton = styled.button`
  background: linear-gradient(135deg, #1b4733 0%, #2f694e 100%);
  color: #ffffff;
  border: none;
  outline: none;
  border-radius: 9999px;
  padding: 9px 20px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.04em;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(27, 71, 51, 0.28);
  transition: all 0.25s ease;

  .cta-arrow {
    font-size: 11px;
    transition: transform 0.25s ease;
  }

  &:hover {
    background: linear-gradient(135deg, #163c2b 0%, #275942 100%);
    box-shadow: 0 6px 20px rgba(27, 71, 51, 0.38);
    transform: translateY(-1px);

    .cta-arrow {
      transform: translateX(3px);
    }
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 860px) {
    display: none;
  }
`;

const MobileCtaButton = styled.button`
  display: none;

  @media (max-width: 860px) {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    margin-top: 6px;
    padding: 14px;
    border-radius: 14px;
    border: none;
    background: linear-gradient(135deg, #1b4733 0%, #2f694e 100%);
    color: #ffffff;
    font-size: 14px;
    font-weight: 600;
  }
`;

const MobileToggleButton = styled.button`
  display: none;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  color: #173426;
  font-size: 18px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(30, 69, 51, 0.08);
  }

  @media (max-width: 860px) {
    display: flex;
  }
`;
