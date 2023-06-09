import React from "react";
import styled from "styled-components";

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  color: #f6f0da;

  .contenedor {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .services-header {
    height: 20%;
    background: linear-gradient(
      to right,
      #c89663 20%,
      #f3eee8 50%,
      #c89663 80%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .services-services {
    .services-card {
      margin: 10px 10px;

      button {
        margin-top: 20px;
        padding: 10px 20px;
        background-color: #feaa29;
        border: none;
      }

      @media (max-width: 1024px) {
        text-align: center;
      }
    }
  }

  .img {
    height: 100%;
    background-color: transparent;

    @media (max-width: 1024px) {
      height: 500px;
    }
  }
`;

export default function Services() {
  return (
    <Container className="container-fluid d-flex flex-column justify-content-center align-items-center">
      <div className="services-header">
        <h1 className="text-center p-5">La cerveza en nuestra vida diaria</h1>
      </div>
      <div className="contenedor">
        <div className="services-services row">
          <div className="col-md-5">
            <div className="services-card">
              <h2>Agrega la cerveza a tu vida cotidiana</h2>
              <p>
                Conoce recetas únicas para implementar la cerveza a tu vida
                diaria y disfruta de sus beneficios de manera controlada y
                saludable.
              </p>
              <button>Recetas</button>
            </div>

            <div className="services-card">
              <h2>Disfruta su sabor de manera correcta</h2>
              <p>
                Revisa nuestra colección de cocteles preferidos por nosotros
                para darle un estilo y sabor único a la cerveza de manera
                accesible para todos.
              </p>
              <button>Cocteles</button>
            </div>
          </div>
          <div className="col-md-2"></div>
          <div className="col-md-5">
            <div className="img"></div>
          </div>
        </div>
      </div>
    </Container>
  );
}
