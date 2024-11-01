import React, { useLayoutEffect, useRef } from "react";
import styled from "styled-components";
import gsap from "gsap";

const Container = styled.div`
  min-height: 120vh;
  width: 90%;
  color: #f6f0da;

  .contenedor {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .services-header {
    height: 20%;
    color: #7bb661;
    text-align: left;
    align-items: flex-end;
    justify-content: flex-start;

    h1 {
      margin-left: 19%;

      @media (max-width: 1024px) {
        margin-left: 0;
        text-align: center;
      }
    }
  }

  .services-services {
    .services-card {
      margin: 10px 10px;
      color: #393d3d;

      button {
        margin-top: 10px;
        padding: 10px 20px;
        background-color: #7bb661;
        border: none;
        border-radius: 12px;
        transition: all 0.3s;

        &:hover {
          background-color: #9cbc97;
          color: #f2f2f2;
          box-shadow: 0px 5px 5px 2px rgba(0, 100, 0, 0.2);
        }
      }

      @media (max-width: 1024px) {
        text-align: center;
      }
    }
  }

  .img-services {
    height: 100%;
    background-color: transparent;

    @media (max-width: 1024px) {
      height: 500px;
    }
  }
`;

export default function Services() {
  const app = useRef();

  useLayoutEffect(() => {
    var ctx = gsap.context(() => {
      gsap.from(".services-header", {
        duration: 5,
        opacity: 0,
        scrollTrigger: {
          trigger: ".mission-header ",
          start: "top 50%",
          end: "top 10%",
          scrub: 1,
        },
      });
    }, app.current);

    return () => ctx.revert();
  }, []);

  return (
    <Container ref={app} className="container-fluid d-flex flex-column">
      <div className="services-header">
        <h1 className="p-5">Enhance results</h1>
      </div>
      <div className="contenedor">
        <div className="services-services row">
          <div className="col-md-5">
            <div className="services-card">
              <h2>Combine Our Products with Other Skincare Essentials</h2>
              <p>
                From serums and masks to cleansers and exfoliators, our skincare
                product line seamlessly integrates with a variety of treatments
                to provide your skin with comprehensive and effective care.
              </p>
              <button>Shop</button>
            </div>

            <div className="services-card">
              <h2>For Every Skin Type: Explore Our Specialized Line</h2>
              <p>
                Whether you have dry, combination, sensitive, or acne-prone
                skin, we have the perfect solution for you.
              </p>
              <button>Tell us our needs</button>
            </div>
          </div>
          <div className="col-md-2"></div>
          <div className="col-md-5">
            <div className="img-services"></div>
          </div>
        </div>
      </div>
    </Container>
  );
}
