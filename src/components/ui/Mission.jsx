import React, { useLayoutEffect, useRef } from "react";
import styled from "styled-components";
import gsap from "gsap";

// Images
import missionBackground from "../../assets/images/bar.png";

const Container = styled.div`
  min-height: 100vh;
  /* background-image: url(${missionBackground}); */
  text-align: center;

  .mission-header {
    padding: 5% 5%;
    height: 40%;
    color: #f6f0da;

    h1 {
      color: #feaa29;
      background: linear-gradient(
        to right,
        #c89663 20%,
        #f3eee8 50%,
        #c89663 80%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  .mission-spacer {
    height: 60%;
  }
`;

export default function Mission() {
  const app = useRef();

  useLayoutEffect(() => {
    var ctx = gsap.context(() => {
      gsap.from(".enter-animation", {
        duration: 1,
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
    <Container
      ref={app}
      className="container-fluid d-flex justify-content-center"
    >
      <div className="mission-header d-flex flex-column justify-content-center align-items-center enter-animation">
        <h1 className="mission-h1">Try it</h1>
        <h2 className="mission-h2">
          Experience the Freshness of Nature on Your Skin
        </h2>
      </div>
      <div className="mission-spacer"></div>
    </Container>
  );
}
