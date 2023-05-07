import React from "react";
import styled from "styled-components";
import RewardsRegisterForm from "../forms/RewardsRegisterForm";

// Images
import beerPhoto from "../../assets/images/cerveza.png";

const Container = styled.div`
  height: 100dvh;

  .register-maintext {
    margin-bottom: 50px;

    h1 {
      font-weight: 700;
      font-size: 1.5rem;
    }
  }

  .register-img {
    width: 30%;
    height: 512px;
  }

  .register-img,
  .register-form {
    margin: 0px 50px;
  }

  .register-form {
    width: 30%;

    h1 {
      font-size: 1.5rem;
    }

    h2 {
      font-size: 1rem;
    }
  }
`;

export default function RewardsRegister() {
  return (
    <Container className="container-fluid d-flex flex-column justify-content-center align-items-center">
      <div className="register-maintext">
        <h1 className="text-center font-weight-bold">
          ¡Registrate y gana productos completamente gratis!
        </h1>
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <div className="register-img">
          <img></img>
        </div>
        <div className="register-form">
          <h1 className="text-center font-weight-bold">
            Con tan solo unos clicks
          </h1>
          <h2 className="text-center">
            Participa con nosotros y consigue productos exclusivos de manera
            completamente gratuita, para conocer más de nuestras promociones o
            campañas te invitamos a seguirnos en nuestras redes sociales y
            registrarte para participar.
          </h2>
          <RewardsRegisterForm></RewardsRegisterForm>
        </div>
      </div>
    </Container>
  );
}
