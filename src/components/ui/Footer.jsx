import React from "react";
import styled from "styled-components";
import { FaInstagram, FaFacebook, FaXTwitter, FaWhatsapp, FaLeaf } from "react-icons/fa6";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Container className="container-fluid">
      <div className="footer-inner">
        {/* Top Grid */}
        <div className="row g-4 footer-top">
          {/* Brand Column */}
          <div className="col-12 col-md-4 brand-col">
            <div className="footer-brand" onClick={scrollToTop}>
              <div className="brand-leaf-wrapper">
                <FaLeaf className="footer-leaf" />
              </div>
              <span className="brand-name">VERAVITALIZE</span>
            </div>
            <p className="footer-bio">
              Clean botanical skincare formulated around pure cold-stabilized Aloe Barbadensis. Harnessing bioactive nature to restore youthful cellular vitality.
            </p>
            <div className="footer-social-links">
              <a href="#instagram" aria-label="Instagram" className="social-pill">
                <FaInstagram />
              </a>
              <a href="#facebook" aria-label="Facebook" className="social-pill">
                <FaFacebook />
              </a>
              <a href="#twitter" aria-label="X Twitter" className="social-pill">
                <FaXTwitter />
              </a>
              <a href="#whatsapp" aria-label="WhatsApp" className="social-pill">
                <FaWhatsapp />
              </a>
            </div>
          </div>

          {/* Links Column 1 */}
          <div className="col-6 col-md-2 offset-md-1">
            <h4 className="column-title">Formulation</h4>
            <ul className="footer-list">
              <li><a href="#about">The Science</a></li>
              <li><a href="#about">Bio-Polysaccharides</a></li>
              <li><a href="#routine">Clinical Studies</a></li>
              <li><a href="#about">Sourcing & Farms</a></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="col-6 col-md-2">
            <h4 className="column-title">Rituals</h4>
            <ul className="footer-list">
              <li><a href="#routine">Hydration Gel</a></li>
              <li><a href="#routine">Restorative Cream</a></li>
              <li><a href="#routine">Routine Consultation</a></li>
              <li><a href="#register">Sample Discovery Kit</a></li>
            </ul>
          </div>

          {/* Links Column 3 */}
          <div className="col-12 col-md-3">
            <h4 className="column-title">Sustainability</h4>
            <ul className="footer-list">
              <li><a href="#sustainability">100% Recyclable Packaging</a></li>
              <li><a href="#sustainability">Carbon-Neutral Delivery</a></li>
              <li><a href="#sustainability">Cruelty-Free & Vegan</a></li>
              <li><a href="#sustainability">Zero Microplastics</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="separator"></div>
          <div className="bottom-content">
            <p className="copyright">
              © {currentYear} VeraVitalize Botanical Labs. All rights reserved.
            </p>
            <div className="legal-links">
              <a href="#privacy">Privacy Policy</a>
              <span>•</span>
              <a href="#terms">Terms of Service</a>
              <span>•</span>
              <a href="#ethics">Ethical Disclosure</a>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.footer`
  width: 100%;
  background: linear-gradient(180deg, rgba(16, 32, 23, 0.88) 0%, #0d1a13 100%);
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  padding: 80px 24px 40px;
  color: #e5ede8;
  position: relative;
  z-index: 10;

  @media (max-width: 768px) {
    padding: 50px 16px 30px;
  }

  .footer-inner {
    max-width: 1140px;
    margin: 0 auto;
  }

  .footer-top {
    margin-bottom: 50px;
  }

  .brand-col {
    .footer-brand {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 16px;
      cursor: pointer;

      .brand-leaf-wrapper {
        width: 34px;
        height: 34px;
        border-radius: 50%;
        background: linear-gradient(135deg, #2d6b4f 0%, #469a71 100%);
        display: flex;
        align-items: center;
        justify-content: center;

        .footer-leaf {
          color: #ffffff;
          font-size: 15px;
          transform: rotate(-10deg);
        }
      }

      .brand-name {
        font-family: var(--font-body);
        font-weight: 800;
        font-size: 16px;
        letter-spacing: 0.14em;
        color: #ffffff;
      }
    }

    .footer-bio {
      font-size: 0.88rem;
      line-height: 1.6;
      color: #9eb5a8;
      max-width: 320px;
      margin-bottom: 22px;
    }

    .footer-social-links {
      display: flex;
      gap: 10px;

      .social-pill {
        width: 38px;
        height: 38px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.15);
        color: #d1e2d8;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        transition: all 0.25s ease;

        &:hover {
          background: #2d6b4f;
          color: #ffffff;
          border-color: #2d6b4f;
          transform: translateY(-2px);
          box-shadow: 0 4px 14px rgba(45, 107, 79, 0.4);
        }
      }
    }
  }

  .column-title {
    font-family: var(--font-body);
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #ffffff;
    margin-bottom: 18px;
  }

  .footer-list {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      margin-bottom: 11px;

      a {
        font-size: 0.88rem;
        color: #9eb5a8;
        transition: all 0.2s ease;
        cursor: pointer;

        &:hover {
          color: #5ec792;
          padding-left: 3px;
        }
      }
    }
  }

  .footer-bottom {
    .separator {
      width: 100%;
      height: 1px;
      background: rgba(255, 255, 255, 0.1);
      margin-bottom: 24px;
    }

    .bottom-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 16px;

      .copyright {
        font-size: 0.82rem;
        color: #7d9688;
      }

      .legal-links {
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 0.8rem;
        color: #7d9688;

        a {
          cursor: pointer;
          transition: color 0.2s ease;

          &:hover {
            color: #ffffff;
          }
        }
      }
    }
  }
`;
