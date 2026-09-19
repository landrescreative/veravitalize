import React, { useState } from "react";
import styled from "styled-components";
import { FaRegUser, FaRegEnvelope, FaRegCommentDots, FaCheck, FaArrowRight } from "react-icons/fa6";
import { PiSparkleFill } from "react-icons/pi";

export default function RewardsRegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    skinGoal: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <CardContainer>
      {submitted ? (
        <SuccessState>
          <div className="success-icon">
            <FaCheck />
          </div>
          <h3>Welcome to VeraVitalize!</h3>
          <p>
            Thank you, <strong>{formData.name}</strong>. Your complimentary organic sample box registration is confirmed. Please check your inbox at <em>{formData.email}</em>.
          </p>
          <button type="button" onClick={() => setSubmitted(false)} className="reset-btn">
            Register another address
          </button>
        </SuccessState>
      ) : (
        <Form onSubmit={handleSubmit}>
          <div className="card-badge">
            <PiSparkleFill className="badge-sparkle" />
            <span>Complimentary Sample Kit</span>
          </div>

          <h3 className="form-title">Claim Your Botanical Experience</h3>
          <p className="form-subtitle">
            Receive our travel-size Aloe Hydrating Gel and barrier restoration cream directly to your doorstep.
          </p>

          <div className="input-group-custom">
            <label htmlFor="name-input">Full Name</label>
            <div className="input-wrapper">
              <FaRegUser className="input-icon" />
              <input
                id="name-input"
                type="text"
                name="name"
                required
                placeholder="e.g. Sofia Morales"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="input-group-custom">
            <label htmlFor="email-input">Email Address</label>
            <div className="input-wrapper">
              <FaRegEnvelope className="input-icon" />
              <input
                id="email-input"
                type="email"
                name="email"
                required
                placeholder="sofia@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="input-group-custom">
            <label htmlFor="goal-input">Your Primary Skin Goal</label>
            <div className="input-wrapper textarea-wrapper">
              <FaRegCommentDots className="input-icon textarea-icon" />
              <textarea
                id="goal-input"
                name="skinGoal"
                rows="2"
                placeholder="e.g. Deep hydration, calming redness, fine line prevention..."
                value={formData.skinGoal}
                onChange={handleChange}
              />
            </div>
          </div>

          <SubmitButton type="submit" disabled={loading}>
            {loading ? (
              <span>Preparing your kit...</span>
            ) : (
              <>
                <span>Claim Free Sample</span>
                <FaArrowRight className="submit-arrow" />
              </>
            )}
          </SubmitButton>

          <span className="privacy-note">
            🌿 We protect your privacy. Zero spam. Unsubscribe anytime.
          </span>
        </Form>
      )}
    </CardContainer>
  );
}

const CardContainer = styled.div`
  width: 100%;
  max-width: 480px;
  background: rgba(255, 255, 255, 0.78);
  backdrop-filter: blur(20px) saturate(170%);
  -webkit-backdrop-filter: blur(20px) saturate(170%);
  border: 1px solid rgba(255, 255, 255, 0.85);
  border-radius: 24px;
  padding: 34px 30px;
  box-shadow: 0 16px 40px -10px rgba(18, 48, 30, 0.1),
              0 2px 10px rgba(18, 48, 30, 0.04);
  transition: all 0.3s ease;

  @media (max-width: 540px) {
    padding: 26px 20px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;

  .card-badge {
    align-self: flex-start;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 12px;
    border-radius: 9999px;
    background: rgba(39, 98, 70, 0.1);
    color: #1e5238;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 14px;

    .badge-sparkle {
      color: #388e5d;
      font-size: 13px;
    }
  }

  .form-title {
    font-family: var(--font-serif);
    font-size: 1.8rem;
    font-weight: 700;
    color: #15291f;
    line-height: 1.2;
    margin-bottom: 8px;
  }

  .form-subtitle {
    font-size: 0.92rem;
    color: #4b5e54;
    line-height: 1.5;
    margin-bottom: 22px;
  }

  .input-group-custom {
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;

    label {
      font-size: 0.82rem;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: #274233;
      margin-bottom: 6px;
    }

    .input-wrapper {
      position: relative;
      display: flex;
      align-items: center;

      .input-icon {
        position: absolute;
        left: 14px;
        color: #657e71;
        font-size: 15px;
        pointer-events: none;
      }

      input, textarea {
        width: 100%;
        padding: 12px 14px 12px 40px;
        font-family: var(--font-body);
        font-size: 0.95rem;
        color: #1a3225;
        background: rgba(255, 255, 255, 0.9);
        border: 1.5px solid rgba(46, 107, 79, 0.22);
        border-radius: 12px;
        outline: none;
        transition: all 0.25s ease;

        &::placeholder {
          color: #8c9e94;
          font-size: 0.9rem;
        }

        &:focus {
          border-color: #276246;
          box-shadow: 0 0 0 3px rgba(39, 98, 70, 0.15);
          background: #ffffff;
        }
      }

      &.textarea-wrapper {
        align-items: flex-start;

        .textarea-icon {
          top: 14px;
        }

        textarea {
          resize: none;
          line-height: 1.4;
        }
      }
    }
  }

  .privacy-note {
    margin-top: 14px;
    font-size: 0.78rem;
    color: #677b70;
    text-align: center;
  }
`;

const SubmitButton = styled.button`
  margin-top: 8px;
  padding: 14px 24px;
  background: linear-gradient(135deg, #1b4733 0%, #2f694e 100%);
  color: #ffffff;
  border: none;
  outline: none;
  border-radius: 14px;
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(27, 71, 51, 0.25);
  transition: all 0.25s ease;

  .submit-arrow {
    font-size: 13px;
    transition: transform 0.25s ease;
  }

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #153c2b 0%, #265c43 100%);
    box-shadow: 0 8px 24px rgba(27, 71, 51, 0.35);
    transform: translateY(-2px);

    .submit-arrow {
      transform: translateX(4px);
    }
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const SuccessState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px 10px;

  .success-icon {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: linear-gradient(135deg, #276246 0%, #469a71 100%);
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    margin-bottom: 18px;
    box-shadow: 0 8px 22px rgba(39, 98, 70, 0.3);
  }

  h3 {
    font-family: var(--font-serif);
    font-size: 1.8rem;
    color: #173426;
    margin-bottom: 10px;
  }

  p {
    font-size: 0.95rem;
    line-height: 1.6;
    color: #43594e;
    margin-bottom: 24px;
  }

  .reset-btn {
    background: transparent;
    border: 1.5px solid #276246;
    color: #276246;
    font-weight: 600;
    font-size: 0.9rem;
    padding: 8px 20px;
    border-radius: 9999px;
    cursor: pointer;
    transition: all 0.25s ease;

    &:hover {
      background: #276246;
      color: #ffffff;
    }
  }
`;
