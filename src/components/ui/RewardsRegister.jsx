import React, { useEffect, useLayoutEffect, useRef } from "react";
import styled from "styled-components";
import RewardsRegisterForm from "../forms/RewardsRegisterForm";
import gsap from "gsap";

// Images
import beerPhoto from "../../assets/images/cerveza.png";

const Container = styled.div`
  min-height: 100vh;
  width: 100%;

  .form-container {
  }

  .register-maintext {
    width: 100%;
    padding: 100px 0;

    h1 {
      font-weight: 700;
      font-size: 3rem;
      background: linear-gradient(
        to right,
        #c89663 40%,
        #f3eee8 50%,
        #c89663 60%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  .register-img {
    height: 0;

    @media (max-width: 1024px) {
      height: 500px;
    }

    img {
      width: 100%;
    }
  }

  .register-img,
  .register-form {
    flex-direction: row;

    @media (max-width: 1024px) {
      flex-direction: column;
    }
  }

  .register-form {
    width: 50%;

    @media (max-width: 1024px) {
      width: 100%;
    }

    h1 {
      font-size: 1.5rem;
      color: #f6f0da;
      padding: 40px 0;
    }

    h2 {
      font-size: 1rem;
      color: #f6f0da;
      padding-bottom: 40px;
    }
  }
`;

export default function RewardsRegister() {
  const app = useRef();

  useLayoutEffect(() => {
    var ctx = gsap.context(() => {
      gsap.from(".enter-animation", {
        scrollTrigger: {
          trigger: ".register-maintext",
          start: "top 80%",
          end: "top 20%",
          scrub: 1,
        },
        opacity: 0,
        y: 300,
        duration: 1,
      });
    }, app.current);

    return () => ctx.revert();
  }, []);

  return (
    <Container
      ref={app}
      className="section container-fluid d-flex flex-column justify-content-center align-items-center"
    >
      <div className="register-maintext enter-animation">
        <h1 className="text-center font-weight-bold">
          Register and win products completely free!
        </h1>
      </div>
      <div className="register-form d-flex justify-content-between align-items-center enter-animation">
        <div className="col-md-6 register-img"></div>
        <div className="col-md-8 register-form ">
          <h1 className="text-center font-weight-bold">
            With just a few clicks
          </h1>
          <h2 className="text-center">
            Participate with us and get exclusive products completely free of
            charge. To learn more about our promotions or campaigns, we invite
            you to follow us on our social networks and register to participate.
          </h2>
          <RewardsRegisterForm></RewardsRegisterForm>
        </div>
      </div>
    </Container>
  );
}
