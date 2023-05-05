import React from "react";
import styled from "styled-components";

const Container = styled.div``;

export default function Header() {
  return (
    <Container className="container-fluid row d-flex justify-content-center align-items-center">
      <div className="header_main_texts">
        <h2>Bienvenido a</h2>
        <h1>El Arte de la Cerveza</h1>
      </div>
      <div className="header_about_texts row">
        <div className="header_about_texts_left">
          <div className="header_about_texts_spans">
            <h1>¿Por qué la cerveza es historia?</h1>
            <h2>
              Su proceso se ha perfeccionado al paso de los años y se puede
              considerar a esta bebida como una de las más antiguas en el mundo.
            </h2>
          </div>
          <div className="header_about_texts_spans">
            <h1>Beneficios únicos para tu salud</h1>
            <h2>
              Si bien es cierto que todo en exceso es malo la cerveza no es una
              excepción. Sin embargo tiene bastantes beneficios para tu salud
              siempre y cuando sea cerveza de calidad como la que encontrarás
              con nosotros.
            </h2>
          </div>
        </div>
        <div className="header_about_texts_right">
          <div className="header_about_texts_spans">
            <h1>Útil para nuestro día a día</h1>
            <h2>
              Encuentra una forma de emplear la cerveza en tu vida diaria con
              increíbles recetas al alcance de todos.
            </h2>
          </div>
          <div className="header_about_texts_spans">
            <h1>Gana premios con nosotros</h1>
            <h2>
              Podrás ganar productos completamente gratis con un par de clicks,
              haz click aquí para saber más.
            </h2>
          </div>
        </div>
      </div>
    </Container>
  );
}
