import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  box-shadow: 0px 10px 10px 5px rgba(0, 0, 0, 0.2);
  padding: 0px 0px;
  padding-bottom: 25px;
  background-color: #f2f2f2;
  color: #9cbc97;
  border-radius: 20px;

  .form-card-header {
    .form-h1 {
      max-height: 30px;
      color: #1f1e23;
      line-height: 1;
    }
  }

  .form-card-body {
    width: 100%;
    padding: 0px 5%;
  }

  .form-group {
    margin: 0px 0px;

    label {
      font-size: 1.3rem;
    }

    input {
      border: 2px solid #9cbc97;
      font-size: 1.2rem;

      &:nth-child(6) {
        height: 110px;
      }
    }

    button {
      margin-top: 20px;
      padding: 10px 20px;
      background-color: #7bb661;
      border-radius: 12px;
      box-shadow: 0px 5px 5px 2px rgba(0, 0, 0, 0.2);
      border: none;
      outline: none;
      text-decoration: none;
      transition: all 0.3s;

      &:hover {
        background-color: #9cbc97;
        color: #f2f2f2;
        box-shadow: 0px 5px 5px 2px rgba(0, 100, 0, 0.2);
      }
    }
  }
`;

export default function RewardsRegisterForm() {
  return (
    <Container>
      <div className="form-card d-flex flex-column ">
        <div className="form-card-header d-flex justify-content-center align-items-center">
          <h1 className="form-h1">Register!</h1>
        </div>
        <form className="form-card-body">
          <div className="form-group">
            <label for="exampleInputEmail1">Name</label>
            <input
              type="text"
              className="form-control"
              id="NameInput"
              aria-describedby="emailHelp"
              placeholder="Enter your name"
            ></input>
            <label for="exampleInputEmail1">E-mail</label>
            <input
              type="text"
              className="form-control"
              id="EmailInput"
              aria-describedby="emailHelp"
              placeholder="
Enter your email"
            ></input>
            <label for="exampleInputEmail1">Message</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Why should you participate with us?
"
            ></input>
            <button>Register</button>
          </div>
        </form>
      </div>
    </Container>
  );
}
